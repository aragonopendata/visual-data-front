import { Component, OnInit } from '@angular/core';
import { GraphService } from '../../services/graph.service';
import { Router, ActivatedRoute } from '@angular/router';
import { prepareArrayXY , getRandomColor} from '../exportedFunctions/lib';

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
    maintainAspectRatio: false,
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

  public color: Array<any> = [];
  public routeEmbed: any;
  public hideEmbed: boolean;

  public showData: number;
  public datasetLocation: any;


  constructor(
    private router: Router,
    private graphservice: GraphService,
    private activatedRoute: ActivatedRoute
  ) {
    this.hideEmbed = true;
   }

  ngOnInit() {
    let urlId = this.activatedRoute.snapshot.url[2].path;
    if (urlId !== '') {
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

              if (process.typeOfData === 'CKAN') {
                this.datasetLocation =
                  'https://opendata.aragon.es/datos/catalogo/dataset/' +
                  process.dataset;
              } else if (process.typeOfData === 'VIRTUOSO') {
                this.datasetLocation =
                  'https://opendata.aragon.es/sparql' +
                  ' Consulta: ' +
                  process.dataset;
              } else {
                this.datasetLocation = process.dataset;
              }
              if (!chart || chart.status === 'notFound') {
                this.router.navigate(['/']);
              }

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
            });
        });
        
    }
  }

  hideEmbedButton(n: number) {
    this.hideEmbed = false;
    this.showData = n;
  }
}
