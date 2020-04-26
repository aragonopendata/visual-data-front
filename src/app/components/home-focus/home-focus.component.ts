import { Component, OnInit } from '@angular/core';
import { HistoriesService } from '../../services/histories.service';
import { Constants } from '../../app.constants';
import { Router } from '@angular/router';
import { History } from '../../models/History';
import { Category } from '../../models/Category';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { State } from '../../models/State';

declare var $: any;

@Component({
  selector: 'app-home-focus',
  templateUrl: './home-focus.component.html',
  styleUrls: ['./home-focus.component.scss']
})

export class HomeFocusComponent implements OnInit {

  categoriesHidden: Category[];
  categoriesVisible: Category[];
  textSearch:string="";
  categorySearch:number=null;
  viewMoreCategories: boolean = false;
  histories: History[];
  createHistory: boolean = true;
  tokenForm: FormGroup;
  tokenError:boolean= false;
  stateError:boolean=false;
  routerLinkAddHistory = Constants.ROUTER_LINK_ADD_HISTORY;
  routerLinkViewHistory = Constants.ROUTER_LINK_VIEW_HISTORY;
  stateEnum: typeof State = State;

  constructor(private _historiesService: HistoriesService, private _route: Router, private _formBuilder: FormBuilder, ) { }

  ngOnInit() {
    this.getCategories();
    this.getHistories(null, null);
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
    this._route.navigate(['/addHistory']);
  }

  updateHistoryWithToken(){
    if(this.tokenForm.invalid){
      return Object.values(this.tokenForm.controls).forEach(control => {
        control.markAsTouched();
      })
    }else{
      let token=this.tokenForm.get('token').value
      let route = Constants.ROUTER_LINK_EDIT_HISTORY + "/" + token;
      this._historiesService.getHistoryBack(token).subscribe(result =>{
        if(result.success && result.history!=null){
          if((result.history.state==this.stateEnum.borrador) || (result.history.state==this.stateEnum.publicada) ){
            $("#homeModalCenter").modal('hide');
            this._route.navigate([route]);
          }else{
            this.stateError=true
            this.tokenError=false
            console.log("Historia existe, pero no se puede modificar")
          }
        }else{
          this.tokenError=true
          this.stateError=false
          console.log('Historia no existe')
        }
      })
    }
  }

  updateHistoryHiperLink(){
    this.tokenForm.reset();
    this.tokenError=false;
    this.createHistory=false;
    this.stateError=false;
  }

  getHistories(text, category){
    if(category== this.categorySearch){
      this.categorySearch=null;
    }else{
      this.categorySearch = (category != null ? category : this.categorySearch)
    }

    this.textSearch = (text != null ? text : this.textSearch);
    this._historiesService.getHistoriesBySearch(this.textSearch, this.categorySearch===null?null:this.categorySearch.toString()).subscribe( response => {
      if(response.success){
        this.histories=response.history;
      }else{
        console.log("error cargando historias")
      }
    });
  }

  getHistory( id: string ){
    this._route.navigate([this.routerLinkViewHistory + '/'+ id]);
  }

  openHomeFocusModal(){
    this.createHistory=true;
    $("#homeModalCenter").modal('show');

  }

}