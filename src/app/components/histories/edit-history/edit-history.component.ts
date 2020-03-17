import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HistoriesService } from '../../../services/histories.service';
import { History, Content } from '../../../models/History';
import { Router } from '@angular/router';
import { Category } from '../../../models/Category';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Constants } from '../../../app.constants';

declare var $: any;

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
  emailForm: FormGroup;
  emailHistory: string;

  settings: any;

  @ViewChild('addContent') addContentButton: ElementRef;
  @ViewChild('tokenGenerate') tokenGenerate: ElementRef;


  constructor(private _historiesService: HistoriesService, private _route: Router, private _formBuilder: FormBuilder) { 

    this.settings = {
      selector: '#editor',
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
    this.getCategories();
    this.initiateForms();
    this.getEmailLocalStorage();
  }

  getCategories(){
    this._historiesService.getCategories().subscribe( (categories: Category[]) => {
      this.categories = categories;
		},err => {
      console.log('Error al obtener las categorias');
    });
  }

  initiateForms(){
    this.historyForm = this._formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      category: new FormControl('')
    })
    this.emailForm = this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])
    })
  }

  get invalidTitle(){
    return this.historyForm.get('title').invalid && this.historyForm.get('title').touched;
  }

  get invalidEmail(){
    return this.emailForm.get('email').invalid && this.emailForm.get('email').touched;
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
    }else{
      this.emailForm.reset();
      $("#emailModalCenter").modal('show');
    }
  }

  
  saveMailForm(){
    if(this.emailForm.invalid){
      return Object.values(this.emailForm.controls).forEach(control => {
        control.markAsTouched();
      })
    }
  
    else{
      $('#emailModalCenter').modal('hide');
      localStorage.setItem(Constants.LOCALSTORAGE_KEY_MAIL, this.emailForm.get('email').value);
      this.saveHistory();
    }
    
  }
  

  getEmailLocalStorage(){
    this.emailHistory=localStorage.getItem(Constants.LOCALSTORAGE_KEY_MAIL);
    console.log(this.emailHistory);
  }


  saveHistory(){
    this.historyModel = {
      title: this.historyForm.get('title').value,
      description: this.historyForm.get('description').value,
      email:localStorage.getItem(Constants.LOCALSTORAGE_KEY_MAIL),
      main_category: this.historyForm.get('category').value
    }

    this._historiesService.setHistory(this.historyModel).subscribe(result => {
      console.log(result)
      if (result.status == 200 && result.success) {
        this.historyModel.id = result.id;
        $('#successfullModalCenter').modal('show');
      } else {
        console.log('error en insercción')
      }
    });
  }
  


  copyToken(){
    if (this.tokenGenerate) {
       // Select textarea text
       this.tokenGenerate.nativeElement.select();

       // Copy to the clipboard
       document.execCommand("copy");

       // Deselect selected textarea
       this.tokenGenerate.nativeElement.setSelectionRange(0, 0);
    }
  }

  goHome(){
    $('#successfullModalCenter').modal('hide');
    this._route.navigateByUrl("/");
  }
}