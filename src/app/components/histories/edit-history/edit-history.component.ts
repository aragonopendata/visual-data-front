import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { HistoriesService } from '../../../services/histories.service';
import { History, Content } from '../../../models/History';
import { Router, ActivatedRoute } from '@angular/router';
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
  secondCategories: Category[];
  contents: Content[]=[];
  historyModel: History = {};
  historyForm: FormGroup;
  previewHistoryModel: History = {};
  emailForm: FormGroup;
  emailHistory: string;

  contentToEdit:Content;
  posToEdit:number;
  showAddContent = false;
  settings: any;

  @ViewChild('tokenGenerate') tokenGenerate: ElementRef;
  @ViewChild('newContentElement') newContentElement: ElementRef;


  constructor(private _historiesService: HistoriesService, private _cdRef: ChangeDetectorRef,
              private _route: Router, private _formBuilder: FormBuilder, private _activatedRoute: ActivatedRoute) { 

    this.settings = {
      selector: '#editor',
      theme_url: 'http://opendata.aragon.es/static/public/plugins/tinymce/themes/modern/theme.js',
      skin_url: 'http://opendata.aragon.es/static/public/plugins/tinymce/skins/lightgray',
      baseURL: 'http://opendata.aragon.es/static/public/plugins/tinymce',
      plugins: [' link '],
      toolbar: ' bold italic underline | link ',
      menubar: false,
      branding: false
    }

  }

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
      secondCategories: new FormControl(''),
      contents: new FormControl('')
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

  

  // falseClickAddContent(){
  //   this.addContentButton.nativeElement.click();
  // }

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
      // localStorage.setItem(Constants.LOCALSTORAGE_KEY_MAIL, this.emailForm.get('email').value);
      this.saveHistory();
    }
    
  }

  getCategoriesSelected(event, cat: Category){
    event.preventDefault();
    event.stopPropagation();
    cat.selected = !cat.selected;
  }

  getHistory(){

    let cat2Selected = [];
    this.secondCategories.forEach( (element) => {
      if(element.selected){
        cat2Selected.push(element.id);
      }
    });

    this.previewHistoryModel = {
      title: this.historyForm.get('title').value,
      description: this.historyForm.get('description').value,
      email:localStorage.getItem(Constants.LOCALSTORAGE_KEY_MAIL),
      main_category: this.historyForm.get('category').value == '' ? null : this.historyForm.get('category').value,
      secondary_category: cat2Selected,
      contents: this.contents == undefined ? [] : this.contents
    }

    console.log(this.previewHistoryModel);
    localStorage.setItem(Constants.LOCALSTORAGE_KEY_HISTORY, JSON.stringify(this.previewHistoryModel));

  }

  saveHistory(){

    let cat2Selected = [];
    this.secondCategories.forEach( (element) => {
      if(element.selected){
        cat2Selected.push(element.id);
      }
    });

    this.historyModel = {
      title: this.historyForm.get('title').value,
      description: this.historyForm.get('description').value,
      email:localStorage.getItem(Constants.LOCALSTORAGE_KEY_MAIL),
      main_category: this.historyForm.get('category').value == '' ? null : this.historyForm.get('category').value,
      secondary_category: cat2Selected,
      contents: this.contents == undefined ? [] : this.contents
    }
    this._historiesService
      .sendMail(this.historyModel.title).subscribe(result => {
        console.log('mail enviado')
        if(result.status==200){
          console.log('correo back OK')
        }
      });

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

  /**
   * Edit content
   * @param newContent 
   */
  editContent( content: Content, i: number ){
    this.contentToEdit = content;
    this.posToEdit = i;
    this.showAddContent = true;
  }

  /**
   * Delete content
   * @param newContent 
   */
  deleteContent( content: Content ){
    this.contents = this.contents.filter( (e) => {
      return content!==e;
    });
  }

  /**
   * New content add
   * @param newContent 
   */
  newContent( actionContent ){

    if( actionContent.action === 'new' ){
      this.contents.push(actionContent.content);
    } else {
      this.contents[actionContent.posContent] = actionContent.content;
    }
    
    this.closeNewContent();
  }

  /**
   * Open modal to add content
   */
  addNewContent(){
    this.showAddContent = true;
    this._cdRef.detectChanges();
    this.newContentElement.nativeElement.scrollIntoView({behavior:"smooth"});
  }

  /**
   * Close modal to add content
   */
  closeNewContent(){
    this.contentToEdit = null;
    this.showAddContent = false;
  }
}