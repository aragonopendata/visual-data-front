import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Constants } from '../../app.constants';
import { HistoriesService } from '../../services/histories.service';
import { ContentHistory } from '../../models/ContentHistory';
import { History } from '../../models/History';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-history',
  templateUrl: './edit-history.component.html',
  styleUrls: ['./edit-history.component.scss']
})
export class EditHistoryComponent implements OnInit {
  categoriesAPI: string[];
  categoriesAll: string[];
  inputHistoryTitle:string;
  inputHistoryDescription:string;
  selectedCategory: string;
  routerLinkAddContent: string;
  inputContentTitle: string;
  inputContentDescription: string;
  contents: ContentHistory[]=[];
  historySave: History;
  @ViewChild('addContent') addContentButton: ElementRef;


  constructor(private historiesService: HistoriesService, private _route: Router) { 
    this.routerLinkAddContent = Constants.ROUTER_LINK_ADD_CONTENT;
    this.categoriesAPI = [];
  }

  ngOnInit() {
    this.getCategories();
  }


  
  getCategories(){
    this.historiesService.getCategories().subscribe(categories => {

      //try {
        let coreCategories = categories;
        let positionCategories = coreCategories[0].indexOf(Constants.SERVER_API_LINK_GA_OD_CORE_PUBLIC_NAME_CATEGORIES);
        coreCategories.splice(0,1);
				for (let view of coreCategories) {
          this.categoriesAPI.push(view[positionCategories]);
        }
        this.categoriesAll=this.categoriesAPI;

			// } catch (error) {
			// 	console.error('Error: getCategories()');
      // }
      
		});
  }

  newContent(newContent:ContentHistory){
    console.log(newContent)
    this.contents.push(newContent);
    this.falseClickAddContent();
  }

  falseClickAddContent(){
    this.addContentButton.nativeElement.click();
  }

  saveHistory(){
    this.historySave=({title: this.inputHistoryTitle, description: this.inputHistoryDescription, category: this.selectedCategory,contents:this.contents});
    this._route.navigateByUrl("/")

  }

}