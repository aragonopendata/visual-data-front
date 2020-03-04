import { Component, OnInit } from '@angular/core';
import { HistoriesService } from '../../services/histories.service';
import { Constants } from '../../app.constants';


@Component({
  selector: 'app-home-focus',
  templateUrl: './home-focus.component.html',
  styleUrls: ['./home-focus.component.scss']
})

export class HomeFocusComponent implements OnInit {
  categoriesAPI: string[];
  categoriesAll: string[];
  categoriesReduce:string[];
  moreCategories: boolean = false;
  routerLinkAddHistory: string;




  constructor(private historiesService: HistoriesService) { 
    this.routerLinkAddHistory = Constants.ROUTER_LINK_ADD_HISTORY;

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
        this.categoriesReduce=this.categoriesAPI.slice(0,4);
        
			} catch (error) {
				console.error('Error: getCategories()');
      }
      
		});
  }

  clickCategories(){
    this.moreCategories=!this.moreCategories;

  }

}
