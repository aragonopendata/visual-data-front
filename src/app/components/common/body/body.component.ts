import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../exportedFunctions/utils.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
      
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  viewhistory = false;
  edithistory = false;
  home = true;

  constructor(private utilsService: UtilsService, private router: Router) {
    
    this.router.events.subscribe((val) => {
      this.home = true;
      this.edithistory = false;
      if ( this.router.url.includes ('viewHistory') ||this.router.url.includes ('previewHistory')  ) {
        this.viewhistory = true;
        this.home = false
      }
      else{
        this.viewhistory = false;
        if ( this.router.url !== '/' ) {
          this.home = false;
          if ( this.router.url.includes ('addHistory') ){
            this.edithistory = true;
          }
        }
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
