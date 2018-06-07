import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AccordionModule } from 'ngx-accordion';
import {
  AutoCompleteModule,
  InputTextModule,
  InputTextareaModule
} from 'primeng/primeng';
import { CkanService } from '../../services/ckan.service';
import { GaodcService } from '../../services/gaodc.service';
import { VirtuosoService } from '../../services/virtuoso.service';
import { ShareDataService } from '../../services/shareData.service';
import { URLService } from '../../services/url.service';
import { UtilsGraphService } from './../exportedFunctions/utilsChats.util';
import { parseCSVFile } from '../exportedFunctions/lib';
import { parsePXFile } from '../exportedFunctions/lib';

@Component({
  selector: 'app-select-data',
  templateUrl: './select-data.component.html',
  styleUrls: ['./select-data.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectDataComponent implements OnInit, OnDestroy {
  // Identify what dataset are we using
  opened: string;

  openedWithURL: string;

  tableToShow: number;

  results: string[];

  dataTable: any;

  headerTable: string[];

  // Loading dataset

  loading: boolean[];
  errorResponse: boolean[];
  errorMessage: any;

  // Modal Data if the text is too long

  mData: any;

  // Error mensaje if the data are not load or dont exist

  nextStep: boolean;
  urlError: boolean;
  querryError: boolean;

  // Dropbox Init List

  listCkan: string[];
  listCkanNames: string[];

  listGaodc: string[];

  // Select packages and List packages

  ckanPackagesInfo: string;

  gaodcPackagesInfo: string;

  urlPackagesInfo: string;

  virtuosoPackagesInfo: string;

  packagesInfo: string;

  packagesSelCKAN: string;
  packagesSelURL: string;
  packagesSelSPARQL: string;

  constructor(
    private ckanservice: CkanService,
    private gaodcservice: GaodcService,
    private virtuososervice: VirtuosoService,
    private urlservice: URLService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    public dataservice: ShareDataService,
    public utilsGraphService: UtilsGraphService,
    private http: Http
  ) {
    this.opened = '';
    this.tableToShow = 0;
    this.listCkan = ['Cargando Espere'];
    this.listCkanNames = ['Cargando Espere'];
    this.listGaodc = ['Cargando Espere'];
    this.packagesSelCKAN = '';
    this.packagesSelURL = '';
    this.packagesSelSPARQL = '';
    this.headerTable = [];
    this.loading = [false, false, false, false]; // CKAN, GAODC, URL, VIRTUOSO
    this.errorResponse = [false, false, false, false]; // CKAN, GAODC, URL, VIRTUOSO
    this.nextStep = true;
    this.urlError = false;
    this.querryError = false;
  }

  ngOnInit(): void {
    const aux = [];
    this.ckanservice.getPackageList().subscribe(
      data => {
        data.forEach(element => {
          element.results.forEach(element2 => {
            aux.push({ title: element2.title, name: element2.name });
          });
        });

        aux.sort(function(a, b) {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });

        aux.forEach(element => {
          this.listCkan.push(element.title);
          this.listCkanNames.push(element.name);
        });

        this.listCkan.shift();
        this.listCkanNames.shift();

        this.loading[0] = false;
      },
      error => {
        this.loading[0] = false;
        this.errorResponse[0] = true;
      }
    );
    /*
        this.gaodcservice.getPackageList().subscribe(data => {
            this.listGaodc = [];
            data.forEach(element => {
                this.listGaodc.push(element[1]);
            });
            this.loading[1] = false;
        },
        error => {
            this.loading[1] = false;
            this.errorResponse[1] = true;
        },);
        */
  }

  ngOnDestroy() {
    if (this.opened !== 'URL') {
      this.dataservice.type = this.opened;
    } else {
      if (this.openedWithURL === 'GAODC') {
        this.dataservice.type = this.openedWithURL;
      } else {
        this.dataservice.type = 'URL';
        this.dataservice.url = this.ckanPackagesInfo;
      }
    }
    this.dataservice.datasetSelected = this.packagesInfo;
    this.dataservice.datasetHeader = this.headerTable;
    this.dataservice.dataset = this.dataTable;
  }

  selectPackage(opened: string) {
    this.opened = opened;
    this.tableToShow = 1;
    this.dataTable = null;
    this.packagesSelCKAN = "";
    this.packagesSelURL = "";
    this.packagesSelSPARQL = "";
    if (this.opened === 'CKAN') {
      const exist = this.listCkan.findIndex(x => x === this.ckanPackagesInfo);
      if (exist > -1 && this.ckanPackagesInfo !== '') {
        this.loading[0] = true;

        this.ckanCall(this.listCkanNames[exist], false);
      }
    } else if (this.opened === 'GAODC') {
      const exist = this.listGaodc.findIndex(x => x === this.gaodcPackagesInfo);
      if (exist > -1) {
        // Missing this.packagesSelGAODC != ""
        this.loading[1] = true;

        this.gaodcCall(this.gaodcPackagesInfo, exist + 1);
      }
    } else if (this.opened === 'URL') {
      this.tableToShow = 0;
      if (this.urlPackagesInfo !== '') {
        this.urlError = false;
        this.loading[2] = true;

        // GAODC Check
        const checker = this.checkURL();
        if (checker >= 0) {
          // Correct link
          this.gaodcCall(this.urlPackagesInfo, checker);
        } else if (checker === -1) {
          this.ckanCall(
            this.urlPackagesInfo.substr(50, this.urlPackagesInfo.length - 1),
            true
          );
        } else if (checker === -2) {
          this.urlCall(this.urlPackagesInfo);
        }
      }
    } else if (this.opened === 'VIRTUOSO') {
      if (this.virtuosoPackagesInfo !== '') {
        this.querryError = false;
        this.loading[3] = true;

        this.virtuosoCall(this.virtuosoPackagesInfo);
      }
    }
  }

  // Function that return -1 if the url is invalid,
  // if the url correspond to GAODC, return the number of the pakage
  // if the url correspond to CKAN, return -2
  checkURL() {
    const exist = 0;
    // Check All URLs
    const url_ToCkeck = [
      'https://opendata.aragon.es/GA_OD_Core/preview?view_id=',
      'https://opendata.aragon.es/datos/catalogo/dataset/'
    ];

    // GAODC Test URL
    if (
      this.urlPackagesInfo !== undefined &&
      this.urlPackagesInfo.substr(0, 54) === url_ToCkeck[0]
    ) {
      const n_package = Number(
        this.urlPackagesInfo.substr(54, this.urlPackagesInfo.length - 1)
      );

      if (n_package.toString() !== 'NaN') {
        return n_package;
      } else {
        return -3;
      }
    }
    if (
      this.urlPackagesInfo !== undefined &&
      this.urlPackagesInfo.substr(0, 50) === url_ToCkeck[1]
    ) {
      return -1;
    } else {
      // OTher URL
      return -2;
    }
  }

  ckanCall(namePackage: string, url: boolean) {
    if (url === false) {
      this.packagesSelCKAN = namePackage;
    }
    this.ckanservice.getPackageInfo([namePackage]).subscribe(
      data => {
        this.packagesInfo = namePackage;
        this.errorResponse[0] = false;
        if (data.result.length !== 0) {
          data.result.forEach((element, index) => {
            if (index === 0) {
              this.headerTable = [];
              this.dataTable = [];
            }

            if (element.format === 'PX') {
              const resultado = parsePXFile(element.data);
              this.headerTable = resultado[0];
              this.dataTable = resultado[1];
              this.loading[0] = false;
            } else if (element.format === 'CSV') {
              const resultado = parseCSVFile(element.data, index);
              this.headerTable = resultado[0];
              this.dataTable = this.dataTable.concat(resultado[1]);
              this.loading[0] = false;
            } else {
              this.packagesSelCKAN = '';
              this.loading[0] = false;
              this.errorResponse[0] = true;
            }
            this.loading[2] = false;
          });
        } else {
          this.packagesSelCKAN = '';
          this.loading[0] = false;
          this.errorResponse[0] = true;
        }
      },
      error => {
        this.packagesSelCKAN = '';
        this.loading[0] = false;
        this.errorResponse[0] = true;
      }
    );
  }

  urlCall(namePackage: string) {
    this.errorResponse[2] = false;
    this.errorMessage = '';
    this.packagesSelURL = namePackage;
    this.urlPackagesInfo = namePackage;
    this.urlservice.getPackageInfo(this.packagesSelURL).subscribe(
      data => {
        this.packagesInfo = namePackage;
        if (data.result.length !== 0) {
          if (data.result[0].format === 'PX') {
            const resultado = parsePXFile(data.result[0].data);
            this.headerTable = resultado[0];
            this.dataTable = resultado[1];
            this.loading[2] = false;
          } else if (data.result[0].format === 'CSV') {
            const resultado = parseCSVFile(data.result[0].data, 0);
            this.headerTable = resultado[0];
            this.dataTable = resultado[1];
            this.loading[2] = false;
          } else if (data.result[0].format === 'Error') {
            this.loading[2] = false;
            this.errorResponse[2] = true;
            this.packagesSelURL = '';
            this.errorMessage = data.result[0].data.errorMessage;
          }
        } else {
          this.packagesSelURL = '';
          this.loading[2] = false;
          this.errorResponse[2] = true;
        }
      },
      error => {
        this.packagesSelURL = '';
        this.loading[2] = false;
        this.errorResponse[2] = true;
      }
    );
  }

  gaodcCall(name: String, numberPackage: number) {
    /*
        this.packagesList.push(name);
        this.gaodcservice.getPackageInfo(numberPackage).subscribe(data => {
            this.headerTable = data[0];
            data.splice(0, 1);
            this.dataTable = data;

            this.openedWithURL = 'GAODC';

            this.packagesInfo = numberPackage.toString();
            this.loading[1] = false;
            this.loading[2] = false;
        },
        error => {
           this.loading[1] = false;
           this.loading[2] = false;
           this.errorResponse[1] = true;
        },);
        */
  }

  virtuosoCall(namePackage: string) {
    this.packagesSelSPARQL = this.virtuosoPackagesInfo;

    this.virtuososervice.getPackageInfo([this.packagesSelSPARQL]).subscribe(
      data => {
        this.headerTable = data.head.vars;
        this.dataTable = [];
        this.utilsGraphService.virtuosoPInitialTable(
          data,
          this.headerTable,
          this.dataTable
        );

        this.packagesInfo = this.virtuosoPackagesInfo;
        this.loading[3] = false;
      },
      error => {
        this.packagesSelSPARQL = '';
        this.querryError = true;
        this.loading[3] = false;
      }
    );
  }

  search(event: any) {
    this.results = Object.assign([], this.listCkan).filter(
      item => item.indexOf(event.query) > -1
    );
    /*
        if (this.opened === 'CKAN') {
            this.results = Object.assign([], this.listCkan).filter(
                item => item.indexOf(event.query) > -1
            );
        } else if (this.opened === 'GAODC') {
            this.results = Object.assign([], this.listGaodc).filter(
                item => item.indexOf(event.query) > -1
            );
        }
        */
  }

  deletePackage(name) {
    if (name === 'CKAN') {
      this.packagesSelCKAN = '';
    }
    if (name === 'URL') {
      this.packagesSelURL = '';
    }
    if (name === 'VIRTUOSO') {
      this.packagesSelSPARQL = '';
    }
    this.dataTable = undefined;
  }

  goBack(): void {
    this.router.navigate(['/']);
    // this.location.back();
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

  eventKey(event) {
    console.log(event);
  }

  next() {
    if (
      ((this.opened === 'CKAN' && !this.loading[0]) ||
        (this.opened === 'GAODC' && !this.loading[1]) ||
        (this.opened === 'URL' && !this.loading[2]) ||
        (this.opened === 'VIRTUOSO' && !this.loading[3])) &&
      this.dataTable
    ) {
      this.router.navigate(['/previewData/']);
    } else {
      this.nextStep = false;
    }
  }
}
