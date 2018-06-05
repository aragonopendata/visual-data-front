import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { GraphService } from '../../services/graph.service';
import { DOCUMENT } from '@angular/platform-browser';
import { prepareArrayXY } from '../exportedFunctions/lib';
import { UtilsGraphService } from './../exportedFunctions/utilsChats.util';
import { Constants } from '../../app.constants';
declare var jQuery:any;

@Component({
  selector: 'app-end-graph',
  templateUrl: './end-graph.component.html',
  styleUrls: ['./end-graph.component.css']
})
export class EndGraphComponent implements OnInit {
  public chartLegend = false;
  public chartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
          ticks: {
              beginAtZero: true,
              callback: function (value, index, array) {
                return null;
              }
          }
      }]
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
  public dataset:any;
  public descriptions:any;
  public id:any;
  public mapDescriptions: any;


  public hideEmbed: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private graphservice: GraphService,
    public utilsGraphService:UtilsGraphService,
    @Inject(DOCUMENT) document: any
  ) {
    this.isMap = false;
    this.hideEmbed = true;
    this.width = 100;
    this.fullRoute = Constants.SERVER_URL + '/servicios/visualdata';

    this.loadGraph()
    // Event that disable the loading screen and update the carousel
    this.utilsGraphService.loading.subscribe(value => {
      if(value == false){
        this.loadGraph();
        jQuery("#listModal").modal("hide");
      }
    })
  }

  loadGraph(){
    let id;
    id = this.activatedRoute.snapshot.url[1];
    if (id.path != "") {
      this.routeEmbed = this.fullRoute + '/charts/embed/' + id;
      this.actualRoute = this.fullRoute + '/charts/' + id;
      this.graphservice.getChart(id).subscribe(chart => {
        if (!chart || chart.status == 'notFound') {
          this.router.navigate(['/']);
        }
        this.width = chart.width;

        this.chart = chart;
        if (!chart.isMap) {
          this.chart = chart;
        } else {
          this.isMap = chart.isMap;
          this.title = chart.title;
          this.descriptions = chart.descriptions;  
          
          this.points = prepareArrayXY(chart.data[0].data, chart.labels);
        }
      },
        error => {
          this.router.navigate(['/']);
        }, );
    } else {
      this.router.navigate(['/charts/' + id]);
    }
  }

  ngOnInit(): void {

  }

  goBack(): void {
    this.location.back();
  }

  hideEmbedButton() {
    this.hideEmbed = false;
  }

  updateChart(id){
    console.log(id);
    this.graphservice.downloadProcess(id).subscribe(dataProcess => {
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
}
