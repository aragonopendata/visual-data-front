import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.scss']
})
export class EditContentComponent implements OnInit {

  constructor( private _route: Router ) { }

  ngOnInit() {
  }

  openVisualData() {
    document.getElementsByTagName('body')[0].classList.add('no-scroll');
    this._route.navigate([{outlets: {modal: 'visualData'}}]);

  }

}
