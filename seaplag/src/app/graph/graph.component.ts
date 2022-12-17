import { Component, OnInit, ElementRef, ViewChild, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import ForceGraph from 'force-graph';
import Data from '../../assets/datasets/overview.json';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  ForceGraph = require('force-graph');
  GraphData = Data;

  start_scope = 1;
  end_scope = 100;

  constructor(private router: Router){}

  ngOnInit() {
    $(document).ready(function(){
      $("body").css('background-image' , 'none');
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
      if((links[i].similarity) < 1 || links[i].similarity > 100){
        links.splice(i);
      }
    }

    // Links Formatter.
    for(let i=0;i<links.length;i++){
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

        if(temp_nodes[i] == temp_scoure || temp_nodes[i] == temp_target){
          switch_check = 1;
          break;
        }
      }

      if(switch_check == 0){
        final_nodes.splice(i);
      }else
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

  show_comparison(start: String, end: String){
    window.open('/Details/['+start+']/['+end+']', '_blank');
  }

  export_graph(){
    alert("ex");
  }

  set_display_output(){
    alert("set");
    // destroy graph.
    // let TempGraphObject = this.GraphData;

    // for(let i=0;i<TempGraphObject["links"].length;i++){
    //   let link_value: number =  +TempGraphObject["links"][i]["value"].slice(0, -1);
    //   if(link_value < this.start_scope || link_value > this.end_scope){
    //     TempGraphObject["links"].splice(i);
    //   }
    // }

    // // Remove nodes which no edge.
    // for(let i=0;i<TempGraphObject["nodes"].length;i++){
    //   let switch_check = 0;
    //   for(let j=0;j<TempGraphObject["links"].length;j++){
    //     let temp_source = TempGraphObject["links"][j].source;
    //     let temp_target = TempGraphObject["links"][j].target;
    //     if(TempGraphObject["nodes"][i]["id"] == temp_source["id"] || TempGraphObject["nodes"][i]["id"] == temp_target["id"]){
    //       switch_check = 1;
    //       break;
    //     }
    //   }

    //   if(switch_check == 0){
    //     TempGraphObject["nodes"].splice(i);
    //   }else
    //     continue;
    // }
  }

  reset_display_output(){
    alert("reset");
    // destroy graph.
    // let GraphObject = this.GraphData;
    // this.create_graph(GraphObject);
  }
}
