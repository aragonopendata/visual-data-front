import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HistoriesService } from '../../../services/histories.service';
import { History, Content } from '../../../models/History';
import { Router } from '@angular/router';
import { Category } from '../../../models/Category';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Constants } from '../../../app.constants';


@Component({
  selector: 'app-edit-history',
  templateUrl: './edit-history.component.html',
  styleUrls: ['./edit-history.component.scss']
})
export class EditHistoryComponent implements OnInit {

  categories: Category[];
  contents: Content[]=[];
  historyModel: History = {};
  historyForm: FormGroup;
  emailHistory: string;

  description: string = "";
  settings: any;

  @ViewChild('addContent') addContentButton: ElementRef;

  constructor(private _historiesService: HistoriesService, private _route: Router, private _formBuilder: FormBuilder) { 

    this.settings = {
      selector: '#editor',
      theme_url: Constants.AOD_ASSETS_BASE_URL + '/public/plugins/tinymce/themes/modern/theme.js',
      skin_url: Constants.AOD_ASSETS_BASE_URL + '/public/plugins/tinymce/skins/lightgray',
      baseURL: Constants.AOD_ASSETS_BASE_URL + '/public/plugins/tinymce',
      plugins: [' link '],
      toolbar: ' bold italic underline | link ',
      menubar: false,
      branding: false
    }

  }

  ngOnInit() {
    this.getCategories();
    this.initiateForm();
    this.getEmailLocalStorage();
  }

  getCategories(){
    this._historiesService.getCategories().subscribe( (categories: Category[]) => {
      this.categories = categories;
		},err => {
      console.log('Error al obtener las categorias');
    });
  }

  initiateForm(){
    this.historyForm = this._formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
    })
  }

  get invalidTitle(){
    return this.historyForm.get('title').invalid && this.historyForm.get('title').touched;
  }
  get invalidDescription(){
    return this.historyForm.get('description').invalid && this.historyForm.get('description').touched;
  }
  get invalidCategory(){
    return this.historyForm.get('category').invalid && this.historyForm.get('category').touched;
  }

  newContent( newContent: Content ){
    console.log(newContent)
    this.contents.push(newContent);
    this.falseClickAddContent();
  }

  falseClickAddContent(){
    this.addContentButton.nativeElement.click();
  }

  saveHistoryForm(){
    if(this.historyForm.invalid){
      return Object.values(this.historyForm.controls).forEach(control => {
        control.markAsTouched();
      })
    }
    else{
      this._route.navigateByUrl("/");
    }
  }

  getEmailLocalStorage(){
    this.emailHistory=localStorage.getItem(Constants.LOCALSTORAGE_KEY_MAIL);
    console.log(this.emailHistory);
  }

}