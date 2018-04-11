import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AccordionModule } from 'ng2-accordion';
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

  ckanPackages: String[];

  gaodcPackages: String[];

  results: string[];

  data: any;

  mData: any;

  properties: string[];

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
    this.properties = ['Cargando'];
  }

  ngOnInit(): void {
    this.ckanservice.getPackageList().subscribe(data => {
      this.listCkan = data.result;
    });
    this.gaodcservice.getPackageList().subscribe(data => {
        this.listGaodc = [];
        data.forEach(element => {
            this.listGaodc.push(element[1]);
        });
    });
  }

  ngOnDestroy() {
    if (this.opened === 'CKAN') {
      this.dataservice.type = 'CKAN';
      this.dataservice.dataset = this.ckanPackages;
    }
  }

  selectPackage() {
    if (this.opened === 'CKAN') {
        const exist = this.listCkan.find(x => x === this.ckanPackagesInfo);
        if (exist && this.ckanPackages.length === 0) {
            this.ckanPackages.push(this.ckanPackagesInfo);
            console.log(this.ckanPackagesInfo);
            this.ckanservice.getPackageInfo(this.ckanPackages).subscribe(data => {
                    console.log('TODO');
                    console.log(data);
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
            this.gaodcPackages.push(this.gaodcPackagesInfo);
            console.log(this.gaodcPackagesInfo);
            this.gaodcservice.getPackageInfo(exist + 1).subscribe(data => {
                console.log('TODO');
                console.log(data);
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
    this.data = undefined;
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


  parseInfo(data) {
    if (data !== '""' && data.toString() !== '[]') {
        data = data.replace(/^\"|\"$/g, '');
        return data;
    }
  }

  manteinData(data) {
    this.mData = data;
  }

  next() {
    this.router.navigate(['/previewData/']);
  }
}
