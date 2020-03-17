import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HistoriesService } from '../../../services/histories.service';
import { History, Content } from '../../../models/History';
import { Router } from '@angular/router';
import { Category } from '../../../models/Category';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Constants } from '../../../app.constants';
import { typeSourceSpan } from '@angular/compiler';

//import * as tinymce from '../../../../../node_modules/tinymce/tinymce';

declare var $: any;


@Component({
  selector: 'app-edit-history',
  templateUrl: './edit-history.component.html',
  styleUrls: ['./edit-history.component.scss']
})
export class EditHistoryComponent implements OnInit {

  categories: Category[];
  secondCategories: Category[];
  secondCategoriesSelected: number[];
  contents: Content[]=[];
  historyModel: History = {};
  historyForm: FormGroup;
  emailForm: FormGroup;
  emailHistory: string;
  //settings: any;
  //desc: any;

  @ViewChild('addContent') addContentButton: ElementRef;
  @ViewChild('tokenGenerate') tokenGenerate: ElementRef;


  constructor(private _historiesService: HistoriesService, private _route: Router, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCategories();
    this.initiateForms();
    //this.getEmailLocalStorage();
  }

  getCategories(){
    this._historiesService.getCategories().subscribe( (categories: Category[]) => {
      this.categories = categories;
      this.secondCategories = categories;
		},err => {
      console.log('Error al obtener las categorias');
    });
  }

  getSecondaryCategories(){
    this.secondCategories = [];
    for (let category of this.categories)
    {
      if(category.id!==this.historyForm.get('category').value){
        this.secondCategories.push(category);
      }
    }
  }

  initiateForms(){
    this.historyForm = this._formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      category: new FormControl(''),
      secondCategories: new FormControl('')
    })
    this.emailForm = this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,3}$')])
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

  getCategoriesSelected(){
    this.secondCategoriesSelected=this.historyForm.get('secondCategories').value;
    console.log(this.secondCategoriesSelected);
  }
  

  /*getEmailLocalStorage(){
    this.emailHistory=localStorage.getItem(Constants.LOCALSTORAGE_KEY_MAIL);
    console.log(this.emailHistory);
  }*/


  saveHistory(){
    this.historyModel = {
      title: this.historyForm.get('title').value,
      description: this.historyForm.get('description').value,
      email:localStorage.getItem(Constants.LOCALSTORAGE_KEY_MAIL),
      main_category: this.historyForm.get('category').value == '' ? null : this.historyForm.get('category').value,
      secondary_category: this.secondCategoriesSelected == undefined ? [] : this.secondCategoriesSelected
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