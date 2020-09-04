import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { GraphService } from '../../services/graph.service';
import { DOCUMENT } from '@angular/platform-browser';
import { prepareArrayXY, getRandomColor } from '../exportedFunctions/lib';
import { UtilsGraphService } from './../exportedFunctions/utilsChats.util';
import { Constants } from '../../app.constants';
import { UtilsService } from '../exportedFunctions/utils.service';
declare var jQuery: any;

@Component({
  selector: 'app-end-graph',
  templateUrl: './end-graph.component.html',
  styleUrls: ['./end-graph.component.scss']
})
export class EndGraphComponent implements OnInit {
  public chartLegend = true;
  public chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
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
            callback: function (value, index, array) {
              return null;
            }
          }
        }
      ]
    }
  };

  public chart: any;
  public points: any;
  public routeEmbed: any;
  public fullRoute: any;
  public actualRoute: any;
  public width: number;
  public isMap: boolean;
  public title: any;
  public dataProcess: any;
  public dataset: any;
  public descriptions: any;
  public id: any;
  public mapDescriptions: any;
  public color: Array<any> = [];

  public hideEmbed: boolean;

  public showData: number;
  public numberLegend: number;
  public datasetLocation: Array<any> = [];

  openedMenu: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private graphservice: GraphService,
    public utilsGraphService: UtilsGraphService,
    @Inject(DOCUMENT) document: any,
    private utilsService: UtilsService
  ) {
    window.scrollTo(0, 0);
    this.isMap = false;
    this.hideEmbed = true;
    this.width = 100;
    this.fullRoute = Constants.SERVER_URL + '/servicios/visualdata';

    this.loadGraph();
    // Event that disable the loading screen and update the carousel
    this.utilsGraphService.loading.subscribe(value => {
      if (value === false) {
        this.loadGraph();
        jQuery('#listModal').modal('hide');
      }
    });
    this.getOpenedMenu();
  }

  loadGraph() {
    let id;
    id = this.activatedRoute.snapshot.url[1];
    if (id && id.path !== '') {
      this.routeEmbed = this.fullRoute + '/charts/embed/' + id;
      // this.actualRoute = this.fullRoute + '/charts/' + id;
      this.graphservice.getChart(id).subscribe(
        chart => {
          this.graphservice.downloadProcess(id).subscribe(
            process => {
              if (process.typeOfData === 'SPARQL') {
                this.datasetLocation.push('https://opendata.aragon.es/sparql' + ' Consulta: ' + process.dataset);
              } else if (process.typeOfData === 'GAODC') {
                this.datasetLocation.push('https://opendata.aragon.es/GA_OD_Core/download?view_id=' + process.dataset + '&formato=csv&_pageSize=100&_page=1');
              } else if (process.typeOfData === 'CKAN' && process.url && process.url !== undefined){
                this.datasetLocation.push(process.url);
                this.datasetLocation.push(process.ckanDataset);
              } else {
                this.datasetLocation.push(process.dataset);
              }
              if (!chart || chart.status === 'notFound') {
                this.router.navigate(['/']);
              }
              this.width = chart.width;

              this.chart = chart;
              this.title = chart.title;

              if(chart.type =='line' || chart.type =='bar' || chart.type =='doughnut'){
                this.numberLegend=this.chart.data.length;
              }else{
                this.numberLegend=1;
              }

              if (chart.type === 'bar') {
                for (let i = 0; i < chart.data.length; i++) {
                  this.color.push(getRandomColor(i));
                }
              }

              if (process.axisXActivator != 0) {
                this.chartOptions.scales.xAxes[0].ticks = {
                  beginAtZero: true,
                  autoSkip: false,
                  callback: (value, index, array) => {
                    if (index % process.axisXActivator === 0) {
                      return value;
                    }
                  }
                }
              }

              if (!chart.isMap) {
                this.chart = chart;
              } else {
                this.isMap = chart.isMap;
                this.descriptions = chart.descriptions;
                this.points = prepareArrayXY(chart.data[0].data, chart.labels);
              }
            },
            error => {
              this.location.back();
            }
          );
        },
        error => {
          this.location.back();
        }
      );
    } else {
      this.location.back();
    }
  }

  ngOnInit(): void { }

  goBack(): void {
    this.location.back();
  }

  hideEmbedButton(n: number) {
    this.hideEmbed = false;
    this.showData = n;
  }

  updateChart(id) {
    this.graphservice.downloadProcess(id).subscribe(dataProcess => {
      if (dataProcess.typeOfData === 'CKAN') {
        this.utilsGraphService.ckanReloadChart(dataProcess);
      } else if (dataProcess.typeOfData === 'GAODC') {
        this.utilsGraphService.gaodcReloadChart(dataProcess);
      } else if (dataProcess.typeOfData === 'URL') {
        this.utilsGraphService.urlReloadChart(dataProcess);
      } else if (dataProcess.typeOfData === 'SPARQL') {
        jQuery('#listModal').modal('hide');
        // Prepare Dataset
        this.dataProcess = dataProcess;
        this.dataset = dataProcess.dataset;
        jQuery('#virtuosoModal').modal('show');
      }
    });
  }

  callUpdateVirtuoso() {
    jQuery('#listModal').modal('show');
    this.dataProcess.dataset = this.dataset;
    this.utilsGraphService.virtuosoReloadChart(this.dataProcess);
  }

  getOpenedMenu() {
    this.utilsService.openedMenuChange.subscribe(value => {
      this.openedMenu = value;
    });
  }

  toggleOpenedMenu() {
    this.utilsService.tooggleOpenedMenu();
  }
}
