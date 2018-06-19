import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../exportedFunctions/utils.service';
      
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  constructor(private utilsService: UtilsService) {this.getOpenedMenu()}

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
