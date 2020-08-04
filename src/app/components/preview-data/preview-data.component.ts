import 'rxjs/add/operator/switchMap';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ShareDataService } from '../../services/shareData.service';
import { CkanService } from '../../services/ckan.service';
import { DataTable } from 'primeng/primeng';
import { JsonPipe } from '@angular/common';
import { forEach } from '@angular/router/src/utils/collection';
import { Comparator } from '../exportedFunctions/lib';
import { UtilsService } from '../exportedFunctions/utils.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-preview-data',
  templateUrl: './preview-data.component.html',
  styleUrls: ['./preview-data.component.scss']
})
export class PreviewDataComponent implements OnInit, OnDestroy {
  // checked: boolean[] = [];
  dataTable: any;
  //headerTable: string[];
  mData: any;
  //columnsHeaders: any;
  realNameHeaders: any;
  nextStep: any;

  // SortTable
  
  type = 'all';
  openedMenu: boolean;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    public dataservice: ShareDataService,
    public navigationService: NavigationService,
    private utilsService: UtilsService
  ) {

    this.route.params.subscribe(params => {
      this.type=params.type; 
    });

    this.nextStep = true;
    window.scrollTo(0, 0);

    
    this.getOpenedMenu();
  }

  ngOnInit(): void {
    if (
      this.dataservice.datasetHeader &&
      this.dataservice.datasetHeader.length !== undefined &&
      this.dataservice.datasetHeader.length > 0
    ) {
      if ( !this.navigationService.headerTablePreview ) {
        this.navigationService.headerTablePreview = this.dataservice.datasetHeader;
      }
      
      this.dataTable = this.dataservice.dataset;
      this.realNameHeaders = this.navigationService.headerTablePreview.slice(0);
    } else {
      // TODO: Change to return fisrt page
      // this.router.navigate(['/selectData/']);
      this.location.back();
      /*
            this.navigationService.headerTablePreview = ['Datos','De','Prueba']
            this.dataTable = [["Prueba",3,4],["Prueba",2,3]]
            this.realNameHeaders = this.navigationService.headerTablePreview.slice(0);
            */
    }

    setTimeout(() => {
      if ( this.navigationService.fieldOrder ){
        this.preLoadSort();
      }
    }, 100);
    
  }

  preLoadSort(){
    let headers = document.querySelectorAll('#dataTable thead th');

    for(let header of Array.from(headers)) {
      let val = header.children[1];
      let icon = header.children[2];
      if ( val.innerHTML === this.navigationService.fieldOrder){
        header.classList.add('ui-state-active')
        if ( this.navigationService.sortOrder === 1) {
          icon.classList.add('fa-sort-asc')
        }
        if ( this.navigationService.sortOrder === -1) {
          icon.classList.add('fa-sort-desc')
        }
      }
    }
    this.dataTable = this.dataTable.sort(
      Comparator(
        this.navigationService.headerTablePreview.findIndex(element => element === this.navigationService.fieldOrder),
        this.navigationService.sortOrder
      )
    );
  }

  changeSort(event) {
    this.navigationService.fieldOrder = event.field;
    this.navigationService.sortOrder = event.order;
    this.dataTable = this.dataTable.sort(
      Comparator(
        this.navigationService.headerTablePreview.findIndex(element => element === event.field),
        event.order
      )
    );
  }

  ngOnDestroy() {
    if (this.navigationService.headerTablePreview) {
      const headersSelected = [];
      const realHeadersSelected = [];
      const dataSelected = [];
      for (let i = 0; i < this.navigationService.headerTablePreview.length; i++) {
        if (this.navigationService.checked[this.navigationService.headerTablePreview[i]]) {
          headersSelected.push(this.navigationService.headerTablePreview[i]);
          realHeadersSelected.push(this.realNameHeaders[i]);
          const auxArray = [];
          for (let index = 0; index < this.dataTable.length; index++) {
            auxArray.push(this.dataTable[index][i]);
          }
          dataSelected.push(auxArray);
        }
      }
      this.dataservice.headerSelected = headersSelected;
      this.dataservice.realHeadersSelected = realHeadersSelected;
      this.dataservice.dataSelected = dataSelected;
      this.dataservice.fieldOrder = this.navigationService.fieldOrder;
      this.dataservice.sortOrder = this.navigationService.sortOrder;
    }
  }

  isChecked(option){
    if (this.navigationService.checked[option]) {
      return this.navigationService.checked[option];
    } 
    return false
  }

  updateChecked(option, event) {
    if (this.navigationService.checked[option]) {
      this.navigationService.checked[option] = !this.navigationService.checked[option];
    } else {
      this.navigationService.checked[option] = true;
    }
  }

  maxCharacters(data, i) {
    if (data[i]) {
      if (typeof data[i] === 'number') {
        return false;
      } else {
        if (data[i].length <= 80) {
          return false;
        } else {
          return true;
        }
      }
    }
  }

  manteinData(data) {
    this.mData = data;
  }

  next() {
    let con = false;
    for (const key in this.navigationService.checked) {
      if (this.navigationService.checked[key]) {
        con = true;
        break;
      }
    }
    if (con) {
      // this.router.navigate(['/previewGraph/']);
      this.router.navigate([{outlets: {modal: 'visualData/previewGraph/'+this.type}}]);
    } else {
      this.nextStep = false;
    }
  }

  goBack(): void {
    this.location.back();
  }

  generateColumns() {
    this.navigationService.columnsHeaders = [];
    this.navigationService.headerTablePreview.forEach(element => {
      this.navigationService.columnsHeaders.push({ col: element });
    });
  }

  changeColumnsName() {
    this.navigationService.headerTablePreview = [];
    const aux = [];
    this.navigationService.columnsHeaders.forEach(element => {
      this.navigationService.headerTablePreview.push(element.col);
      if (this.navigationService.checked[element.col]) {
        aux[element.col] = true;
      }
    });
    this.navigationService.checked = aux;
  }

  getOpenedMenu(){
    this.openedMenu == false;
    this.utilsService.openedMenuChange.subscribe(value => {
      this.openedMenu = value;
    });
  }

  toggleOpenedMenu() {
      this.utilsService.tooggleOpenedMenu();
  }
}
