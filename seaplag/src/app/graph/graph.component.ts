import { Component, OnInit, ElementRef, ViewChild, VERSION } from '@angular/core';
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

  ngOnInit() {
    $(document).ready(function(){
      $("body").css('background-image' , 'none');
    });
  
    /* Nodes */
    var nodes = this.GraphData.submission_id_to_display_name;
    
    // Nodes Formatter.
    var final_nodes = [];
    var temp_nodes = [];
    for(var i in nodes)
      final_nodes.push(i);
    for(var i in nodes)
      temp_nodes.push(i);

    for(let i=0;i<final_nodes.length;i++){
      // Random nodes color.
      var random_color = Math.floor(Math.random() * 100) + 1;
      final_nodes[i] = {id : final_nodes[i], group: random_color};
    }

    /* Links */
    var links = this.GraphData.metrics[0]["topComparisons"];
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
      links[i].value = links[i].similarity;

      delete links[i].first_submission;
      delete links[i].second_submission;
      delete links[i].similarity;
    }

    // Remove nodes which no edge.
    for(let i=0;i<temp_nodes.length;i++){
      var switch_check = 0;
      
      for(let j=0;j<links.length;j++){
        var temp_scoure = links[j].source;
        var temp_target = links[j].target;

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

    var graph = document.getElementById("graph") as HTMLCanvasElement;
      const Graph = ForceGraph()
      (graph)
        .graphData(this.GraphData)
        .nodeId('id')
        .nodeLabel('id')
        .nodeAutoColorBy('group')
        .linkSource('source')
        .linkTarget('target')
        .linkLabel('value')
  }
}
