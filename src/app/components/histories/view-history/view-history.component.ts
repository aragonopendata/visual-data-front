import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoriesService } from '../../../services/histories.service';
import { History, Content } from '../../../models/History';
import { DomSanitizer } from '@angular/platform-browser';
import { GraphService } from '../../../services/graph.service';
import { Constants } from '../../../app.constants';
import { Contents } from '../../../models/Contents';
import { Aligns } from '../../../models/Aligns';

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.scss']
})
export class ViewHistoryComponent implements OnInit {

  idHistory: string;
  historySelect: History;
  previewHistory: History;
  preview: boolean = false;
  align: number;
  url: string;
  contentEnum: typeof Contents = Contents;
  alignEnum: typeof Aligns = Aligns;
  loading : boolean = true;

  constructor( private historiesService: HistoriesService, private _graphService: GraphService,
    private _route: ActivatedRoute,  private _router: Router, private _sanitizer: DomSanitizer ) { 
    this._route.params.subscribe(params => {
      
      if(params.id!=null){
        this.idHistory = params.id;
      }
      else{
        this.preview=true;
        this.loading=false;
      }
      console.log(this.preview);
      
    });
  }

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {

    if(this.preview){

      this.historySelect=JSON.parse(localStorage.getItem(Constants.LOCALSTORAGE_KEY_HISTORY));

      if(this.historySelect.contents){
        this.historySelect.contents.forEach( (element: Content) => {
          element = this.getInfoContents(element);
        });
      }

    } else {

      this.historiesService.getHistoryBack(this.idHistory).subscribe( response => {
        if(response.success){
          this.historySelect = response.history;
          if(this.historySelect.contents){
            this.historySelect.contents.forEach( (element: Content) => {
              element = this.getInfoContents(element);
            });
          }
          return this.loading=false;
        }
      });

    }
  }


  private getInfoContents(element): Content {

    this.align=element.align;

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
  
  return(){
    if(this.preview){
      this._router.navigate([Constants.ROUTER_LINK_ADD_HISTORY]);
    }
    else{
      this._router.navigate(["/"]);
    }
  }
  
}