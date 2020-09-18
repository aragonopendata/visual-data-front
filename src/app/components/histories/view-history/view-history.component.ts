import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoriesService } from '../../../services/histories.service';
import { History, Content } from '../../../models/History';
import { DomSanitizer } from '@angular/platform-browser';
import { Constants } from '../../../app.constants';
import { Contents } from '../../../models/Contents';
import { AditionalInfo } from '../../../models/AditionalInfo';
import { Category } from '../../../models/Category';
import { Aligns } from '../../../models/Aligns';
import { AuthGuard } from '../../../_guards/auth.guard';
import { UtilsService } from '../../exportedFunctions/utils.service';
import { GraphService } from '../../../services/graph.service';

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.scss']
})
export class ViewHistoryComponent implements OnInit {

  openedMenu: boolean;
  urlHistory: string;
  historySelect: History;
  preview: boolean = false;
  contentEnum: typeof Contents = Contents;
  alignEnum: typeof Aligns = Aligns;
  loading : boolean = true;
  errorTitle: string;
  errorMessage: string;
  notFound: boolean = false;
  isAdmin: boolean=false;
  admin: Object={};
  categories: Category[]=[];
  selectedCategories: Category[]=[];
  aditionalInfo :AditionalInfo[]=[];
  //selectedHeaderContents: Content[];
  bodyContents: Content[];
  aditionalInfo2 :AditionalInfo[]=[];
  imageUrl: string;
  routerLinkHome = Constants.ROUTER_LINK_SERVICES_FOCUS;

  constructor( public historiesService: HistoriesService, private _route: ActivatedRoute, private _verifyTokenService: AuthGuard, 
    private utilsService: UtilsService, private graphservice: GraphService, private sanitized: DomSanitizer) { 
    
      this.getOpenedMenu();

      this._route.params.subscribe(params => {
        if(params.url!=null){
          this.urlHistory = params.url;
        }
        else{
          this.preview=true;
          //this.loading=false;
        }
      });
  }

  ngOnInit() {

    this.historiesService.getCategories().subscribe( (categories: Category[]) => {
      this.categories = categories;
      if(localStorage.getItem('currentUser')){

        this.admin=JSON.parse(localStorage.getItem('currentUser'));
  
        if(this.admin['rol'] == "global_adm"){
          this._verifyTokenService.probeTokenAdmin()
          this.isAdmin = true;
        }
        this.loadHistory()
      }else{
        this.loadHistory()
      }
		},err => {
      this.objectLoadFailure()
    });
    
  }

  getCategories(history: History){
    if(history.main_category!=null){
      for (var k = 0; k < this.categories.length; k++) {
        if(this.categories[k].id==history.main_category){
          this.selectedCategories.push(this.categories[k])
        }
      }
    }
    
    for (var i = 0; i < history.secondary_categories.length; i++) {
      for (var j = 0; j < this.categories.length; j++) {
        if(this.categories[j].id==history.secondary_categories[i]){
          this.selectedCategories.push(this.categories[j])
        }
      }
    }
    
  }

  loadHistory() {
        

    if(this.preview){

      this.historySelect=JSON.parse(localStorage.getItem(Constants.LOCALSTORAGE_KEY_HISTORY));

      this.loadImageByMainCategory(this.historySelect.main_category?this.historySelect.main_category:null);

      if(this.historySelect.secondary_categories){
        this.getCategories(this.historySelect);
      }

      if(this.historySelect.contents){
        this.historySelect.contents.forEach( (element: Content) => {
          this.historiesService.getInfoContents(element).then(data => {
            element = data;
          });
        });
      }
      this.separateContents();
      //this.loading=false;


    } else {
      if(this.isAdmin){
        this.historiesService.getHistoryBackAdminByUrl(this.urlHistory).subscribe( response => {
          if(response.success){
            this.loadImageByMainCategory(response.history.main_category?response.history.main_category:null)

            if(response.history.secondary_categories!=[]&&response.history.secondary_categories!=undefined){
            this.getCategories(response.history);
            }
          }
          else{
            this.objectLoadFailure()
          }
          this.responseHistory(response)
        },err => {
          this.objectLoadFailure()
        });
      }
      else{
        this.historiesService.getHistoryBackUserByUrl(this.urlHistory).subscribe( response => {
          if(response.success){
            this.loadImageByMainCategory(response.history.main_category?response.history.main_category:null)
            if(response.history.secondary_categories!=[]&&response.history.secondary_categories!=undefined){
              this.getCategories(response.history);
            }
            this.responseHistory(response)
          } else if( response.status === 404) {
            this.notFound = true;
            this.loading=false;
          } else{
            this.objectLoadFailure()
          }
        },err => {
          this.objectLoadFailure()
        });
      }
    }
  }

  loadImageByMainCategory(main_category){
    if(main_category && main_category!=null){
      this.historiesService.getImageByCategoryId(main_category).subscribe(response=>{
        if(response.image.route && response.image.route!=null){
          this.imageUrl=response.image.route;
        }else{
          this.imageUrl="https://opendata.aragon.es/static/public/focus/abstracto.jpg";
        }
      })
    }else{
      this.imageUrl="https://opendata.aragon.es/static/public/focus/abstracto.jpg";
    }
  }

  separateContents(){
    let selectedHeaderContents: Content[]=[];
    this.bodyContents=[];
    if(this.historySelect.contents && this.historySelect.contents.length>0){
      for (var contentNumber = 0; contentNumber < this.historySelect.contents.length; contentNumber++) {
        if(this.historySelect.contents[contentNumber].body_content){
          this.bodyContents.push(this.historySelect.contents[contentNumber])
        }else{
          selectedHeaderContents.push(this.historySelect.contents[contentNumber])
        }
      }
    }
    this.getHeadersInfo(selectedHeaderContents)
  }

  responseHistory(response){
    if(response.success && response.history!=null){
      this.historySelect = response.history;
      if(this.historySelect.contents){
        this.historySelect.contents.forEach( (element: Content) => {
          this.historiesService.getInfoContents(element).then(data => {
            element = data
          })
        });
      }
      this.separateContents();
    }else{
      this.objectLoadFailure()
    }
  }

  getHeadersInfo(selectedHeaderContents: Content[]){
    selectedHeaderContents.forEach( (content: Content) => {
      this.graphservice.getChart(content.visual_content).subscribe(chart => {
        if(chart.type=="number"){
          this.aditionalInfo.push(new AditionalInfo(chart.number.numberUnits, chart.number.number,content.order_content));
        }
      });
    });
    this.loading=false;
  }

  objectLoadFailure(){
    this.errorTitle = Constants.INFO_TITLE_OBJECT_FAILURE;
    this.errorMessage = Constants.INFO_BODY_HSITORY_FAILURE;
    this.loading=false;
  }

  getOpenedMenu(){
    this.utilsService.openedMenuChange.subscribe(value => {
      this.openedMenu = value;
    });
  }

  sanitizedHtml(value){
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

    /**
   * Order the body contents by order_content
   */
  orderBodyContents(){
    return this.bodyContents.sort((a, b) => a.order_content - b.order_content);
  }

  /**
   * Order the headerContents by order_content
  */
  orderAdditionalInfo(){
    return this.aditionalInfo.sort((a, b) => a.order - b.order);
  }

  
}