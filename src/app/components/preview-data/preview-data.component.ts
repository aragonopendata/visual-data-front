import 'rxjs/add/operator/switchMap';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ShareDataService } from '../../services/shareData.service';
import { CkanService } from '../../services/ckan.service';
import { DataTable } from 'primeng/primeng';
import { JsonPipe } from '@angular/common';
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
        this.headerTable = this.dataservice.datasetHeader;
        this.dataTable = this.dataservice.dataset;
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
}
