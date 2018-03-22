import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { GraphService } from '../../services/graph.service';

@Component({
  selector: 'app-end-graph',
  templateUrl: './end-graph.component.html',
  styleUrls: ['./end-graph.component.css']
})
export class EndGraphComponent implements OnInit {
  public chartLegend = true;
  public chartOptions: any = {
    responsive: true
  };

  public chart: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private graphservice: GraphService
  ) {}

  ngOnInit(): void {
    let id;
    const aux = this.activatedRoute.snapshot.url[0];
    if (aux.toString() !== '/endGraphic') {
      id = this.activatedRoute.snapshot.url[2];
    } else {
      id = this.activatedRoute.snapshot.url[1];
    }
    this.graphservice.getChart(id).subscribe(data => {
      this.chart = data;
      console.log(data);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
