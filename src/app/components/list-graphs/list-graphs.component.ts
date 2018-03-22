import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ListGraphService } from '../../services/list-graph.service';

@Component({
  selector: 'app-list-graphs',
  templateUrl: './list-graphs.component.html',
  styleUrls: ['./list-graphs.component.css']
})
export class ListGraphsComponent implements OnInit {
  charts: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private listGraphService: ListGraphService
  ) {
    this.charts = [];
  }

  ngOnInit() {
    this.listGraphService.getCharts().subscribe(data => {
      this.charts = data.charts;
    });
  }

  goBack() {}

  next() {
    this.router.navigate(['/selectData/']);
  }
}
