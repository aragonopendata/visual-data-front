import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AccordionModule } from 'ngx-accordion';
import { AutoCompleteModule } from 'primeng/primeng';
import { CkanService } from '../../services/ckan.service';
import { GaodcService } from '../../services/gaodc.service';
import { ShareDataService } from '../../services/shareData.service';

@Component({
  selector: 'app-select-data',
  templateUrl: './select-data.component.html',
  styleUrls: ['./select-data.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SelectDataComponent implements OnInit, OnDestroy {

  opened: string;

  listCkan: String[];

  listGaodc: String[];

  ckanPackagesInfo: String;

  gaodcPackagesInfo: String;

  packagesInfo: String;

  ckanPackages: String[];

  gaodcPackages: String[];

  results: string[];

  dataTable: any;

  headerTable: string[];

  loading: boolean[];

  mData: any;

  nextStep: boolean;

  constructor(
    private ckanservice: CkanService,
    private gaodcservice: GaodcService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    public dataservice: ShareDataService,
    private http: Http
  ) {
    this.opened = '';
    this.listCkan = ['Cargando Espere'];
    this.listGaodc = ['Cargando Espere'];
    this.ckanPackages = [];
    this.gaodcPackages = [];
    this.headerTable = ['Cargando'];
    this.loading = [true, true]; // CKAN, GAODC
    this.nextStep = true;
  }

  ngOnInit(): void {
    this.ckanservice.getPackageList().subscribe(data => {
      this.listCkan = data.result;
      this.loading[0] = false;
    });
    this.gaodcservice.getPackageList().subscribe(data => {
        this.listGaodc = [];
        data.forEach(element => {
            this.listGaodc.push(element[1]);
        });
        this.loading[1] = false;
    });
  }

  ngOnDestroy() {
    this.dataservice.type = this.opened;
    this.dataservice.datasetSelected = this.packagesInfo;
    this.dataservice.datasetHeader = this.headerTable;
    this.dataservice.dataset = this.dataTable;
  }

  selectPackage() {
    if (this.opened === 'CKAN') {
        const exist = this.listCkan.find(x => x === this.ckanPackagesInfo);
        if (exist && this.ckanPackages.length === 0) {
            this.loading[0] = true;
            this.ckanPackages.push(this.ckanPackagesInfo);
            console.log(this.ckanPackagesInfo);
            this.ckanservice.getPackageInfo(this.ckanPackages).subscribe(data => {
                this.packagesInfo = this.ckanPackagesInfo;

                console.log('TODO');
                console.log(data);

                this.loading[0] = false;
                /*
                this.data = data.result.results;
                console.log(data);
                this.properties = Object.keys(this.data[0]).map(key => key);
                */
            });
        }
    } else if (this.opened === 'GAODC') {
        const exist = this.listGaodc.findIndex(x => x === this.gaodcPackagesInfo);
        if (exist > -1 && this.ckanPackages.length === 0) {
            this.loading[1] = true;
            this.gaodcPackages.push(this.gaodcPackagesInfo);
            this.gaodcservice.getPackageInfo(exist + 1).subscribe(data => {
                this.headerTable = data[0];
                data.splice(0, 1);
                this.dataTable = data;
                this.packagesInfo = this.gaodcPackagesInfo;
                this.loading[1] = false;
            });
        }
    }
  }

  search(event: any) {
    if (this.opened === 'CKAN') {
        this.results = Object.assign([], this.listCkan).filter(
        item => item.indexOf(event.query) > -1
        );
    } else if (this.opened === 'GAODC') {
        this.results = Object.assign([], this.listGaodc).filter(
            item => item.indexOf(event.query) > -1
        );
    }
  }

  deletePackage() {
    this.ckanPackages.pop();
    this.gaodcPackages.pop();
    this.dataTable = undefined;
  }

  goBack(): void {
    this.router.navigate(['/']);
    // this.location.back();
  }

  whoIsOpen(n: string) {
    console.log('Detectado Apertura de ' + n);
    this.ckanPackages.pop();
    this.gaodcPackages.pop();
    this.opened = n;
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
    if (this.loading.every(elem => elem === false) && this.dataTable) {
        this.router.navigate(['/previewData/']);
    } else {
        this.nextStep = false;
    }
  }
}
