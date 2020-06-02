import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { VisualGrapsService } from '../../../services/visual-graps.service';
import { Content } from '../../../models/History';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Constants } from '../../../app.constants';
import { Contents } from '../../../models/Contents';
import { UtilsService } from '../../exportedFunctions/utils.service';
import { GraphService } from '../../../services/graph.service';

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
  openedMenu: boolean;
  bodyGraph: boolean=false;

  settings: any;

  @Output() contentCreate = new EventEmitter<any>();
  @Output() closeContent = new EventEmitter<any>();
  @Output() changeContent = new EventEmitter<any>();

  constructor(private utilsService: UtilsService, private _route: Router, private _servicio: VisualGrapsService, private _formBuilder:FormBuilder, private _graphservice: GraphService) { 
    
    this.settings = {
      selector: '#editorContent',
      theme_url: Constants.AOD_ASSETS_BASE_URL + '/public/plugins/tinymce/themes/modern/theme.js',
      skin_url: Constants.AOD_ASSETS_BASE_URL + '/public/plugins/tinymce/skins/lightgray',
      baseURL: Constants.AOD_ASSETS_BASE_URL + '/public/plugins/tinymce',
      plugins: [' link '],
      toolbar: ' bold italic underline | link ',
      menubar: false,
      branding: false,
    }

    this.getOpenedMenu();

  }

  get invalidTitle(){
    return this.contentForm.get('title').invalid && this.contentForm.get('title').touched;
  }

  ngOnInit() {
    this.initiateForm();
    this._servicio.getIdGraph().subscribe(id => {
      console.log(this.bodyGraph);
      if(this.bodyGraph){
        this.contentModel.visual_content=id;
        this.contentModel.body_content=true;
        this.contentForm.controls['visual_content'].setValue(id);
        this.contentForm.controls['body_content'].setValue(true);
        this.bodyGraph=false;
      }
      
    });

    this._servicio.getTitleGraph().subscribe(title => {
      this.graphTitle=title;
    });

    this._servicio.getClose().subscribe(closed=>{
      //closed==true
      console.log('entro ')
      this.bodyGraph=false;
    })

    if(this.content){
      this.setForm();
    }
    this.contentForm.valueChanges.subscribe(val => {
      this.actualValuesContent ={
        title: this.contentForm.get('title').value, 
        description: this.contentForm.get('description').value, 
        type_content: this.contentForm.get('type_content').value,
        visual_content: this.contentForm.get('visual_content').value,
        align: this.contentForm.get('align').value,
        body_content: this.contentForm.get('body_content').value
      };
      if (this.contentForm.get("type_content").value!=this.contentEnum.graph){
        this.graphTitle=undefined;
      }
      this.changeContent.emit({content: this.actualValuesContent})
    });    
  }

  getOpenedMenu(){
    this.utilsService.openedMenuChange.subscribe(value => {
      this.openedMenu = value;
    });
  }

  initiateForm(){
    this.contentForm = this._formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      visual_content: new FormControl(null),
      type_content: new FormControl(null),
      align: new FormControl(1),
      body_content: true
    });
  }

  setForm(){
    this.contentForm = this._formBuilder.group({
      title: this.content.title,
      description: this.content.description,
      visual_content: this.content.visual_content,
      type_content: this.content.type_content,
      align: this.content.align,
      body_content: this.content.body_content
    });

    if(this.contentForm.get("type_content").value==this.contentEnum.graph){
      this._graphservice.getChart(this.content.visual_content).subscribe(chart => {
        this.graphTitle=chart.title;
        this.contentModel.visual_content=this.content.visual_content;
      });
    }
  }

  openVisualData() {
    var type="all";
    document.getElementsByTagName('body')[0].classList.add('no-scroll');
    this._route.navigate([{outlets: {modal: 'visualData/listGraph/'+type}}]);
    this.bodyGraph=true;
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
        align: this.contentForm.get('align').value,
        body_content: true
      };
      console.log(this.contentModel);
      this.contentCreate.emit({
        action: this.content ? 'edit':'new',
        posContent: this.posContent,
        content: this.contentModel
      });
      this.contentModel = {};
      this.contentForm.reset();
    }
  }  

  closeComponentContent(){
    this.closeContent.emit();

  }
}