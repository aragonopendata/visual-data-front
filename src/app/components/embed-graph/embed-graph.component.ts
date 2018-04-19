import { Component, OnInit } from '@angular/core';
import { GraphService } from '../../services/graph.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-embed-graph',
  templateUrl: './embed-graph.component.html',
  styleUrls: ['./embed-graph.component.css']
})
export class EmbedGraphComponent implements OnInit {
  // public chartData = [];
  public chartLegend = true;
  public chartOptions: any = {
    responsive: true
  };

  public chart: any;

  constructor(
    private router: Router,
    private graphservice: GraphService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.graphservice
      .getChart(this.activatedRoute.snapshot.url[2])
      .subscribe(data => {
        this.chart = data;
      });
  }
}
