import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { VisualGrapsService } from '../../../services/visual-graps.service';
import { Content } from '../../../models/History';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.scss']
})
export class EditContentComponent implements OnInit {

  contentModel: Content = {}
  contentForm: FormGroup;

  @Output() contentCreate = new EventEmitter<any>();

  constructor( private _route: Router, private _servicio: VisualGrapsService, private _formBuilder:FormBuilder) {  }

  ngOnInit() {
    this.initiateForm();
    this._servicio.getIdGraph().subscribe(id => {
      this.contentModel.id_Graph=id;
      this.contentForm.controls['id_Graph'].setValue(id);
    });
    
  }

  initiateForm(){
    this.contentForm = this._formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      id_Graph: new FormControl('', Validators.required)
    })

  }
  openVisualData() {
    document.getElementsByTagName('body')[0].classList.add('no-scroll');
    this._route.navigate([{outlets: {modal: 'visualData'}}]);
  }

  saveContent(){
    this.contentModel = {title: this.contentForm.get('title').value, 
                         description: this.contentForm.get('description').value, 
                         id_Graph: this.contentForm.get('id_Graph').value};
    this.contentCreate.emit(this.contentModel);
    this.contentModel = {};
    this.contentForm.reset();
  }

}