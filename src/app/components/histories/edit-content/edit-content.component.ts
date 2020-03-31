import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
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

  @Input() posContent: number;
  @Input() content: Content;
  
  contentModel: Content = {}
  contentForm: FormGroup;

  settings: any;

  @Output() contentCreate = new EventEmitter<any>();

  constructor( private _route: Router, private _servicio: VisualGrapsService, private _formBuilder:FormBuilder) { 
    
    this.settings = {
      selector: '#editorContent',
      theme_url: 'http://opendata.aragon.es/static/public/plugins/tinymce/themes/modern/theme.js',
      skin_url: 'http://opendata.aragon.es/static/public/plugins/tinymce/skins/lightgray',
      baseURL: 'http://opendata.aragon.es/static/public/plugins/tinymce',
      plugins: [' link '],
      toolbar: ' bold italic underline | link ',
      menubar: false,
      branding: false
    }

  }

  get invalidTitle(){
    return this.contentForm.get('title').invalid && this.contentForm.get('title').touched;
  }

  ngOnInit() {
    this.initiateForm();
    this._servicio.getIdGraph().subscribe(id => {
      this.contentModel.visualContent=id;
      this.contentForm.controls['visualContent'].setValue(id);
    });

    if(this.content){
      this.setForm();
    }
    
  }

  initiateForm(){
    this.contentForm = this._formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      visualContent: new FormControl(null),
      typeContent: new FormControl(''),
      align: new FormControl('')
    });
  }

  setForm(){
    this.contentForm = this._formBuilder.group({
      title: this.content.title,
      description: this.content.description,
      visualContent: this.content.visualContent,
      typeContent: this.content.typeContent,
      align: this.content.align
    });
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
      this.contentModel = {
        title: this.contentForm.get('title').value, 
        description: this.contentForm.get('description').value, 
        typeContent: this.contentForm.get('typeContent').value,
        visualContent: this.contentForm.get('visualContent').value,
        align: this.contentForm.get('align').value
      };

      this.contentCreate.emit({
        action: this.content ? 'edit':'new',
        posContent: this.posContent,
        content: this.contentModel
      });
      console.log(this.contentModel);
      this.contentModel = {};
      this.contentForm.reset();
    }
  }
  
}