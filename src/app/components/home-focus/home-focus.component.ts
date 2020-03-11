import { Component, OnInit } from '@angular/core';
import { HistoriesService } from '../../services/histories.service';
import { Constants } from '../../app.constants';
import { Router } from '@angular/router';
import { History } from '../../models/History';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-home-focus',
  templateUrl: './home-focus.component.html',
  styleUrls: ['./home-focus.component.scss']
})

export class HomeFocusComponent implements OnInit {

  categoriesHidden: Category[];
  categoriesVisible: Category[];
  viewMoreCategories: boolean = false;
  histories: History[];
  routerLinkAddHistory = Constants.ROUTER_LINK_ADD_HISTORY;
  routerLinkViewHistory = Constants.ROUTER_LINK_VIEW_HISTORY;
  email: string;

  constructor(private _historiesService: HistoriesService, private _route: Router) { }

  ngOnInit() {
    this.getCategories();
    this.getHistories();
  }

  getCategories(){
    this._historiesService.getCategories().subscribe( (categories: Category[]) => {
      if( categories.length > 0 ){
        this.categoriesVisible = categories.slice(0,4);
        this.categoriesHidden = categories.slice(4,categories.length);
      }
		},err => {
      console.log('Error al obtener las categorias');
    });
  }

  getHistories(){
    this._historiesService.getHistories().subscribe( (histories: History[]) => {
      this.histories=histories;
    });
  }

  getHistory( id: string ){
    console.log(id);
    this._route.navigate([this.routerLinkViewHistory + '/'+ id]);
  }

  searchHistory( value: string ){ }

  getEmail(){
    console.log(this.email);
    localStorage.setItem(Constants.LOCALSTORAGE_KEY_MAIL, this.email);
  }

}