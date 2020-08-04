import { Component, OnInit } from '@angular/core';
import { GraphService } from '../../services/graph.service';
import { Router, ActivatedRoute } from '@angular/router';
import { prepareArrayXY } from '../exportedFunctions/lib';
import { UtilsService } from '../exportedFunctions/utils.service';
import { Constants } from '../../app.constants';

@Component({
  selector: 'app-embed-graph',
  templateUrl: './embed-graph.component.html',
  styleUrls: ['./embed-graph.component.scss']
})
export class EmbedGraphComponent implements OnInit {
  // public chartData = [];
  public chartLegend = true;
  public chartOptions: any = {
    responsive: true,
    maintainAspectRatio:false,
    legend: {
      display: true
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
            callback: function (value, index, array) {
              return null;
            }
          }
        }
      ]
    }
  };

  public chart: any;
  public widthGraph: any;
  public isMap: any;
  public points: any;
  public title: any;
  public descriptions: any;
  public numberLegend: number;

  openedMenu: boolean;
  public hideEmbed: boolean;
  public showData: number;
  public routeEmbed: any;
  public datasetLocation: Array<any> = [];
  public fullRoute: any;
  
  constructor(
    private router: Router,
    private graphservice: GraphService,
    private activatedRoute: ActivatedRoute,
    private utilsService: UtilsService
  ) { 
    this.hideEmbed = true;
    this.fullRoute = Constants.SERVER_URL + '/servicios/focus';
    this.getOpenedMenu();
  }

  ngOnInit() {
    let urlId = this.activatedRoute.snapshot.url[2].path;
    if (urlId !== '') {
      this.routeEmbed = this.fullRoute + '/charts/embed/' + urlId;
      this.graphservice
        .getChart(urlId)
        .subscribe(chart => {
          this.graphservice.downloadProcess(urlId).subscribe(
            process => {
              this.chart = chart;
              this.title = chart.title;
              this.widthGraph = chart.width;
              if(chart.type =='line' || chart.type =='bar' || chart.type =='doughnut'){
                this.numberLegend=this.chart.data.length;
              }else{
                this.numberLegend=1;
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

              if (process.typeOfData === 'VIRTUOSO') {
                this.datasetLocation.push('https://opendata.aragon.es/sparql' + ' Consulta: ' + process.dataset);
              } else if (process.typeOfData === 'GAODC') {
                this.datasetLocation.push('https://opendata.aragon.es/GA_OD_Core/download?view_id=' + process.dataset + '&formato=csv&_pageSize=100&_page=1')
              } else if (process.typeOfData === 'CKAN' && process.url && process.url !== undefined){
                this.datasetLocation.push(process.url);
                this.datasetLocation.push(process.ckanDataset);
              } else {
                this.datasetLocation.push(process.dataset);
              }
            });
        });
    }
  }

  getOpenedMenu() {
    this.utilsService.openedMenuChange.subscribe(value => {
      this.openedMenu = value;
    });
  }

  hideEmbedButton(n: number) {
    this.hideEmbed = false;
    this.showData = n;
  }


}
