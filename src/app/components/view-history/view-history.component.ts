import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HistoriesService } from '../../services/histories.service';

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.scss']
})
export class ViewHistoryComponent implements OnInit {
  historySelect: any;

  constructor(private historiesService: HistoriesService,private activatedRoute: ActivatedRoute, private _route: Router
    ) { }

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    let id;
    id = this.activatedRoute.snapshot.url[1];
    if (id && id.path !== '') {
      this.historiesService.getHistories().subscribe(histories => {
        for (let history of histories) {
          if(history.id==id){
            console.log("encontrada!")
            console.log(history)
            this.historySelect=history;
            console.log(this.historySelect)
          }
        }
        console.log(this.historySelect)
      },err => {
        console.log('Error al obtener las categorias');
      });
    }
  }

  return(){
    this._route.navigateByUrl("/")
  }



}