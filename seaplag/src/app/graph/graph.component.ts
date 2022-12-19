import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import ForceGraph from 'force-graph/';
import Data from '../../assets/datasets/overview.json';
import html2canvas from 'html2canvas';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  ForceGraph: any = "";
  GraphData: any = "";  
  Graph: any = "";
  current_language: string = "";
  file_id: string = "";
  navbar_language_1: string = "";
  navbar_language_2: string = "";

  isTH: boolean = false;
  isEN: boolean = false;

  // Slider options.
  minValue: number = 1;
  maxValue: number = 100;
  options: Options = {
    floor: 1,
    ceil: 100,
  };

  constructor(private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
    var params = this.route.snapshot.queryParams;
    var language = params['language'];
    var file_id = params['file_id'];
    this.minValue = params['min'];
    this.maxValue = params['max'];

    this.file_id = file_id;
    if(language == "TH"){
      this.isTH = true;
      this.isEN = false;
      this.switch_to_th();
    }else if(language == "EN"){
      this.isTH = false;
      this.isEN = true;
      this.switch_to_eng();
    }else{
      this.isTH = true;
      this.isEN = false;
      this.switch_to_th();
    }

    // Read JSON data.
    this.ForceGraph = require('force-graph');
    this.GraphData = Data;

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
    // Read graph data
    var GraphObject: any = ""; 
    GraphObject = Object.assign({}, this.GraphData);

    /* Nodes */
    var nodes = GraphObject.submission_id_to_display_name;
    // Nodes Formatter.
    var final_nodes = [];
    var temp_nodes = [];
    for(let i in nodes)
      final_nodes.push(i);
    for(let i in nodes)
      temp_nodes.push(i);
    const GROUPS = 12;
    for(let i=0;i<final_nodes.length;i++){
      final_nodes[i] = {id : final_nodes[i], group: Math.ceil(Math.random() * GROUPS)};
    }

    /* Links */
    var links = GraphObject.metrics[0]["topComparisons"];
    for(let i=0;i<links.length;i++){
      links[i].similarity = links[i].similarity*100;
      links[i].similarity = parseInt(links[i].similarity);
      // If similarity equal 0.
      if ((links[i].similarity) <= 0) {
        links.splice(i);
      }
    }
    // Scope calculation.
    for(let i=0;i<links.length;i++){
      if(links[i].similarity < this.minValue || links[i].similarity > this.maxValue){
        links.splice(i);
      }
    }
    // Links Formatter.
    for (let i = 0; i < links.length; i++) {
      links[i].source = links[i].first_submission;
      links[i].target = links[i].second_submission;
      links[i].value = links[i].similarity;

      delete links[i].first_submission;
      delete links[i].second_submission;
      delete links[i].similarity;
    }

    // Remove nodes which no edge.
    for(let i=0;i<temp_nodes.length;i++){
      let switch_check = 0;
      
      for(let j=0;j<links.length;j++){
        let temp_source = links[j].source;
        let temp_target = links[j].target;
        if (temp_nodes[i] == temp_source || temp_nodes[i] == temp_target) {
          switch_check = 1;
          break;
        }
      }

      if (switch_check == 0) {
        final_nodes.splice(i);
      } else{
        continue;
      }
    }

    // Set nodes and links.
    GraphObject["nodes"] = final_nodes;
    GraphObject["links"] = links;

    // Copy clean graph.
    this.GraphData = Object.assign({}, GraphObject);
    for (let i = 0; i < GraphObject.links.length; i++) {
      GraphObject.links[i].value = GraphObject.links[i].value+ "%"; // add '%'
    } 

    // Create graph
    this.create_graph(GraphObject);
  }
  

  create_graph(GraphObject: any){
    // Creat graph.
    const NODE_R = 8;
    const highlightNodes = new Set();
    const highlightLinks = new Set();
    var hoverNode: string[] = [];
    this.Graph = ForceGraph()(document.getElementById("graph") as HTMLCanvasElement)
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
    var urlTree = this.router.createUrlTree(['/Details'], {
      queryParams: {
        language: this.current_language,
        file_id: this.file_id,
        sourec: start,
        target: end 
      }
    });

    var url = this.router.serializeUrl(urlTree);
    window.open(url, '_blank');
  }

  set_display_output() {
    var urlTree = this.router.createUrlTree(['/Graph'], {
      queryParams: {
        language: this.current_language,
        file_id: this.file_id,
        min: this.minValue,
        max: this.maxValue
      }
    });

    var url = this.router.serializeUrl(urlTree);
    window.open(url, '_self');

    // Something not right (bug detected).
  }

  reset_display_output(){
    var urlTree = this.router.createUrlTree(['/Graph'], {
      queryParams: {
        language: this.current_language,
        file_id: this.file_id,
        min: 1,
        max: 100
      }
    });
    var url = this.router.serializeUrl(urlTree);
    window.open(url, '_self');
  }

  switch_to_th(){
    this.current_language = "TH";

    this.navbar_language_1 = "ไทย";
    this.navbar_language_2 = "อังกฤษ";
  }

  switch_to_eng(){
    this.current_language = "EN";

    this.navbar_language_1 = "TH";
    this.navbar_language_2 = "EN";
  }
}
