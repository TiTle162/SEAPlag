import { Component, OnInit, ElementRef, ViewChild, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import ForceGraph from 'force-graph';
import Data from '../../assets/datasets/overview.json';
import html2canvas from 'html2canvas';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  navbar_language_1: string = "";
  navbar_language_2: string = "";
  navbar_scope_confirm: string = "";
  navbar_scope_reset: string = "";
  title: string = "";

  // Slider options.
  minValue: number = 1;
  maxValue: number = 100;
  options: Options = {
    floor: 1,
    ceil: 100,
  };

  // Read JSON data.
  ForceGraph = require('force-graph');
  GraphData = Data;

  constructor(private router: Router){}

  ngOnInit() {
    this.switch_to_th();

    $(document).ready(function () {
      $("body").css('background-image', 'none');

      // right-nav-bar
      $("#th").click(function(){
        $("#en").removeClass("active");
        $("#th").addClass("active");
      });
      $("#en").click(function(){
        $("#th").removeClass("active");
        $("#en").addClass("active");
      });

      //start create export 17-12-65
      $("#export").click(function(){
        var element = jQuery("#graph")[0];
        html2canvas(element).then((canvas) => {
          let img = canvas.toDataURL('image/jpeg');
          const fakeLink = window.document.createElement('a');
          fakeLink.download = 'Graph_SEAPlag.jpeg';
          fakeLink.href = img;
          document.body.appendChild(fakeLink);
          fakeLink.click();
          document.body.removeChild(fakeLink);
          fakeLink.remove();
        });
      });
      //end create export 17-12-65

      $("#hint-btn").click(function(){
        $(".modal").css('display', 'block');
      });

      $(".close").click(function(){
        $(".modal").css('display', 'none');
      });

      $(window).click(function(e) {
        if($(e.target).is("div#myModal.modal")){
          $(".modal").css('display', 'none');
        }
      });

    });
  
    this.set_graph();
  }

  set_graph(){
    /* Nodes */
    let nodes = this.GraphData.submission_id_to_display_name;
        
    // Nodes Formatter.
    let final_nodes = [];
    let temp_nodes = [];
    for(let i in nodes)
      final_nodes.push(i);
    for(let i in nodes)
      temp_nodes.push(i);

    const GROUPS = 12;
    for(let i=0;i<final_nodes.length;i++){
      final_nodes[i] = {id : final_nodes[i], group: Math.ceil(Math.random() * GROUPS)};
    }

    /* Links */
    let links = this.GraphData.metrics[0]["topComparisons"];
    for(let i=0;i<links.length;i++){
      links[i].similarity = links[i].similarity*100;
      links[i].similarity = parseInt(links[i].similarity);

      // If similarity equal 0.
      if ((links[i].similarity) < 1 || links[i].similarity > 100) {
        links.splice(i);
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
    for(let i=0;i<temp_nodes.length;i++){
      let switch_check = 0;
      
      for(let j=0;j<links.length;j++){
        let temp_scoure = links[j].source;
        let temp_target = links[j].target;

        if (temp_nodes[i] == temp_scoure || temp_nodes[i] == temp_target) {
          switch_check = 1;
          break;
        }
      }

      if (switch_check == 0) {
        final_nodes.splice(i);
      } else
        continue;
    }

    // Set nodes and links.
    this.GraphData["nodes"] = final_nodes;
    this.GraphData["links"] = links;

    this.create_graph(this.GraphData);
  }

  create_graph(GraphObject: any){
    // Creat graph.
    const NODE_R = 8;
    const highlightNodes = new Set();
    const highlightLinks = new Set();
    let hoverNode: string[] = [];
    const graph = document.getElementById("graph") as HTMLCanvasElement;
    const Graph = ForceGraph()
    (graph)
      .graphData(GraphObject)
      /* Setting graph. */
      // Node //
      .nodeId('id')
      .nodeVal('val')
      .nodeLabel('id')
      .nodeAutoColorBy('group')
      .nodeCanvasObjectMode(() => 'after')
      .nodeCanvasObject((node, ctx) => {
        let temp_id: string;
        let temp_x: number;
        let temp_y: number;
        if(node.id === undefined){
          temp_id = "";
        }else{
          temp_id = node.id.toString();
        }
        if(node.x === undefined || node.y === undefined){
          temp_x = 1;
          temp_y = 1;
        }else{
          temp_x = node.x;
          temp_y = node.y;
        }
        ctx.beginPath();
        ctx.arc(temp_x, temp_y, NODE_R * 0, 0, 2 * Math.PI, false);
        ctx.fillStyle = node === hoverNode ? '' : '#000000';
        ctx.fill();
        ctx.fillText(temp_id, temp_x+5, temp_y-6);
      })
      .onNodeDragEnd(node => {
        node.fx = node.x;
        node.fy = node.y;
      })
      .onNodeClick(node => {
        Graph.centerAt(node.x, node.y, 1000);
        Graph.zoom(8, 2000);
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
      .autoPauseRedraw(false) // keep redrawing after engine has stopped
      .linkWidth(link => highlightLinks.has(link) ? 5 : 1)
      .linkDirectionalParticles(4)
      .linkDirectionalParticleWidth(link => highlightLinks.has(link) ? 4 : 0)
      .onLinkClick(link => {
        const temp_source = JSON.stringify(link.source); 
        const temp_target = JSON.stringify(link.target); 
        const start = temp_source.substring(7, temp_source.indexOf(",")-1); 
        const end = temp_target.substring(7, temp_target.indexOf(",")-1); 
        
        // Redirect to Compare page.
        this.show_comparison(start, end);
      })
  }

  show_comparison(start: String, end: String) {
    window.open('/Details/[' + start + ']/[' + end + ']', '_blank');
  }

  set_display_output() {
    // set
    alert(this.minValue+" "+this.maxValue);
  }

  reset_display_output() {
    // reset
    this.minValue = 1;
    this.maxValue = 100;
  }

  switch_to_th(){
    this.navbar_language_1 = "ไทย";
    this.navbar_language_2 = "อังกฤษ";

    this.navbar_scope_confirm = "ยืนยัน";
    this.navbar_scope_reset = "รีเซ็ต";

    this.title = "คู่มือการใช้งานระบบ";
  }

  switch_to_eng(){
    this.navbar_language_1 = "TH";
    this.navbar_language_2 = "EN";

    this.navbar_scope_confirm = "Confirm";
    this.navbar_scope_reset = "Reset";

    this.title = "USER MANUAL";

  }
}
