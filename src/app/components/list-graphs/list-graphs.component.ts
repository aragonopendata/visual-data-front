import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { GraphService } from '../../services/graph.service';
import { GaodcService } from '../../services/gaodc.service';
import { NgxCarousel } from 'ngx-carousel';
import { gaodcReloadChart } from '../exportedFunctions/updateChats';

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
    private gaodcService: GaodcService
  ) {
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
      console.log(data.charts);
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
    console.log('Update');
    this.listGraphService.downloadProcess(id).subscribe(dataProcess => {
      if (dataProcess.typeOfData == 'GAODC') {
        //gaodcReloadChart(dataProcess, this.gaodcService, this.listGraphService);
        this.gaodcService.getPackageInfo(Number(dataProcess.dataset)).subscribe(dataTable => {
          var chartLabels; 
          var chartData; 
          gaodcReloadChart(dataProcess, dataTable, chartLabels, chartData);

          this.listGraphService.updateProcess(dataProcess.chartDataId, dataProcess.chartType,
            chartLabels, chartData, dataProcess.title, dataProcess.widthGraph).subscribe(response => {
              this.loadCarousel();
              jQuery("#listModal").modal("hide");
            });
        });
      }
    });
  }

  next() {
    this.router.navigate(['/selectData/']);
  }
}
