import { Component, OnInit, ElementRef, ViewChild, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import ForceGraph from 'force-graph';
import Data from '../../assets/datasets/overview.json';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  ForceGraph = require('force-graph');
  GraphData = Data;

  constructor(private router: Router) { }

  ngOnInit() {
    $(document).ready(function () {
      $("body").css('background-image', 'none');
      
      //start create export 17-12-65
      document.querySelector('#export')?.addEventListener('click', function () {
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
          alert("dowload succeeds.");
        });
      });
      //end create export 17-12-65

    });

    this.creat_graph();

  }

  creat_graph() {
    /* Nodes */
    var nodes = this.GraphData.submission_id_to_display_name;

    // Nodes Formatter.
    var final_nodes = [];
    var temp_nodes = [];
    for (var i in nodes)
      final_nodes.push(i);
    for (var i in nodes)
      temp_nodes.push(i);

    for (let i = 0; i < final_nodes.length; i++) {
      final_nodes[i] = { id: final_nodes[i], group: Math.ceil(Math.random() * 12) };
    }

    /* Links */
    var links = this.GraphData.metrics[0]["topComparisons"];
    for (let i = 0; i < links.length; i++) {
      links[i].similarity = links[i].similarity * 100;
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
      links[i].value = links[i].similarity;

      delete links[i].first_submission;
      delete links[i].second_submission;
      delete links[i].similarity;
    }

    // Remove nodes which no edge.
    for (let i = 0; i < temp_nodes.length; i++) {
      var switch_check = 0;

      for (let j = 0; j < links.length; j++) {
        var temp_scoure = links[j].source;
        var temp_target = links[j].target;

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

    // Creat graph.
    const graph = document.getElementById("graph") as HTMLCanvasElement;
    const Graph = ForceGraph()
      (graph)
      .graphData(this.GraphData)
      /* Setting graph. */
      // Node //
      .nodeId('id')
      .nodeVal('val')
      .nodeLabel('id')
      .nodeAutoColorBy('group')
      .nodeCanvasObjectMode(() => 'after')
      .nodeCanvasObject((node, ctx) => {
        // Show labels
      })
      .onNodeDragEnd(node => {
        node.fx = node.x;
        node.fy = node.y;
      })
      .onNodeClick(node => {
        // console.log(node.id);
        // console.log(node.x);
        // console.log(node.y);

        Graph.centerAt(node.x, node.y, 1000);
        Graph.zoom(8, 2000);
      })

      // Link //
      .linkSource('source')
      .linkTarget('target')
      .linkLabel('value')
      .linkCanvasObjectMode(() => 'after')
      .linkCanvasObject((link, ctx) => {
        // Show labels
      })
      .onLinkClick(link => {
        const temp_source = JSON.stringify(link.source);
        const temp_target = JSON.stringify(link.target);
        const start = temp_source.substring(7, temp_source.indexOf(",") - 1);
        const end = temp_target.substring(7, temp_target.indexOf(",") - 1);

        // Redirect to Compare page.
        this.show_comparison(start, end);
      })
  }

  show_comparison(start: String, end: String) {
    window.open('/Details/[' + start + ']/[' + end + ']', '_blank');
  }

  set_display_output() {
    alert("set display output");
  }

  reset_display_output() {
    alert("reset display output");
  }
}
