import { Component, OnInit, SystemJsNgModuleLoader, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { VisualGrapsService } from '../../services/visual-graps.service';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.scss']
})
export class EditContentComponent implements OnInit {
  ids$: Observable<string>;
  actualGraph: string;
  inputContenTitle: string;
  inputContentDescription: string;
  @Output() contentCreate = new EventEmitter<any>();

  constructor( private _route: Router, private servicio:VisualGrapsService) {  }

  ngOnInit() {
    this.ids$ = this.servicio.conseguirId$();
    this.ids$.subscribe(id => {
      this.actualGraph=id;
      console.log(id)
    });
  }

  openVisualData() {
    document.getElementsByTagName('body')[0].classList.add('no-scroll');
    this._route.navigate([{outlets: {modal: 'visualData'}}]);
  }

  saveContent(){
    this.contentCreate.emit({title: this.inputContenTitle, description: this.inputContentDescription, id: this.actualGraph});
    this.inputContenTitle="";
    this.inputContentDescription="";
    this.actualGraph="";
  }


  

}