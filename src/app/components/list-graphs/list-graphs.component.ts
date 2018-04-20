import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { GraphService } from '../../services/graph.service';
import { GaodcService } from '../../services/gaodc.service';
import { NgxCarousel } from 'ngx-carousel';
import { UpdateGraphService } from './updateChats.util';

declare var jQuery:any;

@Component({
  selector: 'app-list-graphs',
  templateUrl: './list-graphs.component.html',
  styleUrls: ['./list-graphs.component.css']
})
export class ListGraphsComponent implements OnInit {
  imgags: string[];
  public carouselData: Array<any> = [];
  public carouselTileTwo: NgxCarousel;
  public chartLegend = true;
  public chartOptions: any = {
    responsive: true
  };

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private listGraphService: GraphService,
    private updateGraphService: UpdateGraphService
  ) {
    // Event that disable the loading screen and update the carousel
    this.updateGraphService.loading.subscribe(value => {
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
    this.listGraphService.getCharts().subscribe(data => {
      this.carouselData = data.charts;
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
      if (dataProcess.typeOfData == 'GAODC') {
          this.updateGraphService.gaodcReloadChart(dataProcess);
      }
    });
  }

  next() {
    this.router.navigate(['/selectData/']);
  }
}
