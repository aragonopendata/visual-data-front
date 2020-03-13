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
  emailForm: FormGroup;
  emailHistory: string;

  @ViewChild('addContent') addContentButton: ElementRef;

  constructor(private _historiesService: HistoriesService, private _route: Router, private _formBuilder: FormBuilder) { }

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
    this.emailForm = this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])
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
    }
    else{
      if(this.emailForm.invalid){
        return Object.values(this.emailForm.controls).forEach(control => {
          control.markAsTouched();
        })
      }
      
      else{
        //console.log(this.emailForm);
        localStorage.setItem(Constants.LOCALSTORAGE_KEY_MAIL, this.emailForm.get('email').value);
        this._route.navigateByUrl("/");
      }
    }
  }

  getEmailLocalStorage(){
    this.emailHistory=localStorage.getItem(Constants.LOCALSTORAGE_KEY_MAIL);
    console.log(this.emailHistory);
  }

}