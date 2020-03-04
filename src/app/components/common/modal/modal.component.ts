import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor( private _route: Router ) { }

  ngOnInit() {
  }

  closeModal() {
    document.getElementsByTagName('body')[0].classList.remove('no-scroll');
    this._route.navigate([{outlets: {modal: null}}]);

  }

}