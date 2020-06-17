import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { HistoriesService } from '../../../services/histories.service';
import { History, Content } from '../../../models/History';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../../../models/Category';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Constants } from '../../../app.constants';
import { State } from '../../../models/State';
import { AuthGuard } from '../../../_guards/auth.guard';
import { UtilsService } from '../../exportedFunctions/utils.service';
import { GraphService } from '../../../services/graph.service';
import { VisualGrapsService } from '../../../services/visual-graps.service';
import { concatStatic } from 'rxjs/operator/concat';


// declare var tinymce: any;
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
  contentsGeneral:Content[];
  contentsHeader: Content[]=[];
  historyModel: History = {};
  historyForm: FormGroup;
  previewHistoryModel: History = {};
  emailForm: FormGroup;
  emailHistory: string;
  historyBack: History={};
  saved:boolean = false;
  isModified: boolean = false;
  publishing: boolean = false;
  errorTitle: string;
  errorMessage: string;
  graphTitle: string;
  type: string;
  graph: Content;
  numberGraph: boolean=false;
  deleteBodyCont:boolean=false;

  contentToEdit:Content;
  contentToEditAux:Content;
  actualContent:Content=null;
  contentToDelete:Content;
  posToEdit:number;
  posToEditAux:number;
  actualPosToEdit:number;
  showAddContent = false;
  settings: any;
  firstTime:boolean = true;
  loading: boolean = true;
  editAdmin:boolean =false;
  admin: Object={};
  isAdmin: boolean=false;
  previousButton:string=null;
  versionHistory:boolean=false;
  loadingModal: boolean;
  previewHistory:boolean=false;
  sendRevision:boolean=false;
  stateHistory:any =0;
  stateEnum: typeof State = State;
  haveMail:boolean=false;

  openedMenu: boolean;

  routerLinkViewHistory = Constants.ROUTER_LINK_VIEW_HISTORY;

  @ViewChild('tokenGenerate') tokenGenerate: ElementRef;
  @ViewChild('newContentElement') newContentElement: ElementRef;


  constructor(private _historiesService: HistoriesService, private _cdRef: ChangeDetectorRef,
              private _route: Router, private _formBuilder: FormBuilder, private _activatedRoute: ActivatedRoute,
              private _verifyTokenService: AuthGuard, private utilsService: UtilsService, 
              private _graphservice: GraphService, private _servicio: VisualGrapsService) { 

    this._activatedRoute.params.subscribe(params => {
      if(params.token!=null){
        this.previewHistory=true;
        this.firstTime =false;

      }
      else{
        this.previewHistory = false;
      }
    });
    
    this.settings = {
      selector: '#editor',
      theme_url: Constants.AOD_ASSETS_BASE_URL + '/public/plugins/tinymce/themes/modern/theme.js',
      skin_url: Constants.AOD_ASSETS_BASE_URL + '/public/plugins/tinymce/skins/lightgray',
      baseURL: Constants.AOD_ASSETS_BASE_URL + '/public/plugins/tinymce',
      plugins: [' link '],
      toolbar: ' bold italic underline | link ',
      menubar: false,
      branding: false,
    }

  }

  ngOnInit() {

    this.initiateForms();
    
    this._servicio.getIdGraph().subscribe(id => {
      //this.loading=true;
      if(this.numberGraph){
        
        var graph = new Content();
        graph.visual_content=id;
        graph.body_content=false;
        
        this._graphservice.getChart(graph.visual_content).subscribe(chart => {
          graph.title=chart.title;
          if(chart.type=='number'){
            this.contentsHeader.push(graph);
          }
          else{
            $('#errorModalNumber').modal('show');
          }
          
          //this.loading=false;
        });
        
        this.numberGraph=!this.numberGraph;
      }
      else{
        //this.loading=false;
      }
    });

    this._servicio.getClose().subscribe(closed=>{
      //cuando se cierra el modal con la cruz
      this.numberGraph=false;
    })

    if(localStorage.getItem('currentUser')){

      this.admin=JSON.parse(localStorage.getItem('currentUser'));

      if(this.admin['rol'] == "global_adm"){
        this._verifyTokenService.probeTokenAdmin()
        this.isAdmin = true;
      }
      this.loadHistory();

    }else{
      this.loadHistory();
    }

    this.getOpenedMenu();


  }

  loadHistory(){
    this._historiesService.getCategories().subscribe( (categories: Category[]) => {
      this.categories = categories;
      this.secondCategories = categories;
      this.historyBack.state=this.stateEnum.borrador;
      this._activatedRoute.params.subscribe(params => {
        if(params.token!=null){
          this.getHistory(params.token);
        }
        else{
          this.loading = false;
        }
      });
		},err => {
      this.objectLoadFailure()
    });
  }

  separateContents(){
    this.contentsHeader=[];
    this.contents=[];
    if(this.historyBack.contents && this.historyBack.contents.length>0){
      for (var contentNumber = 0; contentNumber < this.historyBack.contents.length; contentNumber++) {
        if(this.historyBack.contents[contentNumber].body_content){
          this.contents.push(this.historyBack.contents[contentNumber]);
        }else{
          this.contentsHeader.push(this.historyBack.contents[contentNumber]);
        }
      }
    }
    this.updateWithBackHistory();
  }

  getHistory(token: string){
    if(!this.isAdmin){
      this._historiesService.getHistoryBackUserByToken(token).subscribe(result => {
        if(result.success && result.history!=null){
          this.historyBack = result.history;
          this.separateContents();
        }else{
          this.objectLoadFailure()
        }
      },err => {
        this.objectLoadFailure()
      });
    }else{
      this._historiesService.getHistoryBackAdminByToken(token).subscribe(result => {
        if(result.success && result.history!=null){
          this.historyBack = result.history;
          this.separateContents();
        }else{
          this.objectLoadFailure()
        }
      },err => {
        this.objectLoadFailure()
      });
    }
  }

  getOpenedMenu(){
    this.utilsService.openedMenuChange.subscribe(value => {
      this.openedMenu = value;
    });
  }

  objectLoadFailure(){
    this.errorTitle = Constants.INFO_TITLE_OBJECT_FAILURE;
    this.errorMessage = Constants.INFO_BODY_HSITORY_FAILURE;
    this.loading=false;
  }

  updateWithBackHistory(){
      this.historyForm.controls['title'].setValue(this.historyBack.title);
      this.historyForm.controls['description'].setValue(this.historyBack.description);
      this.historyForm.controls['contentsHeader'].setValue(this.contentsHeader);
      this.historyForm.controls['category'].setValue(this.historyBack.main_category);
      this.historyForm.controls['secondCategories'].setValue(this.historyBack.secondary_categories);
      this.historyForm.controls['contentsBody'].setValue(this.contents);
      
      this.historyBack.secondary_categories.forEach(id => {
        this.secondCategories.forEach(cat => {
          if(cat.id==id){
            cat.selected=true;
          }
        });
      });

      return this.loading=false;
  }

  initiateForms(){
    this.historyForm = this._formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      contentsHeader:new FormControl(''),
      category: new FormControl('', Validators.required),
      secondCategories: new FormControl(''),
      contentsBody: new FormControl('')
    })
    this.emailForm = this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$')])
    })
  }

  get invalidTitle(){
    return this.historyForm.get('title').invalid && this.historyForm.get('title').touched;
  }

  get invalidCategory(){
    return this.historyForm.get('category').invalid && this.historyForm.get('category').touched;
  }

  get invalidEmail(){
    return this.emailForm.get('email').invalid && this.emailForm.get('email').touched;
  }

  getCategoriesSelected(event, cat: Category){
    event.preventDefault();
    event.stopPropagation();
    if(event.keyCode==13 || event.type=="click"){
      cat.selected = !cat.selected;
    }
    if(cat == this.secondCategories[this.secondCategories.length-1]){
      document.getElementById('button-cat2').click();
    }
  }

  getHistoryForm(button, primerAviso){
    if(this.historyForm.invalid){
      return Object.values(this.historyForm.controls).forEach(control => {
        control.markAsTouched();
      })
    }else{
      this.loadingModal=true;
      if(this.showAddContent && primerAviso){
        this.previousButton=button;
        this.loadingModal=false;
        $('#questionDeleteContent').modal('show');
      }else{
        $('#questionDeleteContent').modal('hide');
        if(this.previousButton){
          button=this.previousButton;
          this.previousButton=null;
        }
        this.showAddContent = false;
        this.getState(button);
        if(!this.firstTime){
          if((this.historyBack.state==this.stateEnum.borrador)||(this.editAdmin)||((this.historyBack.state==this.stateEnum.publicada)&&(this.versionHistory))){//unico estado de momento editable por usuario o guardado de admin o versionar historia publicada
            this.operateWithHistory(Constants.UPDATE_HISTORY);
          }else if((this.historyBack.state==this.stateEnum.revision)&&(this.isAdmin)){//caso de que el admin vaya a actualizar estado
            this.operateWithHistory(Constants.POST_HISTORY_ADMIN);
          }
          else{
            this.openModalError()
          }
        }
        else{
          this.operateWithHistory(Constants.SAVE_HISTORY)
        }
      }
    }
  }

  getState(button){
    this.editAdmin=false;
    this.versionHistory=false;
    this.publishing=false;

    this.loadingModal=true;
    if(button.id=="btnSendRevision"){
      this.stateHistory=this.stateEnum.revision
      this.sendRevision=true;
    }else if(button.id=="btnSendVersionar"){
      this.stateHistory=this.stateEnum.revision
      this.versionHistory=true;
    }else if(button.id=="btnSendPublicar"){
      this.publishing = true;
      this.stateHistory=this.historyBack.state;
      //this.stateHistory=this.stateEnum.publicada
    }else if((button.id=="btnSaveHistory")&&(this.isAdmin)){
      this.stateHistory=this.historyBack.state;
      this.editAdmin=true;
    }
    else{
      this.stateHistory=this.stateEnum.borrador
    }
  }
  

  saveMailForm(event){
    event.preventDefault();
    event.stopPropagation();
    if(this.emailForm.invalid){
      return Object.values(this.emailForm.controls).forEach(control => {
        control.markAsTouched();
      })
    }
    else{
      this.loadingModal=true;
      this.haveMail=true;
      this.firstTime=false;
      //$('#successfullModalCenter').modal('hide');
      this.setMailToHistory()
    }
  }

  openModalError(){
    $('#successfullModalCenter').modal('hide');
    this.loadingModal=false;
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
    
    this.contentsGeneral=[];
    this.contentsGeneral=this.contentsGeneral.concat(this.contentsHeader);
    this.contentsGeneral=this.contentsGeneral.concat(this.contents);

    this.historyModel = {
      id: this.historyBack.id ? this.historyBack.id : null, 
      token: this.historyBack.token ? this.historyBack.token : null, 
      state:this.stateHistory,
      title: this.historyForm.get('title').value,
      description: this.historyForm.get('description').value  == '' ? null : this.historyForm.get('description').value,
      email: this.historyBack.email? this.historyBack.email : null,
      main_category: this.historyForm.get('category').value == '' ? null : this.historyForm.get('category').value,
      secondary_categories: cat2Selected,
      contents: (this.contentsGeneral.length==0)  ? null : this.contentsGeneral,
      create_date:this.historyBack.create_date? this.historyBack.create_date : new Date().toISOString(),
      update_date:this.historyBack.create_date? new Date().toISOString():null,      
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
      this.updateHistory();
    } else if (action==Constants.POST_HISTORY_ADMIN){
      this.updateHistory();
    }

  }

  sendToPreviewPage(){
    localStorage.setItem(Constants.LOCALSTORAGE_KEY_HISTORY, JSON.stringify(this.historyModel));
    let urlPreview=Constants.ROUTER_LINK_SERVICES_FOCUS+"/#/"+ Constants.ROUTER_LINK_PREVIEW_HISTORY
    window.open(urlPreview, '_blank');
  }

  sendToViewPage(){
    let urlPreview=Constants.ROUTER_LINK_SERVICES_FOCUS+"/#"+ Constants.ROUTER_LINK_VIEW_HISTORY + "/" + this.historyBack.id_reference;
    window.open(urlPreview, '_blank');
  }

  saveHistoryUser(){
      this._historiesService.setHistory(this.historyModel).subscribe(result => {
        if (result.status == 200 && result.success) {
          this.firstTime=true;
          this.historyModel.id=result.id;
          this.historyModel.token=result.token;
          this.historyBack=this.historyModel;
          this.loadingModal=false;
          $("#successfullModalCenter").modal('show');
          if(this.stateHistory==this.stateEnum.revision){
            this._historiesService.sendSaveAdminMail(this.historyModel).subscribe(result => {
              if(result.status==200){
              }
            },err => {
              console.log('Error al enviar correo al admin');
            });
          }
        }
        else{
          this.openModalError()
        }
      });


  }

  postHistoryAdmin(){
    this.historyModel.state=this.stateEnum.publicada;
    this._historiesService.publishHistory(this.historyModel).subscribe(result => {
      if(result.success){
        this.historyBack = this.historyModel;
        this.loadingModal=false;
        $('#successfullModalCenter').modal('show');
        this.historyModel.url=Constants.FOCUS_URL + Constants.ROUTER_LINK_VIEW_HISTORY + "/" + this.historyModel.id;
        if(this.historyModel.email!=null){
          this._historiesService.sendPublicUserMail(this.historyModel).subscribe(result => {
            if(result.status==200){
              //mail enviado correctamente
            }else{
              console.log('Error enviando el mail al usuario, pero historia publicada')
            }
          }, err =>{
            console.log('Error enviando el mail al usuario, pero historia publicada')
          });
        }
      }else{
        this.openModalError()
        console.log('Error publicando la historia')
      }
    }),err => {
      this.openModalError()
    }
  }

  setMailToHistory(){
    this.historyModel.email=this.emailForm.get('email').value;
    this.historyModel.url=Constants.FOCUS_URL;
    this.historyBack=this.historyModel;
    this._historiesService.updateMailHistoryUser(this.historyModel).subscribe(result => {
      this._historiesService.sendSaveUserMail(this.historyModel).subscribe(result => {
        if(result.status==200){
          this.loadingModal=false;
        } else {
          console.log('Error enviando el token de historia')
          this.openModalError()
        }
      },err => {
        console.log('Error enviando el token de historia');          
        this.openModalError()
      });
    },err => {
      console.log('Error al actualizar correo usario');
      this.openModalError()
    });
  }

  
  updateHistory(){
    if(this.isAdmin){
      this._historiesService.updateHistoryAdmin(this.historyModel).subscribe(result => {
        this.updateHistoryResult(result)
      });

    }else{
      this._historiesService.updateHistoryUser(this.historyModel).subscribe(result => {
        this.updateHistoryResult(result)
      });
    }
  

  }

  updateHistoryResult(result){
    if (result.status == 200 && result.success) {
      this.historyBack = this.historyModel;
      if(this.stateHistory==this.stateEnum.revision && (!this.editAdmin && !this.publishing)){
        this.loadingModal=false;
        $('#successfullModalCenter').modal('show');
        this._historiesService.sendSaveAdminMail(this.historyModel).subscribe(result => {
          if(result.status==200){
          }
        });
      }else if(this.publishing && this.isAdmin){
        this.postHistoryAdmin();
      }else{
        this.loadingModal=false;
        $('#successfullModalCenter').modal('show');
      }
    } else {
      this.openModalError()
    }
  }

  addValues(){
    this.type="number";
    document.getElementsByTagName('body')[0].classList.add('no-scroll');
    this._route.navigate([{outlets: {modal: 'visualData/listGraph/'+this.type}}]);
    this.numberGraph=true;
  } 

  onChangePrimaryCategory({ target }){
    var valores = target.value.split(" ");
    var categoryIdSelected = valores[valores.length - 1];
    this.secondCategories.forEach(cat => {
      cat.selectedPrincipal =false;
      if(cat.id==categoryIdSelected){
        cat.selected=false;
        cat.selectedPrincipal=true;
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
    this.loadingModal=false;
    $('#successfullModalCenter').modal('hide');
    this._route.navigateByUrl("/");
  }

  viewHistory(){
    this.loadingModal=false;
    if(this.isAdmin && this.publishing){
      $('#successfullModalCenter').modal('hide');
      this._route.navigate([this.routerLinkViewHistory + '/'+ this.historyModel.id]);
    }
    else if(((!this.isAdmin) && (this.historyBack.state == this.stateEnum.revision)) ||
            ((!this.isAdmin) && this.sendRevision)){
      $('#successfullModalCenter').modal('hide');
      this.goHome();
    }
    else{
      $('#successfullModalCenter').modal('hide');
      this.firstTime=false;
    }
  }

  /**
   * Edit content
   * @param newContent 
   */
  editContent( content: Content, i: number ){

    if ( !this.showAddContent ) {

      this.contentToEdit = content;
      this.actualContent=this.contentToEdit;
      this.posToEdit = i;
      this.actualPosToEdit =this.posToEdit;
      this.showAddContent = true;

    } else if ( ( this.showAddContent ) && ( this.posToEdit!==i ) ){
      this.contentToEditAux = content;
      this.posToEditAux = i;
      this.loadingModal=false;
      $('#questionContPrevious').modal('show');
    }
  }

  /**
   * Confirm edit content
   * @param discardPrevious 
   */
  confirmEditContent(confirm: boolean){
    if ( confirm ) {
      this.showAddContent = false;
      this._cdRef.detectChanges();
      this.contentToEdit=this.contentToEditAux;
      this.posToEdit=this.posToEditAux;
      this.showAddContent = true;
      this._cdRef.detectChanges();
    } else {
      //this.contentToEdit = this.actualContent;
      //this.posToEdit=this.actualPosToEdit;
    }
    this.loadingModal=false;
    $('#questionContPrevious').modal('hide');
  }

  /**
   * Delete content
   * @param newContent 
   */
  deleteContent( content: Content ){
    this.contentToDelete=content;
    if(content.body_content){
      this.deleteBodyCont=true;
    }
    else{
      this.deleteBodyCont=false;
    }
    $('#questionDeleteContent').modal('show');
  }

  /**
   * Confirm delete of a content
   */
  confirmDeleteContent(){
    $('#questionDeleteContent').modal('hide');
    if(this.deleteBodyCont){
      this.contents = this.contents.filter( (e) => {
      return this.contentToDelete!==e;
      });
    }
    else{
      this.contentsHeader = this.contentsHeader.filter( (e) => {
      return this.contentToDelete!==e;
      });
    }
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