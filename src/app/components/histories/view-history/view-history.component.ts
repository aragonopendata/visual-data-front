import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoriesService } from '../../../services/histories.service';
import { History, Content } from '../../../models/History';
import { DomSanitizer } from '@angular/platform-browser';
import { GraphService } from '../../../services/graph.service';
//import { constants } from 'os';
import { Constants } from '../../../app.constants';

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.scss']
})
export class ViewHistoryComponent implements OnInit {

  chart = [];
  idHistory: number;
  historySelect: History;
  previewHistory: History;
  preview: boolean = false;
  //historyContents: any;

  chartOptions: any = {
    scaleShowVerticalLines: false,
    scaleShowValues: true,
    responsive: true,
    legend: {
      display: false
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

  constructor( private historiesService: HistoriesService, private _graphService: GraphService,
    private _route: ActivatedRoute,  private _router: Router, private _sanitizer: DomSanitizer ) { 
    this._route.params.subscribe(params => {
      
      if(params.id!=null){
        this.idHistory = params.id;
      }
      else{
        this.preview=true;
      }
      console.log(this.preview);
      
    });
  }

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {

    if(this.preview){

      console.log(Constants.LOCALSTORAGE_KEY_HISTORY);
      this.historySelect=JSON.parse(localStorage.getItem(Constants.LOCALSTORAGE_KEY_HISTORY));
      console.log(this.historySelect);

      if(this.historySelect.contents){
        this.historySelect.contents.forEach( (element: Content) => {
          this._graphService.getChart(element.id_Graph).subscribe(chart => {
            this.chart.push(chart);
          });
        });
      }


    } else {

      this.historiesService.getHistory(this.idHistory).subscribe( (history: History) => {
        this.historySelect = history[0];
        if(this.historySelect.contents){
          this.historySelect.contents.forEach( (element: Content) => {
            this._graphService.getChart(element.id_Graph).subscribe(chart => {
              this.chart.push(chart);
            });
          });
        }
      },err => {
        console.log('Error al obtener la historia');
      });

    }
  }

  urlGraph(id: string) {
    let url = 'https://opendata.aragon.es/servicios/visualdata/charts/embed/'+id;
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  return(){
    if(this.preview){
      this._router.navigate([Constants.ROUTER_LINK_ADD_HISTORY]);
    }
    else{
      this._router.navigate(["/"]);
    }
  }
}