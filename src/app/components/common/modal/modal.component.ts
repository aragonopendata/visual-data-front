import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { VisualGrapsService } from '../../../services/visual-graps.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy{

  closed: boolean=false;

  constructor(@Inject(DOCUMENT) document: any, private _route: Router,private _service: VisualGrapsService ) { }

  ngOnInit() {
    document.getElementsByTagName('body')[0].classList.add('no-scroll');

  }

  ngOnDestroy(){
    document.getElementsByTagName('body')[0].classList.remove('no-scroll');

  }

  closeModal() {
    document.getElementsByTagName('body')[0].classList.remove('no-scroll');
    this._route.navigate([{outlets: {modal: null}}]);
    this.closed=true;
    this._service.setClose(this.closed);
  }

}