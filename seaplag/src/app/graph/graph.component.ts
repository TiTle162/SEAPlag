import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

import ForceGraph from 'force-graph';
import html2canvas from 'html2canvas';
import ForceGraph3D from '3d-force-graph';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

import { Options } from '@angular-slider/ngx-slider';
// import { EqualStencilFunc } from 'three/src/constants';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  /* ประกาศตัวแปร */
  PATH: String = 'http://localhost:4000/';

  ForceGraph: any = "";
  ForceGraph3D: any = "";
  SpriteText: any = ""

  GraphData: any = "";
  Graph: any = "";
  current_language: string = "";
  filename: string = "";
  dest: string = ""
  mode: string = "";
  navbar_Thai_language: string = "";
  navbar_Eng_language: string = "";

  // ตัวแปรสำหรับการแสดงผลใน user manual
  title_1: string = "";
  title_2: string = "";
  title_3: string = "";
  UM_scope: string = "";
  UM_confirm: string = "";
  UM_table: string = "";
  UM_Export: string = "";
  UM_2D: string = "";
  UM_3D: string = "";
  UM_node: string = "";
  UM_line: string = "";
  UM_grap: string = "";

  btn_scope: string = "";
  btn_confirm: string = "";
  btn_Table: string = "";
  btn_Export: string = "";
  btn_2D_Display: string = "";
  btn_3D_Display: string = "";
  btn_Node: string = "";
  btn_Branch: string = "";
  btn_Graph: string = "";

  isTH: boolean = false;
  isEN: boolean = false;

  is2D: boolean = false;
  is3D: boolean = false;

  scope_language: string = "";
  suggest_language: string = "";

  // Slider options.
  minValue: number = 50;
  options: Options = {
    floor: 1,
    ceil: 100,
    ticksArray: [1, 25, 50, 75, 100],
    showSelectionBarEnd: true
  };

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    var params = this.route.snapshot.queryParams;
    this.current_language = params['language'];
    this.filename = params['filename'];
    this.dest = params['dest'];
    this.mode = params['mode'];
    this.minValue = params['min'];

    // Show loading screen.
    this.showSpinner();

    if (this.current_language == "TH") {
      this.isTH = true;
      this.isEN = false;
      this.switch_to_th();
    } else if (this.current_language == "EN") {
      this.isTH = false;
      this.isEN = true;
      this.switch_to_eng();
    } else {
      this.isTH = true;
      this.isEN = false;
      this.switch_to_th();
    }

    // Get data.
    // Read data from backend server. 
    const formData = new FormData()
    formData.append('file', this.filename);
    const headers = new HttpHeaders({
      'filename': this.filename,
      'destination': this.dest,
    })

    // start process result
    this.http.post(this.PATH + 'api/result', formData, { headers: headers })
      .subscribe(data => {
        this.hideSpinner();
        var res = JSON.stringify(data);
        if (!res.includes("error")) {
          // Read JSON data.
          if (this.mode == "2D") {
            this.is2D = true;
            this.is3D = false;
            this.ForceGraph = require('force-graph');
            this.GraphData = Object.assign({}, data);
            this.set_graph();
          } else if (this.mode == "3D") {
            this.is2D = false;
            this.is3D = true;
            this.ForceGraph3D = require('3d-force-graph');
            this.SpriteText = require('three-spritetext');
            this.GraphData = Object.assign({}, data);
            this.set_graph();
          } else {
            this.is2D = true;
            this.is3D = false;
            this.ForceGraph = require('force-graph');
            this.GraphData = Object.assign({}, data);
            this.set_graph();
          }
        } else if (res.includes("error")) {
          this.show_error();
        } else {
          this.show_error();
        }
      });

    var mode = this.mode;
    $(document).ready(function () {
      $("body").css('background-image', 'none');

      // right-nav-bar
      $("#th").click(function () {
        $("#en").removeClass("active");
        $("#th").addClass("active");
      });
      $("#en").click(function () {
        $("#th").removeClass("active");
        $("#en").addClass("active");
      });

      //start create export 17-12-65
      // if 2D => .jpg
      if (mode == "2D") {
        $("#export").click(function () {
          var element = jQuery("#graph")[0];
          html2canvas(element).then((canvas) => {
            let img = canvas.toDataURL('image/jpg');
            const fakeLink = window.document.createElement('a');
            fakeLink.download = 'Graph_SEAPlag.jpg';
            fakeLink.href = img;
            document.body.appendChild(fakeLink);
            fakeLink.click();
            document.body.removeChild(fakeLink);
            fakeLink.remove();
          });
        });
      } else if (mode == "3D") {
        $("#export").hide();
      }
      //end create export 17-12-65

      // การเรียกใช้ ้modal 
      $("#hint-btn").click(function () {
        $(".modal").css('display', 'block');
      });

      $(".close").click(function () {
        $(".modal").css('display', 'none');
      });

      $(window).click(function (e) {
        if ($(e.target).is("div#myModal.modal")) {
          $(".modal").css('display', 'none');
        }
      });
    });

  }

  set_graph() {
    // Read graph data
    var GraphObject: any = "";
    GraphObject = Object.assign({}, this.GraphData);

    /* Nodes */
    var nodes = GraphObject.submission_id_to_display_name;
    // Nodes Formatter.
    var final_nodes = [];
    var temp_nodes = [];
    for (let i in nodes)
      final_nodes.push(i);

    for (let i in nodes)
      temp_nodes.push(i);

    const GROUPS = 12;
    for (let i = 0; i < final_nodes.length; i++) {
      final_nodes[i] = { id: final_nodes[i], group: Math.ceil(Math.random() * GROUPS) };
    }

    /* Links */
    var minValue: number = this.minValue;
    var links = GraphObject.metrics[0]["topComparisons"];
    for (let i = 0; i < links.length; i++) {
      links[i].similarity = links[i].similarity * 100;
      links[i].similarity = parseInt(links[i].similarity);

      if (links[i].similarity < 0) {
        links.splice(i);
      } else {
        if (links[i].similarity < minValue) {
          links.splice(i);
        }
      }
    }

    // Links Formatter.
    for (let i = 0; i < links.length; i++) {
      links[i].source = links[i].first_submission;
      links[i].target = links[i].second_submission;
      links[i].value = links[i].similarity + "%";

      delete links[i].first_submission;
      delete links[i].second_submission;
      delete links[i].similarity;
    }

    // Remove nodes which no edge.
    // for(let i=0;i<temp_nodes.length;i++){
    //   let switch_check = 0;

    //   for(let j=0;j<links.length;j++){
    //     let temp_source = links[j].source;
    //     let temp_target = links[j].target;
    //     if (temp_nodes[i] == temp_source || temp_nodes[i] == temp_target) {
    //       switch_check = 1;
    //       break;
    //     }
    //   }

    //   if (switch_check == 0) {
    //     final_nodes.splice(i, 1);
    //   } else{
    //     continue;
    //   }
    // }

    // Set nodes and links.
    GraphObject["nodes"] = final_nodes;
    GraphObject["links"] = links;

    // Create graph
    this.create_graph(GraphObject);
  }

  create_graph(GraphObject: any) {
    // Creat graph.
    const NODE_R = 8;
    const highlightNodes = new Set();
    const highlightLinks = new Set();
    var hoverNode: string[] = [];

    // การแสดงกราฟ
    if (this.mode == "2D") {// การแสดงกราฟในรูปแบบ 2D
      this.Graph = ForceGraph()(document.getElementById("graph") as HTMLCanvasElement)
        .graphData(GraphObject)
        /* Setting graph. */
        // Node //
        .nodeId('id')
        .nodeVal('val')
        .nodeLabel('id')
        .nodeRelSize(8)
        .nodeAutoColorBy('group')
        .nodeCanvasObjectMode(() => 'after')
        .nodeCanvasObject((node, ctx) => {
          let temp_id: string;
          let temp_x: number;
          let temp_y: number;
          if (node.id === undefined) {
            temp_id = "";
          } else {
            temp_id = node.id.toString();
          }
          if (node.x === undefined || node.y === undefined) {
            temp_x = 1;
            temp_y = 1;
          } else {
            temp_x = node.x;
            temp_y = node.y;
          }
          ctx.beginPath();
          ctx.arc(temp_x, temp_y, NODE_R * 0, 0, 2 * Math.PI, false);
          ctx.fillStyle = node === hoverNode ? '' : '#000000';
          ctx.fillText(temp_id, temp_x + 7, temp_y - 8);
          ctx.fill();
        })
        .onNodeDragEnd(node => {
          node.fx = node.x;
          node.fy = node.y;
        })
        .onNodeClick(node => {
          this.Graph.centerAt(node.x, node.y, 1000);
          this.Graph.zoom(8, 2000);
        })

        // Link //
        .linkSource('source')
        .linkTarget('target')
        .linkLabel('value')
        .linkCanvasObjectMode(() => 'after')
        .linkCanvasObject((link, ctx) => {

        })
        .onLinkHover(link => {
          highlightNodes.clear();
          highlightLinks.clear();

          if (link) {
            highlightLinks.add(link);
            highlightNodes.add(link.source);
            highlightNodes.add(link.target);
          }
        })
        .autoPauseRedraw(false)
        .linkWidth(5)
        .linkDirectionalParticles(4)
        .linkDirectionalParticleWidth(link => highlightLinks.has(link) ? 4 : 0)
        .onLinkClick(link => {
          const temp_source = JSON.stringify(link.source);
          const temp_target = JSON.stringify(link.target);
          const start = temp_source.substring(7, temp_source.indexOf(",") - 1);
          const end = temp_target.substring(7, temp_target.indexOf(",") - 1);

          // Redirect to Compare page.
          this.show_comparison(start, end);
        })
    } else if (this.mode == "3D") { // การแสดงกราฟในรูปแบบ 3D
      this.Graph = ForceGraph3D()(document.getElementById("graph") as HTMLCanvasElement)
        .graphData(GraphObject)
        // Node //
        .nodeId('id')
        .nodeVal('val')
        .nodeLabel('id')
        .nodeAutoColorBy('group')
        .nodeRelSize(8)
        .nodeOpacity(1)
        .onNodeDragEnd(node => {
          node.fx = node.x;
          node.fy = node.y;
          node.fz = node.z;
        })
        .onNodeClick(node => {
          let temp_x: number;
          let temp_y: number;
          let temp_z: number;
          if (node.x === undefined || node.y === undefined || node.z === undefined) {
            temp_x = 1;
            temp_y = 1;
            temp_z = 1;
          } else {
            temp_x = node.x;
            temp_y = node.y;
            temp_z = node.z;
          }
          const distance = 40;
          const distRatio = 1 + distance / Math.hypot(temp_x, temp_y, temp_z);
          const newPos = node.x || node.y || node.z
            ? { x: temp_x * distRatio, y: temp_y * distRatio, z: temp_z * distRatio }
            : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)

          this.Graph.cameraPosition(
            newPos, // new position
            node, // lookAt ({ x, y, z })
            3000  // ms transition duration
          );
        })

        // Link //
        .linkSource('source')
        .linkTarget('target')
        .linkLabel('value')
        .linkOpacity(1)
        .linkWidth(5)
        .linkThreeObjectExtend(true)
        .onLinkClick(link => {
          const temp_source = JSON.stringify(link.source);
          const temp_target = JSON.stringify(link.target);
          const start = temp_source.substring(7, temp_source.indexOf(",") - 1);
          const end = temp_target.substring(7, temp_target.indexOf(",") - 1);

          // Redirect to Compare page.
          this.show_comparison(start, end);
        })
    }
  }

  // เปลี่ยนการแสดงผลไปที่หน้า Details หรือหน้าแสดงรายละเอียดการเปรียบเทียบไฟล์
  show_comparison(start: String, end: String) {
    var urlTree = this.router.createUrlTree(['/Details'], {
      queryParams: {
        language: this.current_language,
        filename: this.filename,
        dest: this.dest,
        source: start,
        target: end
      }
    });

    var url = this.router.serializeUrl(urlTree);
    window.open(url, '_blank');
  }

  // เปลี่ยนการแสดงผลไปที่หน้าGraph
  set_display_output() {
    var urlTree = this.router.createUrlTree(['/Graph'], {
      queryParams: {
        language: this.current_language,
        filename: this.filename,
        dest: this.dest,
        mode: this.mode,
        min: this.minValue,
        max: 100
      }
    });

    var url = this.router.serializeUrl(urlTree);
    window.open(url, '_self');
  }

  // เปลี่ยนการแสดงผลไปที่หน้าtable
  show_display_table() {
    var urlTree = this.router.createUrlTree(['/Table'], {
      queryParams: {
        language: this.current_language,
        filename: this.filename,
        dest: this.dest
      }
    });

    var url = this.router.serializeUrl(urlTree);
    window.open(url, '_blank');
  }

  // การใช้คำสำหรับภาษาไทย
  switch_to_th() {
    this.current_language = "TH";

    this.navbar_Thai_language = "ไทย";
    this.navbar_Eng_language = "อังกฤษ";
    this.title_1 = "คู่มือ";
    this.title_2 = "";
    this.title_3 = "การใช้งาน";
    this.UM_scope = "ผู้ใช้สามารถกำหนดขอบเขตเปอร์เซนต์ความคล้ายคลึงกันของข้อมูลซอร์สโค้ดบนกราฟที่ผู้ใช้ต้องการแสดง";
    this.UM_confirm = "ปุ่มสำหรับยืนยันขอบเขตเปอร์เซนต์ความคล้ายคลึงกันของข้อมูลซอร์สโค้ดบนกราฟที่ผู้ใช้ต้องการ";
    this.UM_table = "ปุ่มสำหรับแสดงผลลัพธ์ความคล้ายคลึงกันของซอร์สโค้ดในรูปแบบตาราง";
    this.UM_Export = "ปุ่มสำหรับดาวน์โหลดกราฟ 2D เป็นรูปแบบไฟล์รูปภาพ";
    this.UM_2D = "ปุ่มสำหรับเปลี่ยนการแสดงผลกราฟให้อยู่ในรูปแบบ 2D";
    this.UM_3D = "ปุ่มสำหรับเปลี่ยนการแสดงผลกราฟให้อยู่ในรูปแบบ 3D";
    this.UM_node = "โฟลเดอร์หรือไดเรคทอรีย่อย ซึ่งใช้แทนผู้เป็นเจ้าของซอร์สโค้ดชุดนั้นๆ โดยแต่ละโหนดจะมีการแสดงชื่อของผู้เป็นเจ้าของชุดซอร์สโค้ดกำกับเอาไว้";
    this.UM_line = "ความสัมพันธ์ระหว่างโหนดซึ่งในที่นี้คือร้อยละความคล้ายคลึงกันระหว่างชุดซอร์สโค้ด";
    this.UM_grap = "ความสามารถพิเศษที่กราฟสามารถทำงานได้ คือ 1) เมื่อผู้ใช้กดที่เส้นความสัมพันธ์ระบบจะไปที่หน้าถัดไป 2) เมื่อผู้ใช้ทำการกดที่โหนดระบบจะทำการซูมเจาะจงไปที่โหนดโดยตรง 3) ผู้ใช้สามารถปรับโหนดเพื่อตรวจสอบได้ง่ายขึ้นได้";

    this.btn_scope = "ขอบเขตข้อมูล";
    this.btn_confirm = "ปุ่มยืนยัน";
    this.btn_Table = "ปุ่มตาราง";
    this.btn_Export = "ปุ่มบันทึกภาพ";
    this.btn_2D_Display = "ปุ่มปรับ 2D";
    this.btn_3D_Display = "ปุ่มปรับ 3D";
    this.btn_Node = "โหนด";
    this.btn_Branch = "เส้นความสัมพันธ์";
    this.btn_Graph = "กราฟข้อมูล";

    this.scope_language = "ความคล้ายคลึงกันของซอร์สโค้ด (%)";

    if (this.mode == "3D") {
      this.suggest_language = "";
    } else {
      this.suggest_language = "คลิกเมาส์ซ้าย: เลื่อน, ลูกกลิ้งเมาส์: ซูม";
    }
  }

  // การใช้คำสำหรับภาษาอังกฤษ
  switch_to_eng() {
    this.current_language = "EN";

    this.navbar_Thai_language = "TH";
    this.navbar_Eng_language = "EN";
    this.title_1 = "USER ";
    this.title_2 = " ";
    this.title_3 = " MANUAL";

    this.UM_scope = "The user can define the similarity percentage range of the source code data on the graph that the user wants to display.";
    this.UM_confirm = "Button for confirming the similarity percentage boundaries of the source code data on the graph that the user wants.";
    this.UM_table = "Button to display source code similarity results in table format.";
    this.UM_Export = "Button for download 2D chart as image file format.";
    this.UM_2D = "Button for changing the graph display to be in 2D format.";
    this.UM_3D = "Button for changing the graph display to be in 3D format.";
    this.UM_node = "folder or subdirectory Which represents the owner of that source code set, where each Node will display the name of the owner of the source code set.";
    this.UM_line = "The relationship between nodes, here is the percentage similarity between source code sets or Source Code Similarity.";
    this.UM_grap = "The special ability that the graph can work on is 1) When the user presses on Branch, the system will go to the next page. 2) When the user presses on the node, the system will zoom directly to the specific node. 3) The user can adjust the node to check more easily.";

    this.btn_scope = "Scope Data";
    this.btn_confirm = "Confirm";
    this.btn_Table = "Table";
    this.btn_Export = "Export";
    this.btn_2D_Display = "2D Display";
    this.btn_3D_Display = "3D Display";
    this.btn_Node = "Node";
    this.btn_Branch = "Branch";
    this.btn_Graph = "Graph";

    this.scope_language = "Source Code Similarity (%)";

    if (this.mode == "3D") {
      this.suggest_language = "";
    } else {
      this.suggest_language = "Left-click: move, Mouse-wheel: zoom";
    }
  }

  // เปลี่ยนรูปแบบการแสดงผลเป็น2d
  change_to_2d() {
    var urlTree = this.router.createUrlTree(['/Graph'], {
      queryParams: {
        language: this.current_language,
        filename: this.filename,
        dest: this.dest,
        mode: "2D",
        min: this.minValue,
        max: 100
      }
    });

    var url = this.router.serializeUrl(urlTree);
    window.open(url, '_self');
  }

  // เปลี่ยนรูปแบบการแสดงผลเป็น3d
  change_to_3d() {
    var urlTree = this.router.createUrlTree(['/Graph'], {
      queryParams: {
        language: this.current_language,
        filename: this.filename,
        dest: this.dest,
        mode: "3D",
        min: this.minValue,
        max: 100
      }
    });

    var url = this.router.serializeUrl(urlTree);
    window.open(url, '_self');
  }

  // แสดงSpinnerที่ใช้รอหน้าเว็บดาวน์โหลด
  showSpinner(): void {
    this.spinner.show();
  }

  // ปิดSpinnerที่ใช้รอหน้าเว็บดาวน์โหลด
  hideSpinner(): void {
    this.spinner.hide();
  }

  // การแสดงข้อผิดพลาดในการดึงข้อมูลจากการประมวลผล
  show_error() {
    if (this.current_language == "TH") {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด!',
        text: 'ไม่สามารถดึงข้อมูลการประมวลผลลัพธ์ได้',
        icon: 'error',
        showCancelButton: false,
        showDenyButton: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/';
        }
      });
    } else if (this.current_language == "EN") {
      Swal.fire({
        title: 'Error!',
        text: "Can't query a processed result data.",
        icon: 'error',
        showCancelButton: false,
        showDenyButton: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/';
        }
      });
    }
  }
}