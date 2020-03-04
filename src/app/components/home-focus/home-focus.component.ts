import { Component, OnInit } from '@angular/core';
import { HistoriesService } from '../../services/histories.service';
import { Constants } from '../../app.constants';
import { HistorySummary } from '../../models/HistorySummary';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-focus',
  templateUrl: './home-focus.component.html',
  styleUrls: ['./home-focus.component.scss']
})

export class HomeFocusComponent implements OnInit {

  categoriesHidden: string[];
  categoriesVisible:string[];
  viewMoreCategories: boolean = false;
  routerLinkAddHistory: string;
  routerLinkViewHistory: string;
  historiesAll: HistorySummary[];
  historiesFilter:HistorySummary[];


  constructor(private historiesService: HistoriesService, private _route: Router) { 
    this.routerLinkAddHistory = Constants.ROUTER_LINK_ADD_HISTORY;
    this.routerLinkViewHistory= Constants.ROUTER_LINK_VIEW_HISTORY;
  }

  ngOnInit() {
    this.getCategories();
    this.getHistories();

  }

  getCategories(){
    this.historiesService.getCategories().subscribe(categories => {

      let categoriesAPI = [];
      let coreCategories = categories;
      let positionCategories = coreCategories[0].indexOf(Constants.SERVER_API_LINK_GA_OD_CORE_PUBLIC_NAME_CATEGORIES);
      coreCategories.splice(0,1);

      for (let view of coreCategories) {
        categoriesAPI.push(view[positionCategories]);
      }

      this.categoriesVisible = categoriesAPI.slice(0,4);
      this.categoriesHidden = categoriesAPI.slice(4,categoriesAPI.length);

		},err => {
      console.log('Error al obtener las categorias');
    });
  }

  getHistories(){
    this.historiesService.getHistories().subscribe(histories => {
      console.log(histories)
      this.historiesAll=[];
      for (let history of histories) {
        this.historiesAll.push({title: history.title, image: history.image, id: history.id});
      }
      this.historiesFilter=this.historiesAll;
    });
  }

  getHistory(id:string){
    console.log(id);
    this._route.navigate([this.routerLinkViewHistory + '/'+ id]);
  }

  searchHistory(value:string){
    /*
    console.log(value)
    let historiesFilterProgress: HistorySummary[] = [];
    for (let history of this.historiesAll){
      if((history.title.toUpperCase()).indexOf(value.toUpperCase())!=-1){
        historiesFilterProgress.push(history);
      }
    }
    this.historiesFilter=historiesFilterProgress;
    */
  }



}