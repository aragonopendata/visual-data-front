import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoriesService } from '../../../services/histories.service';
import { History, Content } from '../../../models/History';
import { DomSanitizer } from '@angular/platform-browser';
import { GraphService } from '../../../services/graph.service';
//import { constants } from 'os';
import { Constants } from '../../../app.constants';
import { Contents } from '../../../models/Contents';
import { Aligns } from '../../../models/Aligns';


@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.scss']
})
export class ViewHistoryComponent implements OnInit {

  chart = [];
  idHistory: string;
  historySelect: History;
  previewHistory: History;
  preview: boolean = false;
  align: number;
  url: string;
  contentEnum: typeof Contents = Contents;
  alignEnum: typeof Aligns = Aligns;


  //historyContents: any;

  chartOptions: any = {
    scaleShowVerticalLines: false,
    scaleShowValues: true,
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
            callback: function(value, index, array) {
              return null;
            }
          }
        }
      ]
    }
  };

  constructor( private historiesService: HistoriesService, private _graphService: GraphService,
    private _route: ActivatedRoute,  private _router: Router, private _sanitizer: DomSanitizer ) { 
    this._route.params.subscribe(params => {
      
      if(params.id!=null){
        this.idHistory = params.id;
      }
      else{
        this.preview=true;
      }
      console.log(this.preview);
      
    });
  }

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {

    if(this.preview){

      console.log(Constants.LOCALSTORAGE_KEY_HISTORY);
      this.historySelect=JSON.parse(localStorage.getItem(Constants.LOCALSTORAGE_KEY_HISTORY));
      console.log(this.historySelect);


      if(this.historySelect.contents){
        this.historySelect.contents.forEach( (element: Content) => {

          this.align=element.align;
          console.log(this.align);
          if(element.type_content ==  Contents.graph){
            this._graphService.getChart(element.visual_content).subscribe(chart => {
              this.chart.push(chart);
            });
          }
        });
      }


    } else {

      this.historiesService.getHistoryBack(this.idHistory).subscribe( response => {
        if(response.success){
          this.historySelect = response.history;
          if(this.historySelect.contents){
            this.historySelect.contents.forEach( (element: Content) => {
              this._graphService.getChart(element.visual_content).subscribe(chart => {
                this.chart.push(chart);
              });
            });
          }

        }else{
          console.log('no se encuentra la historia')
        }

      });

    }
  }

  urlGraph(id: string) {
    let url = 'https://opendata.aragon.es/servicios/visualdata/charts/embed/'+id;
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  urlYoutube(id: string) {
    let url = "https://www.youtube.com/embed/"+id;
    console.log(url)
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  
  urlSlideShare(id: string) {
    let url = "https://www.slideshare.net/"+id;
    console.log('entro Slide')
    var urlSlideEmbed;
    
    this.historiesService.getEmbedUrlSlideShare(url).subscribe( response => {
      if(response.html){
        let iframeInfo=response.html
        console.log(iframeInfo)
        urlSlideEmbed = iframeInfo.substring(
          iframeInfo.lastIndexOf("https://www.slideshare.net/slideshow/embed_code/key/"), 
          iframeInfo.lastIndexOf("\" width=")
        );
        console.log(urlSlideEmbed)
      }
    });
    /*
   let iframeInfo = "<iframe src=\"https://www.slideshare.net/slideshow/embed_code/key/ymrpsJU8z3e4dx\" width=\"427\" height=\"356\" frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" scrolling=\"no\" style=\"border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;\" allowfullscreen> </iframe> <div style=\"margin-bottom:5px\"> <strong> <a href=\"https://www.slideshare.net/nwinkelman/the-language-of-coaching-a-story-about-learning\" title=\"The Language of Coaching - A Story About Learning\" target=\"_blank\">The Language of Coaching - A Story About Learning</a> </strong> from <strong><a href=\"https://www.slideshare.net/nwinkelman\" target=\"_blank\">Nick Winkelman, PhD</a></strong> </div>\n\n"

   var urlSlideEmbed = iframeInfo.substring(
     iframeInfo.lastIndexOf("https://www.slideshare.net/slideshow/embed_code/key/"), 
     iframeInfo.lastIndexOf("\" width=")
    );
    console.log(urlSlideEmbed)
    */

    //let regexp= new RegExp('(?<=src=\\\\)(.*)(?=\\\\" width=)');
    //var data = regexp.exec(iframeInfo)
    //console.log(iframeInfo.match(/(?<=src=\\)(.*)(?=\\" width=)/g))
    //console.log(iframeInfo.match(/(embed_code\/key\/)(.*)(?=" width)/g))

    return this._sanitizer.bypassSecurityTrustResourceUrl(urlSlideEmbed);
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