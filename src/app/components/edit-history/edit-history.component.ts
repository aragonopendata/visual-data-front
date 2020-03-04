import { Component, OnInit } from '@angular/core';
import { Constants } from '../../app.constants';
import { HistoriesService } from '../../services/histories.service';

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
  createNewContent: boolean =false;


  constructor(private historiesService: HistoriesService) { 
    this.routerLinkAddContent = Constants.ROUTER_LINK_ADD_CONTENT;
  }

  ngOnInit() {
    this.createEmptyVectors();
    this.getCategories();
  }


  createEmptyVectors(){
    this.categoriesAPI = [];
  }

  
  getCategories(){
    this.historiesService.getCategories().subscribe(categories => {

      try {
        let coreCategories = categories;
        let positionCategories = coreCategories[0].indexOf(Constants.SERVER_API_LINK_GA_OD_CORE_PUBLIC_NAME_CATEGORIES);
        coreCategories.splice(0,1);
				for (let view of coreCategories) {
          this.categoriesAPI.push(view[positionCategories]);
        }
        this.categoriesAll=this.categoriesAPI;

			} catch (error) {
				console.error('Error: getCategories()');
      }
      
		});
  }

  createContent(){
    this.createNewContent=!this.createNewContent;
    console.log(this.createNewContent)

  }

}
