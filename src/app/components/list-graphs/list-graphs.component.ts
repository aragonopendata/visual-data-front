import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap, NavigationError } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { GraphService } from '../../services/graph.service';
import { GaodcService } from '../../services/gaodc.service';
import { NgxCarousel } from 'ngx-carousel';
import { UtilsGraphService } from './../exportedFunctions/utilsChats.util';
import { prepareArrayXY } from '../exportedFunctions/lib';
import { reducerMapPoints } from '../exportedFunctions/lib';
import { getRandomColor } from '../exportedFunctions/lib';
import { DOCUMENT } from '@angular/common';
import { VisualGrapsService } from '../../services/visual-graps.service';

import { UtilsService } from '../exportedFunctions/utils.service';
import { NavigationService } from '../../services/navigation.service';

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

  type:string;

  closed: boolean=true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private listGraphService: GraphService,
    private utilsGraphService: UtilsGraphService, 
    private utilsService: UtilsService,
    private myService: VisualGrapsService,
    private _navigationService: NavigationService) {
    // Check if the browser is IE
    const ua = window.navigator.userAgent;

    const msie = ua.indexOf('MSIE ');
    const trident = ua.indexOf('Trident/');
    if (msie > 0 || trident > 0) {
      this.n_graphs = 3;
    }
    this.mobile = false;

    this.route.params.subscribe(params => {
      this.type=params.type; 
      // Event that disable the loading screen and update the carousel
      this.utilsGraphService.loading.subscribe(value => {
        if (value === false) {
          if(this.type === "number"){
            this.loadCarouselNumber();
          }else{
            this.loadCarousel();
          }
          setTimeout(function() {
            jQuery('#listModal').modal('hide');
          }, 1000);
        }
      });
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
    if (this.type == "number"){
      this.loadCarouselNumber();
    }
    else{
      this.loadCarousel();
    } 
  }

  loadCarousel() {
    this.closed=false;
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

  loadCarouselNumber() {
    this.carouselData = [];
    this.listGraphService
      .getChartsByType(this.pagination, this.n_graphs, this.type)
      .subscribe(data => {
        this.carouselData = data.charts;
      });
  }

  goBack() {}

  openChart(id) {
    this.router.navigate([{outlets: {modal: 'visualData/charts/' + id}}]);

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
      } else if (dataProcess.typeOfData === 'SPARQL') {
        // jQuery("#listModal").modal("hide");
        // Prepare Dataset
        this.dataProcess = dataProcess;
        this.dataset = dataProcess.dataset;
        jQuery('#virtuosoModal').modal('show');
      }
    });
    setTimeout(() => (this.isupdating = false), 2000);
  }

  selectChart(id, title){
    document.getElementsByTagName('body')[0].classList.remove('no-scroll'); 
    this.myService.setIdGraph(id);
    this.myService.setTitleGraph(title);
    this.router.navigate([{outlets: {modal: null}}]);
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
      if(this.type == 'number'){
        this.loadCarouselNumber();
      }else{
        this.loadCarousel();
      }
      this.moveTop.nativeElement.focus();
    }
  }

  next() { 
    this._navigationService.resetSelectData();
    this.router.navigate([{outlets: {modal: 'visualData/selectData/'+this.type}}]);
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