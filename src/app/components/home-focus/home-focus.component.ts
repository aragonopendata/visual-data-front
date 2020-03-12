import { Component, OnInit } from '@angular/core';
import { HistoriesService } from '../../services/histories.service';
import { Constants } from '../../app.constants';
import { Router } from '@angular/router';
import { History } from '../../models/History';
import { Category } from '../../models/Category';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

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
  emailForm: FormGroup;

  constructor(private _historiesService: HistoriesService, private _route: Router, private _formBuilder: FormBuilder) { }

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

  initiateForm(){
    this.emailForm = this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])
    })
  }

  get invalidEmail(){
    return this.emailForm.get('email').invalid && this.emailForm.get('email').touched;
  }
  getEmail(){
    if (this.emailForm.invalid)
    {
      return Object.values(this.emailForm.controls).forEach(control => {
        control.markAsTouched();
      })
    }
    else{
      this.email=this.emailForm.get('email').value
      console.log(this.emailForm);
      console.log('paso');
      localStorage.setItem(Constants.LOCALSTORAGE_KEY_MAIL, this.email);
      this._route.navigateByUrl(this.routerLinkAddHistory);
    }
  }
}