import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoriesService } from '../../../services/histories.service';
import { History, Content } from '../../../models/History';
import { DomSanitizer } from '@angular/platform-browser';
import { GraphService } from '../../../services/graph.service';

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.scss']
})
export class ViewHistoryComponent implements OnInit {

  chart = [];
  idHistory: number;
  historySelect: History;

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
      this.idHistory = params.id;
    });
  }

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {

    this.historiesService.getHistory(this.idHistory).subscribe( (history: History) => {
      this.historySelect = history[0];
      this.historySelect.contents.forEach( (element: Content) => {
        this._graphService.getChart(element.idGraph).subscribe(chart => {
          this.chart.push(chart);
        });
      });

    },err => {
      console.log('Error al obtener las categorias');
    });

  }

  urlGraph(id: string) {
    let url = 'https://opendata.aragon.es/servicios/visualdata/charts/embed/'+id;
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  return(){
    this._router.navigate(["/"]);
  }

}