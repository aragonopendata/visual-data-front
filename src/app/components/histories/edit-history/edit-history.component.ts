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
  actualContent:Content=null;
  contentToDelete:Content;
  posToEdit:number;
  actualPosToEdit:number;
  showAddContent = false;
  settings: any;
  firstTime:boolean =true;
  loading: boolean = true;
  editAdmin:boolean =false;
  admin: Object={};
  isAdmin: boolean=false;
  previousButton:string=null;
  versionHistory:boolean=false;

  stateHistory:any =0;
  stateEnum: typeof State = State;

  routerLinkViewHistory = Constants.ROUTER_LINK_VIEW_HISTORY;

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

    if(localStorage.getItem('currentUser')){

      this.admin=JSON.parse(localStorage.getItem('currentUser'));

      if(this.admin['rol'] == "global_adm"){
        this.isAdmin = true;
      }
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


  saltaCampo(e, id){
    console.log(e);
    e.preventDefault();
    e.stopPropagation();
    document.getElementById(id).focus();
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


  getHistoryForm(button, primerAviso){
    if(this.historyForm.invalid){
      return Object.values(this.historyForm.controls).forEach(control => {
        control.markAsTouched();
      })
    }else{
      if(this.showAddContent && primerAviso){
        this.previousButton=button;
        $('#questionDeleteContent').modal('show');
      }else{
        $('#questionDeleteContent').modal('hide');
        if(this.previousButton){
          button=this.previousButton;
          this.previousButton=null;
        }
        this.showAddContent = false;
        this.getState(button);
        console.log(this.stateHistory)
        if(this.historyBack.email){
          if((this.historyBack.state==this.stateEnum.borrador)||(this.editAdmin)||((this.historyBack.state==this.stateEnum.publicada)&&(this.versionHistory))){//unico estado de momento editable por usuario o guardado de admin o versionar historia publicada
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
  }

  getState(button){
    console.log(button.id)
    if(button.id=="btnSendRevision"){
      this.stateHistory=this.stateEnum.revision
      console.log("entro a get de sendRevision")
    }else if(button.id=="btnSendVersionar"){
      this.stateHistory=this.stateEnum.revision
      this.versionHistory=true;
      console.log("entro a get de sendPublicar")
    }else if(button.id=="btnSendPublicar"){
      this.stateHistory=this.stateEnum.publicada
      console.log("entro a get de sendPublicar")
    }else if((button.id=="btnSaveHistory")&&(this.isAdmin)){
      this.stateHistory=this.historyBack.state;
      this.editAdmin=true;
      console.log("entro a get de sendGuardar desde admin")
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
      id_reference:this.historyBack.id_reference? this.historyBack.id_reference:null 
    }

    if(this.versionHistory){
      this.historyModel.id_reference=this.historyModel.id;
    }

    if(action==Constants.PREVIEW_HISTORY){
      this.sendToPreviewPage();
    }else if(action==Constants.SAVE_HISTORY){
      this.saveHistoryUser();
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
        this.historyModel.url=Constants.FOCUS_URL;
        this._historiesService.sendSaveUserMail(this.historyModel).subscribe(result => {
          if(result.status==200){
            console.log('correo usuario OK')
            if(this.stateHistory==this.stateEnum.revision){
              this._historiesService.sendSaveAdminMail(this.historyModel).subscribe(result => {
                if(result.status==200){
                  console.log('correo admin OK')
                }
              },err => {
                console.log('Error al obtener las categorias');
              });
            }
          }
        },err => {
          console.log('Error al obtener las categorias');
        });
      } else {
        console.log('Error GUARDANDO historia')
        this.openModalError()
      }
    });

  }

  postHistoryAdmin(){
    this._historiesService.publishHistory(this.historyBack.id).subscribe(result => {
      if(result.success){
        this.historyBack = this.historyModel;
        $('#successfullModalCenter').modal('show');
        this.historyModel.url=Constants.FOCUS_URL + Constants.ROUTER_LINK_VIEW_HISTORY + "/" + this.historyModel.id;
        this._historiesService.sendPublicUserMail(this.historyModel).subscribe(result => {
          console.log(result)
          if(result.status==200){
            console.log('correo usuario publicada OK')
          }else{
            console.log('error envio mail!')
          }
        }, err =>{
          console.log('error envio mail con error!')
        });

      }else{
        console.log('error publicando historia!')
      }
    })
  }


  updateHistoryUser(){
    this._historiesService.updateHistory(this.historyModel).subscribe(result => {
      console.log(result)
      if (result.status == 200 && result.success) {
        this.historyBack = this.historyModel;
        $('#successfullModalCenter').modal('show');
        if(this.stateHistory==this.stateEnum.revision && (!this.editAdmin)){
          this._historiesService.sendSaveAdminMail(this.historyModel).subscribe(result => {
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
    this.editAdmin=false;
    this.versionHistory=false;

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

  viewHistory(){
    if(this.isAdmin){
      $('#successfullModalCenter').modal('hide');
      this._route.navigate([this.routerLinkViewHistory + '/'+ this.historyModel.id]);
    }
    else{
      this.goHome();
    }
  }

  /**
   * Edit content
   * @param newContent 
   */
  editContent( content: Content, i: number ){
    if(!this.showAddContent){
      this.contentToEdit = content;
      this.actualContent=this.contentToEdit;
      this.posToEdit = i;
      this.actualPosToEdit =this.posToEdit;
      this.showAddContent = true;
    }else if ((this.showAddContent)&&(i!=this.posToEdit)){
      this.contentToEdit = content;
      this.posToEdit = i;
      this.showAddContent = false;
      $('#questionContPrevious').modal('show');
    }
  }

  /**
   * Confirm edit content
   * @param discardPrevious 
   */
  confirmEditContent(discardPrevious: boolean){
    if(discardPrevious){
      this.showAddContent = true;
    }else{
      this.contentToEdit=this.actualContent;
      this.posToEdit=this.actualPosToEdit;
      this.showAddContent = true;
    }
    $('#questionContPrevious').modal('hide');
  }

  /**
   * Delete content
   * @param newContent 
   */
  deleteContent( content: Content ){
    this.contentToDelete=content;
    $('#questionDeleteContent').modal('show');
  }

  /**
   * Confirm delete of a content
   */
  confirmDeleteContent(){
    $('#questionDeleteContent').modal('hide');
    this.contents = this.contents.filter( (e) => {
      return this.contentToDelete!==e;
    });
  }

  closeDeleteContentModal(){
    $('#questionDeleteContent').modal('hide');
    this.previousButton=null;
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

  changeContent( changeContent ){
    this.actualContent=changeContent.content;
  }

  /**
   * Open modal to add content
   */
  addNewContent(){
    this.posToEdit=this.contents.length;
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