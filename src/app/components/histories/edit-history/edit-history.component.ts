import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { HistoriesService } from '../../../services/histories.service';
import { History, Content } from '../../../models/History';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../../../models/Category';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Constants } from '../../../app.constants';
import { State } from '../../../models/State';

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
  historyBack: History={};

  contentToEdit:Content;
  posToEdit:number;
  showAddContent = false;
  settings: any;
  firstTime:boolean =true;
  loading: boolean = true;
  isAdmin:boolean=true;

  stateHistory:any =0;
  stateEnum: typeof State = State;


  @ViewChild('tokenGenerate') tokenGenerate: ElementRef;
  @ViewChild('newContentElement') newContentElement: ElementRef;


  constructor(private _historiesService: HistoriesService, private _cdRef: ChangeDetectorRef,
              private _route: Router, private _formBuilder: FormBuilder, private _activatedRoute: ActivatedRoute) { 

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

    this.initiateForms();

    this._historiesService.getCategories().subscribe( (categories: Category[]) => {
      this.categories = categories;
      this.secondCategories = categories;
      this._activatedRoute.params.subscribe(params => {
        if(params.id!=null){
          this.getHistory(params.id);
        }
        else{

          this.loading = false;
        }
      });
		},err => {
      console.log('Error al obtener las categorias');
    });
  }

  ngOnInit() {
  }

  getHistory(id: string){
    console.log("Entro:" + id)
    this._historiesService.getHistoryBack(id).subscribe(result => {
      if(result.success){
        this.historyBack = result.history;
        this.updateWithBackHistory();
      }
    });
  }

  updateWithBackHistory(){
      this.historyForm.controls['title'].setValue(this.historyBack.title);
      this.historyForm.controls['description'].setValue(this.historyBack.description);
      this.historyForm.controls['category'].setValue(this.historyBack.main_category);
      this.historyForm.controls['secondCategories'].setValue(this.historyBack.secondary_categories);
      this.historyForm.controls['contents'].setValue(this.historyBack.contents);
      
      this.historyBack.secondary_categories.forEach(id => {
        this.secondCategories.forEach(cat => {
          if(cat.id==id){
            cat.selected=true;
            console.log(id);
          }
        });
      });
      
      this.contents=this.historyBack.contents== null? [] : this.historyBack.contents;

      return this.loading=false;
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
      email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$')])
    })
  }


  get invalidTitle(){
    return this.historyForm.get('title').invalid && this.historyForm.get('title').touched;
  }

  get invalidEmail(){
    return this.emailForm.get('email').invalid && this.emailForm.get('email').touched;
  }

  getCategoriesSelected(event, cat: Category){
    event.preventDefault();
    event.stopPropagation();
    cat.selected = !cat.selected;
  }


  getHistoryForm(button){
    this.getState(button);
    console.log(this.stateHistory)
    if(this.historyForm.invalid){
      return Object.values(this.historyForm.controls).forEach(control => {
        control.markAsTouched();
      })
    }else{
      if(this.historyBack.email){
        if(this.historyBack.state==this.stateEnum.borrador){//unico estado de momento editable por usuario o admin
          console.log('se pcece a actualizar la historia')
          this.firstTime=false;
          this.operateWithHistory(Constants.UPDATE_HISTORY);
        }else if((this.historyBack.state==this.stateEnum.revision)&&(this.isAdmin)){//caso de que el admin vaya a actualizar estado
          console.log('admin va a actualizar estado')
          this.firstTime=false;
          this.operateWithHistory(Constants.POST_HISTORY_ADMIN);
        }
        else{
          console.log("no presenta un estado editable")
          this.openModalError()
        }
      }
      else{
        this.emailForm.reset();
        $("#emailModalCenter").modal('show');
      }
    }
  }

  getState(button){
    console.log(button.id)
    if(button.id=="btnSendRevision"){
      this.stateHistory=this.stateEnum.revision
      console.log("entro a get de sendRevision")
    }else if(button.id=="btnSendPublicar"){
      this.stateHistory=this.stateEnum.publicada
      console.log("entro a get de sendPublicar")
    }
    else{
      this.stateHistory=this.stateEnum.borrador
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
      this.firstTime=true;
      this.operateWithHistory(Constants.SAVE_HISTORY)
      //this.saveHistory();
    }
    
  }

  openModalError(){
    $('#successfullModalCenter').modal('hide');
    $('#emailModalCenter').modal('hide');
    $('#errorModalCenter').modal('show');
  }

  // closeModalError(){
  //   $('#successfullModalCenter').modal('hide');
  //   $('#emailModalCenter').modal('hide');
  //   $('#errorModalCenter').modal('hide');
  // }

  
  /**
   * Peview history
   */
  getPreviewHistory() {
    if(!this.historyForm.invalid){
      this.stateHistory=this.historyBack.state?  this.historyBack.state: this.stateEnum.sinDefinir;
      this.operateWithHistory(Constants.PREVIEW_HISTORY);
    }
  }

  operateWithHistory(action){
    let cat2Selected = [];
    this.secondCategories.forEach( (element) => {
      if(element.selected){
        cat2Selected.push(element.id);
      }
    });


    this.historyModel = {
      id: this.historyBack.id ? this.historyBack.id : null, 
      state:this.stateHistory,
      email: this.historyBack.email? this.historyBack.email : this.emailForm.get('email').value,
      title: this.historyForm.get('title').value,
      description: this.historyForm.get('description').value  == '' ? null : this.historyForm.get('description').value,
      main_category: this.historyForm.get('category').value == '' ? null : this.historyForm.get('category').value,
      secondary_categories: cat2Selected,
      contents: (this.contents.length==0)  ? null : this.contents,
      create_date:this.historyBack.create_date? this.historyBack.create_date :null,
      update_date:this.historyBack.update_date? this.historyBack.update_date:null,      
      id_reference:null ////dato a sacar de si viene otra historia o no, de momento nulo

    }


    if(action==Constants.PREVIEW_HISTORY){
      this.sendToPreviewPage();
    }else if(action==Constants.SAVE_HISTORY){
      this.saveHistoryUser()
    }else if(action==Constants.UPDATE_HISTORY){
      this.updateHistoryUser();
    } else if (action==Constants.POST_HISTORY_ADMIN){
      this.postHistoryAdmin();
    }

  }

  sendToPreviewPage(){
    localStorage.setItem(Constants.LOCALSTORAGE_KEY_HISTORY, JSON.stringify(this.historyModel));
    let urlPreview="/#/"+ Constants.ROUTER_LINK_PREVIEW_HISTORY
    window.open(urlPreview, '_blank');
  }

  saveHistoryUser(){
    this._historiesService.setHistory(this.historyModel).subscribe(result => {
      if (result.status == 200 && result.success) {
        console.log("Guardado de historia correcto")
        this.historyModel.id = result.id;
        this.historyBack = this.historyModel;
        this.updateWithBackHistory();
        $('#successfullModalCenter').modal('show');
        this._historiesService.sendUserMail(this.historyModel).subscribe(result => {
          if(result.status==200){
            console.log('correo usuario OK')
            if(this.stateHistory==this.stateEnum.revision){
              this._historiesService.sendAdminMail(this.historyModel).subscribe(result => {
                if(result.status==200){
                  console.log('correo admin OK')
                }
              });
            }
          }
        });
      } else {
        console.log('Error GUARDANDO historia')
        this.openModalError()
      }
    });

  }

  postHistoryAdmin(){
    //crear llamada para actualizar estado a puclicada en admin
    console.log('peticion admin postear historia')
    this.historyBack = this.historyModel;
    $('#successfullModalCenter').modal('show');
  }


  updateHistoryUser(){
    this._historiesService.updateHistory(this.historyModel).subscribe(result => {
      console.log(result)
      if (result.status == 200 && result.success) {
        console.log('actualizado Ok MOSTRAR MODAL OK');
        this.historyBack = this.historyModel;
        $('#successfullModalCenter').modal('show');
        if(this.stateHistory==this.stateEnum.revision){
          this._historiesService.sendAdminMail(this.historyModel).subscribe(result => {
            if(result.status==200){
              console.log('correo admin OK')
            }
          });
        }
      } else {
        console.log('error en ACTUALIZACION MOSTRAR MODAL KO')
        this.openModalError()
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