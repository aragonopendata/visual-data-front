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

@Component({
  selector: 'app-preview-data',
  templateUrl: './preview-data.component.html',
  styleUrls: ['./preview-data.component.scss']
})
export class PreviewDataComponent implements OnInit, OnDestroy {
  checked: boolean[] = [];
  dataTable: any;
  headerTable: string[];
  mData: any;
  columnsHeaders: any;
  realNameHeaders: any;
  nextStep: any;

  // SortTable
  fieldOrder: any;
  sortOrder: any;

  openedMenu: boolean;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    public dataservice: ShareDataService,
    private ckanservice: CkanService,
    private utilsService: UtilsService
  ) {
    this.nextStep = true;
    window.scrollTo(0, 0);
    this.sortOrder = -2;
    this.getOpenedMenu();
  }

  ngOnInit(): void {
    if (
      this.dataservice.datasetHeader &&
      this.dataservice.datasetHeader.length !== undefined &&
      this.dataservice.datasetHeader.length > 0
    ) {
      this.headerTable = this.dataservice.datasetHeader;
      this.dataTable = this.dataservice.dataset;
      this.realNameHeaders = this.headerTable.slice(0);
    } else {
      // TODO: Change to return fisrt page
      // this.router.navigate(['/selectData/']);
      this.location.back();
      /*
            this.headerTable = ['Datos','De','Prueba']
            this.dataTable = [["Prueba",3,4],["Prueba",2,3]]
            this.realNameHeaders = this.headerTable.slice(0);
            */
    }
  }

  changeSort(event) {
    this.fieldOrder = event.field;
    this.sortOrder = event.order;
    this.dataTable = this.dataTable.sort(
      Comparator(
        this.headerTable.findIndex(element => element === event.field),
        event.order
      )
    );
  }

  ngOnDestroy() {
    if (this.headerTable) {
      const headersSelected = [];
      const realHeadersSelected = [];
      const dataSelected = [];
      for (let i = 0; i < this.headerTable.length; i++) {
        if (this.checked[this.headerTable[i]]) {
          headersSelected.push(this.headerTable[i]);
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
      this.dataservice.fieldOrder = this.fieldOrder;
      this.dataservice.sortOrder = this.sortOrder;
    }
  }

  updateChecked(option, event) {
    if (this.checked[option]) {
      this.checked[option] = !this.checked[option];
    } else {
      this.checked[option] = true;
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
    for (const key in this.checked) {
      if (this.checked[key]) {
        con = true;
        break;
      }
    }
    if (con) {
      this.router.navigate(['/previewGraph/']);
    } else {
      this.nextStep = false;
    }
  }

  goBack(): void {
    this.location.back();
  }

  generateColumns() {
    this.columnsHeaders = [];
    this.headerTable.forEach(element => {
      this.columnsHeaders.push({ col: element });
    });
  }

  changeColumnsName() {
    this.headerTable = [];
    const aux = [];
    this.columnsHeaders.forEach(element => {
      this.headerTable.push(element.col);
      if (this.checked[element.col]) {
        aux[element.col] = true;
      }
    });
    this.checked = aux;
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
