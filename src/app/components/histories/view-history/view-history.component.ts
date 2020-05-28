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
  categories: Category[]=[];
  selectedCategories: Category[]=[];
  aditionalInfo :AditionalInfo[]=[];
  //selectedHeaderContents: Content[];
  bodyContents: Content[];
  aditionalInfo2 :AditionalInfo[]=[];

  constructor( private historiesService: HistoriesService, private _route: ActivatedRoute,  private _router: Router, private _sanitizer: DomSanitizer,
    private _verifyTokenService: AuthGuard,private utilsService: UtilsService, private graphservice: GraphService) { 
    
      this.getOpenedMenu();

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
        this._verifyTokenService.probeTokenAdmin()
        this.isAdmin = true;
      }
      this.loadHistory()
    }else{
      this.loadHistory()
    }


    this.historiesService.getCategories().subscribe( (categories: Category[]) => {
      this.categories = categories;
		},err => {
      this.objectLoadFailure()
    });

    //this.loadAditionalInfo();

  }

  /*
  loadAditionalInfo(){
    let restarantes = new AditionalInfo("Restaurantes", 1348);
    let hoteles = new AditionalInfo("Hoteles", 89);
    let transporte = new AditionalInfo("Paradas de transporte", 30);
    let turismo = new AditionalInfo("Empresas de turismo activo", 19);
    this.aditionalInfo.push(restarantes)
    this.aditionalInfo.push(hoteles)
    this.aditionalInfo.push(transporte)
    this.aditionalInfo.push(turismo)
  }
  */

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
      //console.log('principal:'+this.historySelect.main_category);
      if(this.historySelect.secondary_categories){
        this.getCategories(this.historySelect);
      }

      if(this.historySelect.contents){
        this.historySelect.contents.forEach( (element: Content) => {
          element = this.getInfoContents(element);
        });
      }
      this.separateContents();

    } else {
      if(this.isAdmin){
        this.historiesService.getHistoryBackAdminById(this.idHistory).subscribe( response => {
          if(response.success){
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
        this.historiesService.getHistoryBackUserById(this.idHistory).subscribe( response => {
          if(response.success){
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
          element = this.getInfoContents(element);
        });
      }
      this.separateContents();
    }else{
      this.objectLoadFailure()
    }
    this.loading=false;
  }

  getHeadersInfo(selectedHeaderContents: Content[]){
    let aditionalInfoForEach :AditionalInfo[]=[];
    selectedHeaderContents.forEach( (content: Content) => {
      this.graphservice.getChart(content.visual_content).subscribe(chart => {
        if(chart.type=="number"){
          aditionalInfoForEach.push(new AditionalInfo(chart.number.numberUnits, chart.number.number));
        }
      });
    });
    this.aditionalInfo=aditionalInfoForEach;
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
    return new Promise((resolve, reject) => {
      let url = Constants.FOCUS_URL+'/charts/embed/'+id;
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

  getOpenedMenu(){
    this.utilsService.openedMenuChange.subscribe(value => {
      this.openedMenu = value;
    });
  }
  
}