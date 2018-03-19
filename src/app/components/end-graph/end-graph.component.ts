import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-end-graph',
  templateUrl: './end-graph.component.html',
  styleUrls: ['./end-graph.component.css']
})
export class EndGraphComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }
}
