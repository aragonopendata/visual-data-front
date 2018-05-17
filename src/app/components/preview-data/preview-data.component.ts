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
@Component({
    selector: 'app-preview-data',
    templateUrl: './preview-data.component.html',
    styleUrls: ['./preview-data.component.css']
})
export class PreviewDataComponent implements OnInit, OnDestroy {
    checked: boolean[] = [];
    dataTable: any;
    headerTable: string[];
    mData: any;
    columnsHeaders: any;


    // SortTable
    sortF: any;
    sortO: any;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private router: Router,
        public dataservice: ShareDataService,
        private ckanservice: CkanService
    ) {
        window.scrollTo(0, 0);
    }

    ngOnInit(): void {
        if(this.dataservice.datasetHeader && this.dataservice.datasetHeader.length != undefined && this.dataservice.datasetHeader.length > 0){
            this.headerTable = this.dataservice.datasetHeader;
            this.dataTable = this.dataservice.dataset;
        }else{
            // TODO: Change to return fisrt page
            //this.router.navigate(['/selectData/']);
            this.headerTable = ['Datos','De','Prueba']
            this.dataTable = [["Prueba",3,4],["Prueba",2,3]]
        }
    }

    changeSort(event) {

        this.dataTable = this.dataTable.sort(this.Comparator(this.headerTable.findIndex(element => element == event.field), event.order));
    }

    Comparator(index, order) {
        return function(a, b) {
            if (a[index] < b[index]) return (order == 1) ? 1 : -1;
            if (a[index] > b[index]) return (order == 1) ? -1 : 1;
            return 0;
        }
    }

    ngOnDestroy() {
        if (this.headerTable) {
            const headersSelected = [];
            const dataSelected = [];
            for (let i = 0; i < this.headerTable.length; i++) {
                if (this.checked[this.headerTable[i]]) {
                    headersSelected.push(this.headerTable[i]);
                    const auxArray = [];
                    for (let index = 0; index < this.dataTable.length; index++) {
                        auxArray.push(this.dataTable[index][i]);
                    }
                    dataSelected.push(auxArray);
                }
            }
            this.dataservice.headerSelected = headersSelected;
            this.dataservice.dataSelected = dataSelected;
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
        this.router.navigate(['/previewGraph/']);
    }

    goBack(): void {
        this.location.back();
    }

    generateColumns(){
        this.columnsHeaders = [];
        this.headerTable.forEach(element => {
            this.columnsHeaders.push({col:element});
        });
    }

    changeColumnsName(){
        this.headerTable=[];
        this.columnsHeaders.forEach(element => {
            this.headerTable.push(element.col);
        });
    }
}
