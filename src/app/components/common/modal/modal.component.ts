import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy{

  constructor(@Inject(DOCUMENT) document: any, private _route: Router ) { }

  ngOnInit() {
    document.getElementsByTagName('body')[0].classList.add('no-scroll');

  }

  ngOnDestroy(){
    document.getElementsByTagName('body')[0].classList.remove('no-scroll');

  }

  closeModal() {
    document.getElementsByTagName('body')[0].classList.remove('no-scroll');
    this._route.navigate([{outlets: {modal: null}}]);

  }

}