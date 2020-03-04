import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { VisualGrapsService } from '../../../services/visual-graps.service';
import { Content } from '../../../models/History';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.scss']
})
export class EditContentComponent implements OnInit {

  contentModel: Content = {}

  @Output() contentCreate = new EventEmitter<any>();

  constructor( private _route: Router, private _servicio: VisualGrapsService) {  }

  ngOnInit() {
    this._servicio.getIdGraph().subscribe(id => {
      this.contentModel.idGraph=id;
      console.log(id)
    });
  }

  openVisualData() {
    document.getElementsByTagName('body')[0].classList.add('no-scroll');
    this._route.navigate([{outlets: {modal: 'visualData'}}]);
  }

  saveContent(){
    this.contentCreate.emit(this.contentModel);
    this.contentModel = {};
  }

}