import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AccordionModule } from 'ngx-accordion';
import { AutoCompleteModule, InputTextModule } from 'primeng/primeng';
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

  urlPackagesInfo: String;

  packagesInfo: String;

  ckanPackages: String[];

  gaodcPackages: String[];

  urlPackages: String[];

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
    this.urlPackages = [];
    this.headerTable = ['Cargando'];
    this.loading = [true, true, false]; // CKAN, GAODC
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
                this.packagesInfo = "" + (exist + 1);
                this.loading[1] = false;
            });
        }
    } else if (this.opened === 'URL') {
        this.loading[2] = true;
        let exist = 0;
        // TODO: Check All URLs
        const url_ToCkeck = "https://opendata.aragon.es/GA_OD_Core/preview?view_id=";

        //GAODC Test URL
        if ( this.urlPackagesInfo.substr(0, 54 ) === url_ToCkeck ) {
            exist = 1;
        }else{
            exist = -1;
        }
        
        //TODO: clean this to function
        //GAODC
        if (exist == 1) {
            const n_package = Number(this.urlPackagesInfo.substr(54, this.urlPackagesInfo.length - 1));
            
            if( n_package.toString() !== 'NaN' ){
                //Correct link
                this.urlPackages.push(this.urlPackagesInfo);
                this.gaodcservice.getPackageInfo(n_package).subscribe(data => {
                    this.headerTable = data[0];
                    data.splice(0, 1);
                    this.dataTable = data;

                    //TODO: opened to 'GAODC'
                    
                    this.packagesInfo = n_package.toString();;
                    this.loading[2] = false;
                });
            }
            }else{
            this.loading[2] = false;
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
    this.urlPackages.pop();
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
