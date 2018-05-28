import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { GraphService } from '../../services/graph.service';
import { GaodcService } from '../../services/gaodc.service';
import { NgxCarousel } from 'ngx-carousel';
import { UtilsGraphService } from './../exportedFunctions/utilsChats.util';
import { prepareArrayXY } from '../exportedFunctions/lib';
import { reducerMapPoints } from '../exportedFunctions/lib';

declare var jQuery:any;

@Component({
  selector: 'app-list-graphs',
  templateUrl: './list-graphs.component.html',
  styleUrls: ['./list-graphs.component.css']
})
export class ListGraphsComponent implements OnInit {
  imgags: string[];

  dataProcess:any;
  dataset:any;

  carouselData: Array<any> = [];
  carouselTileTwo: NgxCarousel;
  chartLegend = true;
  chartOptions: any = {
    responsive: true
  };
  isMap: boolean;
  points: any;
  mapsPoints = [];
  pagination = 0;
  public mapDescriptions =[];

  n_graphs = 6;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private listGraphService: GraphService,
    private utilsGraphService: UtilsGraphService
  ) {
    // Event that disable the loading screen and update the carousel
    this.utilsGraphService.loading.subscribe(value => {
      if(value == false){
        this.loadCarousel();
        jQuery("#listModal").modal("hide");
      }
    })
  }

  ngOnInit() {
    this.carouselTileTwo = {
      /*
      xs - mobile, sm - tablet, md - desktop, lg - large desktops, all - fixed width (When you use all make others 0 and vise versa)
       */
      grid: { xs: 1, sm: 3, md: 4, lg: 6, all: 470 },
      // speed: 600,
      // interval: 3000,
      point: {
        visible: true
      },
      load: 2,
      touch: true
    };

    this.loadCarousel();
  }

  loadCarousel(){
    this.listGraphService.getCharts( this.pagination, this.n_graphs).subscribe(data => {
      this.carouselData = data.charts;
      data.charts.forEach((chart, index) => {
        if(chart.isMap){
          this.mapsPoints[index] = prepareArrayXY(chart.data[0].data, chart.labels);
        }
      });
    });
  }

  goBack() { }

  openChart(id) {
    this.router.navigate(['/charts/' + id]);
  }

  openEmbedChart(id) {
    this.router.navigate(['/charts/embed/' + id]);
  }

  updateChart(id) {
    this.listGraphService.downloadProcess(id).subscribe(dataProcess => {
      if (dataProcess.typeOfData == 'CKAN') {
        this.utilsGraphService.ckanReloadChart(dataProcess);
      }else if (dataProcess.typeOfData == 'GAODC') {
          this.utilsGraphService.gaodcReloadChart(dataProcess);
      }else if (dataProcess.typeOfData == 'URL') {
            this.utilsGraphService.urlReloadChart(dataProcess);
      }else if (dataProcess.typeOfData == 'VIRTUOSO') {
        jQuery("#listModal").modal("hide");
        // Prepare Dataset
        this.dataProcess = dataProcess;
        this.dataset = dataProcess.dataset;
        jQuery("#virtuosoModal").modal('show');
      }
    });
  }

  callUpdateVirtuoso(){
    jQuery("#listModal").modal("show");
    this.dataProcess.dataset = this.dataset;
    this.utilsGraphService.virtuosoReloadChart(this.dataProcess);
  }

  pageGraphs(n){
    if( (this.pagination + n) >= 0 && (this.carouselData.length == this.n_graphs || n == -1)){
      this.pagination += n;
      this.loadCarousel();
    }
  }

  next() {
    this.router.navigate(['/selectData/']);
  }
}
