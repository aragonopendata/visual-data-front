import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoriesService } from '../../../services/histories.service';
import { History, Content } from '../../../models/History';
import { DomSanitizer } from '@angular/platform-browser';
import { Constants } from '../../../app.constants';
import { Contents } from '../../../models/Contents';
import { Category } from '../../../models/Category';
import { Aligns } from '../../../models/Aligns';
import { AuthGuard } from '../../../_guards/auth.guard';

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.scss']
})
export class ViewHistoryComponent implements OnInit {

  idHistory: string;
  historySelect: History;
  preview: boolean = false;
  contentEnum: typeof Contents = Contents;
  alignEnum: typeof Aligns = Aligns;
  loading : boolean = true;
  errorTitle: string;
  errorMessage: string;
  isAdmin: boolean=false;
  admin: Object={};
  categories: Category[];
  secondCategories: Category[];

  constructor( private historiesService: HistoriesService, private _route: ActivatedRoute,  private _router: Router, private _sanitizer: DomSanitizer,
    private _verifyTokenService: AuthGuard ) { 
    
    this._route.params.subscribe(params => {
      if(params.id!=null){
        this.idHistory = params.id;
      }
      else{
        this.preview=true;
        this.loading=false;
      }      
    });
  }

  ngOnInit() {
    if(localStorage.getItem('currentUser')){

      this.admin=JSON.parse(localStorage.getItem('currentUser'));

      if(this.admin['rol'] == "global_adm"){
        this._verifyTokenService.canActivate()
        this.isAdmin = true;
      }
      this.loadHistory()
    }else{
      this.loadHistory()
    }

    
    this.historiesService.getCategories().subscribe( (categories: Category[]) => {
      this.categories = categories;
      this.secondCategories = categories;
      this.loadHistory();
		},err => {
      this.objectLoadFailure()
    });
  }

  getCategories(history: History){
    history.secondary_categories.forEach(id => {
      this.secondCategories.forEach(cat => {
        if(cat.id==id){
          cat.selected=true;
          console.log('secundarias:')
          console.log(cat.name);
        }
      });
    });
  }

  loadHistory() {
        

    if(this.preview){

      this.historySelect=JSON.parse(localStorage.getItem(Constants.LOCALSTORAGE_KEY_HISTORY));
      console.log('principal:'+this.historySelect.main_category);
      if(this.historySelect.secondary_categories){
        this.getCategories(this.historySelect);
      }

      if(this.historySelect.contents){
        this.historySelect.contents.forEach( (element: Content) => {
          element = this.getInfoContents(element);
        });
      }

    } else {
      if(this.isAdmin){
        console.log('entro admin')
        this.historiesService.getHistoryBackAdminById(this.idHistory).subscribe( response => {
          console.log(response.history)
          if(response.history.secondary_categories!=[]){
            this.getCategories(response.history);
          }
          this.responseHistory(response);
        },err => {
          this.objectLoadFailure()
        });
      }
      else{
        console.log('entro user')
        this.historiesService.getHistoryBackUserById(this.idHistory).subscribe( response => {
          if(response.history.secondary_categories!=[]){
            this.getCategories(response.history);
          }
          this.responseHistory(response)
        },err => {
          this.objectLoadFailure()
        });
      }
    }
  }

  responseHistory(response){
    if(response.success && response.history!=null){
      this.historySelect = response.history;
      if(this.historySelect.contents){
        this.historySelect.contents.forEach( (element: Content) => {
          element = this.getInfoContents(element);
        });
      }
    }else{
      this.objectLoadFailure()
    }
    this.loading=false;

  }

  objectLoadFailure(){
    this.errorTitle = Constants.INFO_TITLE_OBJECT_FAILURE;
    this.errorMessage = Constants.INFO_BODY_HSITORY_FAILURE;
    this.loading=false;
  }

  private getInfoContents(element): Content {

    if(element.type_content ==  Contents.graph){
      this.urlGraph(element.visual_content).then( (url) => {
        element.srcGraph = url;
        return element
      });
    } else if (element.type_content ==  Contents.youtube) {
      this.urlYoutube(element.visual_content).then( (url) => {
        element.srcYoutube = url;
        return element
      });
    } else if (element.type_content ==  Contents.shareSlides) {
      this.urlSlideShare(element.visual_content).then( (url) => {
        element.srcSlideShare = url;
        return element
      });
    }else{
      return element
    }
  }

  private urlGraph(id: string) {
    //TODO: CAMBIAR LOCALHOST
    return new Promise((resolve, reject) => {
      let url = 'http://localhost:4075/#/charts/embed/'+id;
      resolve(this._sanitizer.bypassSecurityTrustResourceUrl(url));
    });
  }

  private urlYoutube(id: string) {
    return new Promise((resolve, reject) => {
      let url = "https://www.youtube.com/embed/"+id;
      resolve(this._sanitizer.bypassSecurityTrustResourceUrl(url));
    });
  }
  
  private urlSlideShare(id: string) {

    return new Promise((resolve, reject) => {

      let url = "https://www.slideshare.net/"+id;
      var urlSlideEmbed;
      
      this.historiesService.getEmbedUrlSlideShare(url).subscribe( (response:any) => {
        if(response.html){
          let iframeInfo=response.html
          urlSlideEmbed = iframeInfo.substring(
            iframeInfo.lastIndexOf("https://www.slideshare.net/slideshow/embed_code/key/"), 
            iframeInfo.lastIndexOf("\" width=")
          );
          resolve(this._sanitizer.bypassSecurityTrustResourceUrl(urlSlideEmbed));
        }
      });
    });
  }
  
}