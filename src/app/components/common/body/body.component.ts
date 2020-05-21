import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../exportedFunctions/utils.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
      
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  viewhistory;

  constructor(private utilsService: UtilsService, private router: Router) {
    
    this.router.events.subscribe((val) => {
      if ( this.router.url.includes ('viewHistory') ||this.router.url.includes ('previewHistory')  ) {
        this.viewhistory = true;
      }
      else{
        this.viewhistory = false;
      }

    });

    this.getOpenedMenu()

  }

  openedMenu: boolean;

  ngOnInit() {}

  getOpenedMenu(){
    this.utilsService.openedMenuChange.subscribe(value => {
      this.openedMenu = value;
    });
  }

  toggleOpenedMenu() {
      this.utilsService.tooggleOpenedMenu();
  }
}
