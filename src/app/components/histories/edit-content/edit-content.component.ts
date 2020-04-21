import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { VisualGrapsService } from '../../../services/visual-graps.service';
import { Content } from '../../../models/History';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Constants } from '../../../app.constants';
import { Contents } from '../../../models/Contents';


@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.scss']
})
export class EditContentComponent implements OnInit {

  @Input() posContent: number;
  @Input() content: Content;

  contentModel: Content = {}
  actualValuesContent: Content = {}
  contentForm: FormGroup;
  contentsTypes: any = Constants.CONTENTS_TYPES;
  contentEnum: typeof Contents = Contents;
  alignsTypes:any =Constants.ALIGNS_TYPES;
  graphTitle: string;

  settings: any;

  @Output() contentCreate = new EventEmitter<any>();
  @Output() closeContent = new EventEmitter<any>();
  @Output() changeContent = new EventEmitter<any>();

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

  get invalidTitle(){
    return this.contentForm.get('title').invalid && this.contentForm.get('title').touched;
  }

  ngOnInit() {
    this.initiateForm();
    this._servicio.getIdGraph().subscribe(id => {
      this.contentModel.visual_content=id;
      this.contentForm.controls['visual_content'].setValue(id);
    });

    this._servicio.getTitleGraph().subscribe(title => {
      this.graphTitle=title;
      console.log(this.graphTitle);
    });

    if(this.content){
      this.setForm();
    }
    this.contentForm.valueChanges.subscribe(val => {
      this.actualValuesContent ={
        title: this.contentForm.get('title').value, 
        description: this.contentForm.get('description').value, 
        type_content: this.contentForm.get('type_content').value,
        visual_content: this.contentForm.get('visual_content').value,
        align: this.contentForm.get('align').value == ""? null: this.contentForm.get('align').value
      };
      
      this.changeContent.emit({content: this.actualValuesContent})
    });
    
  }

  initiateForm(){
    this.contentForm = this._formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      visual_content: new FormControl(null),
      type_content: new FormControl(null),
      align: new FormControl('')
    });
  }

  setForm(){
    this.contentForm = this._formBuilder.group({
      title: this.content.title,
      description: this.content.description,
      visual_content: this.content.visual_content,
      type_content: this.content.type_content,
      align: this.content.align
    });
  }

  saltaCampo(e, id){
    console.log(e);
    e.preventDefault();
    document.getElementById(id).focus();
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
        type_content: this.contentForm.get('type_content').value,
        visual_content: this.contentForm.get('visual_content').value,
        align: this.contentForm.get('align').value == ""? null: this.contentForm.get('visual_content').value
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

  closeComponentContent(){
    this.closeContent.emit();

  }
}