import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { GraphService } from '../../services/graph.service';
import { DOCUMENT } from '@angular/platform-browser';

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
  public routeEmbed: any;
  public fullRoute: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private graphservice: GraphService,
    @Inject(DOCUMENT) document: any
  ) {
    this.fullRoute = document.location.protocol + '//' + document.location.hostname + ':' + document.location.port;
  }

  ngOnInit(): void {
    let id;
    id = this.activatedRoute.snapshot.url[1];
    if(id.path != ""){
      this.routeEmbed = this.fullRoute + '/charts/embed/' + id;
      this.graphservice.getChart(id).subscribe(data => {
          if (!data || data.status == 'notFound' ) {
              this.router.navigate(['/']);
          }
          this.chart = data;
      });
    }else{
      this.router.navigate(['/charts/' + id]);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
