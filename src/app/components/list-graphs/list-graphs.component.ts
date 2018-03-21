import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-graphs',
  templateUrl: './list-graphs.component.html',
  styleUrls: ['./list-graphs.component.css']
})
export class ListGraphsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {}

  goBack(): void {}

  next() {
    this.router.navigate(['/selectData/']);
  }
}
