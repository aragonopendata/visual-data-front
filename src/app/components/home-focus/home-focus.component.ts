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
  tokenError:boolean= false;
  stateError:boolean=false;
  routerLinkAddHistory = Constants.ROUTER_LINK_ADD_HISTORY;
  routerLinkViewHistory = Constants.ROUTER_LINK_VIEW_HISTORY;
  image:string="/assets/img/university.svg"

  constructor(private _historiesService: HistoriesService, private _route: Router, private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder, ) { }

  ngOnInit() {
    this.getCategories();
    this.getHistories();
    this.initiateForm();
  }

  getCategories(){
    console.log('entro a obtener categorias')
    this._historiesService.getCategories().subscribe( (categories: Category[]) => {
      console.log(categories)
      if( categories.length > 0 ){
        console.log('he entrado')
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
          if(result.history.state==1){
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


  getHistories(){
    this._historiesService.getHistories().subscribe( response => {
      if(response.success){
        console.log(response.history)
        this.histories=response.history;
      }else{
        console.log("error cargando historias")
      }
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