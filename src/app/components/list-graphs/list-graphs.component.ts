import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { GraphService } from '../../services/graph.service';
import { GaodcService } from '../../services/gaodc.service';
import { NgxCarousel } from 'ngx-carousel';
import { UtilsGraphService } from './../exportedFunctions/utilsChats.util';
import { prepareArrayXY } from '../exportedFunctions/lib';
import { reducerMapPoints } from '../exportedFunctions/lib';
import { getRandomColor } from '../exportedFunctions/lib';

import { UtilsService } from '../exportedFunctions/utils.service';

declare var jQuery: any;

@Component({
  selector: 'app-list-graphs',
  templateUrl: './list-graphs.component.html',
  styleUrls: ['./list-graphs.component.scss']
})
export class ListGraphsComponent implements OnInit {

  @ViewChild('topElement') moveTop: any;

  imgags: string[];

  dataProcess: any;
  dataset: any;

  carouselData: Array<any> = [];
  carouselTileTwo: NgxCarousel;
  chartLegend = false;
  chartOptions: any = {
    scaleShowVerticalLines: false,
    scaleShowValues: true,
    responsive: true,
    legend: {
      display: false
    },
    elements: {
      line: {
              fill: false
      }
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
  isMap: boolean;
  points: any;
  mapsPoints = [];
  pagination = 0;
  mapDescriptions = [];

  n_graphs = 6;

  mobile: boolean;
  isupdating: boolean;

  title: string;

  openedMenu: boolean;
  

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private listGraphService: GraphService,
    private utilsGraphService: UtilsGraphService, 
    private utilsService: UtilsService
  ) {
    // Check if the browser is IE
    const ua = window.navigator.userAgent;

    const msie = ua.indexOf('MSIE ');
    const trident = ua.indexOf('Trident/');
    if (msie > 0 || trident > 0) {
      this.n_graphs = 3;
    }
    this.mobile = false;
    // Event that disable the loading screen and update the carousel
    this.utilsGraphService.loading.subscribe(value => {
      if (value === false) {
        this.loadCarousel();
        setTimeout(function() {
          jQuery('#listModal').modal('hide');
        }, 1000);
      }
    });
    this.getOpenedMenu();
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

    if (window.screen.width === 360) {
      // 768px portrait
      this.mobile = true;
    }

    this.loadCarousel();
  }

  loadCarousel() {
    this.carouselData = [];
    this.listGraphService
      .getCharts(this.pagination, this.n_graphs)
      .subscribe(data => {
        this.carouselData = data.charts;
        data.charts.forEach((chart, index) => {
          if (chart.type === 'bar') {
            chart.color = [];
            for(let i = 0; i< chart.data.length; i++ ){
              chart.color.push(getRandomColor(i));
            }
          }
          if (chart.isMap) {
            this.mapsPoints[index] = prepareArrayXY(
              chart.data[0].data,
              chart.labels
            );
          }
        });
      });
  }

  goBack() {}

  openChart(id) {
    this.router.navigate(['/charts/' + id]);
  }

  openEmbedChart(id) {
    this.router.navigate(['/charts/embed/' + id]);
  }

  updateChart(id, title) {
    this.title = title;
    this.isupdating = true;
    this.listGraphService.downloadProcess(id).subscribe(dataProcess => {
      if (dataProcess.typeOfData === 'CKAN') {
        this.utilsGraphService.ckanReloadChart(dataProcess);
      } else if (dataProcess.typeOfData === 'GAODC') {
        this.utilsGraphService.gaodcReloadChart(dataProcess);
      } else if (dataProcess.typeOfData === 'URL') {
        this.utilsGraphService.urlReloadChart(dataProcess);
      } else if (dataProcess.typeOfData === 'VIRTUOSO') {
        // jQuery("#listModal").modal("hide");
        // Prepare Dataset
        this.dataProcess = dataProcess;
        this.dataset = dataProcess.dataset;
        jQuery('#virtuosoModal').modal('show');
      }
    });
    setTimeout(() => (this.isupdating = false), 2000);
  }

  callUpdateVirtuoso() {
    this.dataProcess.dataset = this.dataset;
    this.utilsGraphService.virtuosoReloadChart(this.dataProcess);
  }

  pageGraphs(n) {
    if (
      this.pagination + n >= 0 &&
      (this.carouselData.length === this.n_graphs || n === -1)
    ) {
      this.pagination += n;
      window.scrollTo(0, 0);
      this.loadCarousel();
      this.moveTop.nativeElement.focus();
    }
  }

  next() {
    this.router.navigate(['/selectData/']);
  }

  getOpenedMenu(){
    this.utilsService.openedMenuChange.subscribe(value => {
      this.openedMenu = value;
    });
  }

  toggleOpenedMenu() {
      this.utilsService.tooggleOpenedMenu();
  }
}
