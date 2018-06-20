import { Component, OnInit } from '@angular/core';
import { GraphService } from '../../services/graph.service';
import { Router, ActivatedRoute } from '@angular/router';
import { prepareArrayXY } from '../exportedFunctions/lib';

@Component({
  selector: 'app-embed-graph',
  templateUrl: './embed-graph.component.html',
  styleUrls: ['./embed-graph.component.scss']
})
export class EmbedGraphComponent implements OnInit {
  // public chartData = [];
  public chartLegend = false;
  public chartOptions: any = {
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
            callback: function(value, index, array) {
              return null;
            }
          }
        }
      ]
    }
  };

  public chart: any;
  public widthGraph: any;
  public isMap: any;
  public points: any;
  public title: any;
  public descriptions: any;

  constructor(
    private router: Router,
    private graphservice: GraphService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.activatedRoute.snapshot.url[2].path !== '') {
      this.graphservice
        .getChart(this.activatedRoute.snapshot.url[2])
        .subscribe(chart => {
          this.chart = chart;
          this.title = chart.title;
          this.widthGraph = chart.width;

          if (!chart.isMap) {
            this.chart = chart;
          } else {
            this.isMap = chart.isMap;
            this.descriptions = chart.descriptions;

            this.points = prepareArrayXY(chart.data[0].data, chart.labels);
          }
        });
    }
  }
}
