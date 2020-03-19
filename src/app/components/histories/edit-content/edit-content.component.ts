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

  settings: any;

  @Output() contentCreate = new EventEmitter<any>();

  constructor( private _route: Router, private _servicio: VisualGrapsService, private _formBuilder:FormBuilder) { 
    
    this.settings = {
      selector: '#editorContent',
      theme_url: '/static/public/plugins/tinymce/themes/modern/theme.js',
      skin_url: '/static/public/plugins/tinymce/skins/lightgray',
      baseURL: '/static/public/plugins/tinymce',
      plugins: [' link '],
      toolbar: ' bold italic underline | link ',
      menubar: false,
      branding: false
    }

  }

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
      description: new FormControl(''),
      id_Graph: new FormControl(null, Validators.required)
    })

  }

  get invalidTitle(){
    return this.contentForm.get('title').invalid && this.contentForm.get('title').touched;
  }

  get invalidGraph(){
    return this.contentForm.get('id_Graph').invalid;
  }

  openVisualData() {
    document.getElementsByTagName('body')[0].classList.add('no-scroll');
    this._route.navigate([{outlets: {modal: 'visualData'}}]);
  }

  saveContent(){
    if(this.contentForm.invalid){
      return Object.values(this.contentForm.controls).forEach(control => {
        control.markAsTouched();
      })
    }else{
      this.contentModel = {title: this.contentForm.get('title').value, 
                         description: this.contentForm.get('description').value, 
                         id_Graph: this.contentForm.get('id_Graph').value};
                         
      this.contentCreate.emit(this.contentModel);
      this.contentModel = {};
      this.contentForm.reset();
    }
    
  }
}