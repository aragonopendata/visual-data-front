import { Component, OnInit } from '@angular/core';
import { HistoriesService } from '../../services/histories.service';
import { Constants } from '../../app.constants';
import { Router, ActivatedRoute } from '@angular/router';
import { History } from '../../models/History';
import { Category } from '../../models/Category';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

declare var $: any;

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
  createHistory: boolean = true;
  tokenForm: FormGroup;
  routerLinkAddHistory = Constants.ROUTER_LINK_ADD_HISTORY;
  routerLinkViewHistory = Constants.ROUTER_LINK_VIEW_HISTORY;

  constructor(private _historiesService: HistoriesService, private _route: Router, private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCategories();
    this.getHistories();
    this.initiateForm();
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

  initiateForm(){
    this.tokenForm = this._formBuilder.group({
      token: new FormControl('', [Validators.required])
    })
  }

  get invalidToken(){
    return this.tokenForm.get('token').invalid && this.tokenForm.get('token').touched;
  }

  createNewHistory(){
    localStorage.removeItem(Constants.LOCALSTORAGE_KEY_MAIL);
    $("#homeModalCenter").modal('hide');
    this._route.navigate(['focus/addHistory']);
  }

  updateHistoryWitToken(){
    let token=this.tokenForm.get('token').value
    let route = Constants.ROUTER_LINK_EDIT_HISTORY + "/" + token;
    $("#homeModalCenter").modal('hide');
    this._route.navigate([route]);

  }

  updateHistoryHiperLink(){
    this.tokenForm.reset();
    this.createHistory=false;
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

  openHomeFocusModal(){
    this.createHistory=true;
    $("#homeModalCenter").modal('show');

  }

  searchHistory( value: string ){ }
}