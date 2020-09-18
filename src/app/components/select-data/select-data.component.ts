import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { CkanService } from '../../services/ckan.service';
import { GaodcService } from '../../services/gaodc.service';
import { VirtuosoService } from '../../services/virtuoso.service';
import { ShareDataService } from '../../services/shareData.service';
import { URLService } from '../../services/url.service';
import { UtilsGraphService } from './../exportedFunctions/utilsChats.util';
import { parseCSVFile } from '../exportedFunctions/lib';
import { parsePXFile } from '../exportedFunctions/lib';
import { UtilsService } from '../exportedFunctions/utils.service';
import { Constants } from '../../app.constants';
import { NavigationService } from '../../services/navigation.service';
import { AccordionPanelComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-select-data',
  templateUrl: './select-data.component.html',
  styleUrls: ['./select-data.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectDataComponent implements OnInit, OnDestroy {
  // Identify what dataset are we using

  openedWithURL: string;

  results: string[];

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
  listGaodcID: any;

  packagesInfo: string;
  resourceInfo: string; //Selected resource from a package
  formatDataInfo: string; //CSV, PX...

  baseUrlOpenData: string;

  openedMenu: boolean;
  type = 'all';
  isBack:boolean = false;

  gaodcDataExcluded = [78,79,80,81,82,83,84,85,266,267];

  @ViewChild('accordionCkan') accordionCkan: AccordionPanelComponent;
  @ViewChild('accordionOptions') accordionOptions: AccordionPanelComponent;

  @ViewChild('accordionUrl') accordionUrl: AccordionPanelComponent;
  @ViewChild('accordionSPARQL') accordionSPARQL: AccordionPanelComponent;
  @ViewChild('accordionGAODC') accordionGAODC: AccordionPanelComponent;

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
    private http: Http,
    private utilsService: UtilsService,
    public navigationService: NavigationService
  ) {

    this.route.params.subscribe(params => {
      this.type=params.type; 
    });

    if ( !this.navigationService.opened ){
      this.navigationService.opened = 'URL';
    }
    
    //this.tableToShow = 0;
    this.listCkan = ['Cargando Espere'];
    this.listCkanNames = ['Cargando Espere'];
    this.listGaodc = ['Cargando Espere'];
    this.listGaodcID = [];
    
    // this.packagesSelCKAN = '';
    // this.packagesSelURL = '';
    // this.packagesSelSPARQL = '';
    // this.packagesSelGAODC = '';
    
    //this.headerTable = [];
    this.loading = [false, false, false, false]; // CKAN, GAODC, URL, VIRTUOSO
    this.errorResponse = [false, false, false, false]; // CKAN, GAODC, URL, VIRTUOSO
    this.nextStep = true;
    this.urlError = false;
    this.querryError = false;
    this.baseUrlOpenData= Constants.AOD_BASE_URL
    this.getOpenedMenu();
  }

  ngOnInit(): void {
    const aux = [];

    setTimeout(() => {

      if( this.navigationService.isOpened ){
        this.isBack = true;
        if ( this.navigationService.opened === 'CKAN' ) {
          this.accordionCkan.isOpen = true;
        } else {
          this.accordionOptions.isOpen = true;
          if ( this.navigationService.opened === 'URL' ) {
            this.accordionUrl.isOpen = true;
          } else if ( this.navigationService.opened === 'SPARQL' ) {
            this.accordionSPARQL.isOpen = true;
          } else if ( this.navigationService.opened === 'GAODC' ) {
            this.accordionGAODC.isOpen = true;
          }
        }
      }
      
    }, 100);

    //Prepare the ckan list of packages
    this.ckanservice.getPackageList().subscribe(
      data => {
        data.forEach(element => {
          element.results.forEach(element2 => {
            aux.push({ title: element2.title, name: element2.name });
          });
        });

        aux.sort(function (a, b) {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });

        var duplicateTitle = "";
        var i = 0;
        aux.forEach(element => {
          if (element.title == duplicateTitle) {
            i++;
            element.title = element.title.concat(" (" + i + ")");
          } else {
            duplicateTitle = element.title;
            i = 0;
          }

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

    this.gaodcservice.getPackageList().subscribe(data => {
      this.listGaodc = [];
      data.forEach(element => {
        if(!this.gaodcDataExcluded.includes(element[0])){
          this.listGaodc.push(element[1]);
          this.listGaodcID.push(element[0]);
        }
      });
      this.loading[1] = false;
    },
      error => {
        this.loading[1] = false;
        this.errorResponse[1] = true;
      });
  }

  ngOnDestroy() {

    this.dataservice.ckanDataset = '';
    if (this.navigationService.opened !== 'URL') {
      this.dataservice.type = this.navigationService.opened;
    } else {
      if (this.openedWithURL === 'GAODC') {
        this.dataservice.type = this.openedWithURL;
      } else {
        this.dataservice.type = 'URL';
        this.dataservice.url = this.navigationService.ckanPackagesInfo;
      }
    }
    if (this.navigationService.opened === 'CKAN') {
      this.dataservice.ckanDataset = Constants.AOD_BASE_URL + '/' + Constants.ROUTER_LINK_DATA_CATALOG_DATASET + '/' + this.navigationService.packagesSelCKAN;
      this.dataservice.url = this.resourceInfo;
      this.dataservice.datasetSelected = this.formatDataInfo;
    } else {
      this.dataservice.datasetSelected = this.packagesInfo;
    }

    this.dataservice.datasetHeader = this.navigationService.headerTable;
    this.dataservice.dataset = this.navigationService.dataTable;
  }
  //Where to call depending on the user input CKAN, Virtuoso, URL...
  selectPackage(resource = null) {
    this.navigationService.tableToShow = 1;
    this.navigationService.dataTable = null;
    this.navigationService.packagesSelCKAN = '';
    this.navigationService.packagesSelURL = '';
    this.navigationService.packagesSelSPARQL = '';
    this.navigationService.packagesSelGAODC = '';

    this.navigationService.opened = resource!==null ? resource : this.navigationService.opened;
    if (this.navigationService.opened === 'CKAN') {
      this.errorResponse[0] = false;
      const exist = this.listCkan.findIndex(x => x === this.navigationService.ckanPackagesInfo);
      if (exist > -1 && this.navigationService.ckanPackagesInfo !== '') {
        this.loading[0] = true;

        this.ckanCall(this.listCkanNames[exist], false);
      }
    } else if (this.navigationService.opened === 'GAODC') {
      const exist = this.listGaodc.findIndex(x => x === this.navigationService.gaodcPackagesInfo);
      if (exist > -1) {
        // Missing this.packagesSelGAODC != ""
        this.loading[1] = true;
        this.gaodcCall(this.navigationService.gaodcPackagesInfo, this.listGaodcID[exist]);
      }
    } else if (this.navigationService.opened === 'URL') {
      this.navigationService.tableToShow = 0;
      if (this.navigationService.urlPackagesInfo !== '') {
        this.urlError = false;
        this.loading[2] = true;

        // GAODC Check
        const checker = this.checkURL();
        if (checker >= 0) {
          // Correct link
          this.gaodcCall(this.navigationService.urlPackagesInfo, checker);
        } else if (checker === -1) {
          this.ckanCall(
            this.navigationService.urlPackagesInfo.substr(50, this.navigationService.urlPackagesInfo.length - 1),
            true
          );
        } else if (checker === -2) {
          this.urlCall(this.navigationService.urlPackagesInfo);
        } else {
          this.navigationService.packagesSelURL = '';
          this.loading[2] = false;
          this.errorResponse[2] = true;
          this.urlError = true;
        }
      }
    } else if (this.navigationService.opened === 'SPARQL') {
      if (this.navigationService.virtuosoPackagesInfo !== '') {
        this.querryError = false;
        this.loading[3] = true;

        this.virtuosoCall(this.navigationService.virtuosoPackagesInfo); 
      }
    }
  }

  // Function that return -3 if the url is invalid,
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
      this.navigationService.urlPackagesInfo !== undefined &&
      this.navigationService.urlPackagesInfo.substr(0, 54) === url_ToCkeck[0]
    ) {
      const n_package = Number(
        this.navigationService.urlPackagesInfo.substr(54, this.navigationService.urlPackagesInfo.length - 1)
      );

      if (n_package.toString() !== 'NaN') {
        return n_package;
      } else {
        return -3;
      }
    }
    if (
      this.navigationService.urlPackagesInfo !== undefined &&
      this.navigationService.urlPackagesInfo.substr(0, 50) === url_ToCkeck[1]
    ) {
      return -1;
    } else {
      // OTher URL
      const expression = /(aragon\.es|unizar\.es)\//gi;
      const regex = new RegExp(expression);
      if (this.navigationService.urlPackagesInfo && this.navigationService.urlPackagesInfo.match(regex)) {
        return -2;
      } else {
        return -3;
      }
    }
  }

  //Retrieve the list of data from a package
  ckanCall(namePackage: string, url: boolean) {
    if (url === false) {
      this.navigationService.packagesSelCKAN = namePackage;
    }

    this.ckanservice.getPackageInfo([namePackage]).subscribe(
      data => {
        if (data.success == true) {
          let prepareResource = [];
          //This is meant to delete duplicates entries because the data can
          //duplicate itself with diferents formats CSV, PX, XLS...
          data.result.resources.forEach((element, i) => {
            if (element.format.toUpperCase() == "CSV" || element.format.toUpperCase() == "PX") {
              if (!prepareResource[element.name]) {
                prepareResource[element.name] = {};
                prepareResource[element.name].name = element.name;
                prepareResource[element.name].resources = [];
              }
              prepareResource[element.name].resources.push({ url: element.url, format: element.format.toUpperCase() });
            }
          });
          //Now we create a normal array without the duplicate entries
          this.navigationService.resourcesPackages = [];
          for (const key in prepareResource) {
            this.navigationService.resourcesPackages.push(prepareResource[key]);
          }
          this.loading[0] = false;
        } else {
          this.navigationService.packagesSelCKAN = '';
          this.loading[0] = false;
          this.errorResponse[0] = true;
        }
      },
      error => {
        console.log(error);
        this.navigationService.packagesSelCKAN = '';
        this.loading[0] = false;
        this.errorResponse[0] = true;
      }
    );
  }

  //CKAN Function to retrieve the data (CSV, PX...) the user has selected 
  //from resource list from a package of data 
  selectResource(resource) {
    if (resource.resources.length != 0) {
      this.loading[0] = true;
      this.resourceInfo = resource.resources[0].url;
      this.formatDataInfo = resource.resources[0].format;
      this.ckanservice.getPackageResource(resource.resources[0]).subscribe(
        data => {
          this.errorResponse[0] = false;
          if (data.result.length !== 0) {
            data.result.forEach((element, index) => {
              if (index === 0) {
                this.navigationService.headerTable = [];
                this.navigationService.dataTable = [];
              }

              if (element.format === 'PX') {
                const resultado = parsePXFile(element.data);
                this.navigationService.headerTable = resultado[0];
                this.navigationService.dataTable = resultado[1];
                this.loading[0] = false;
              } else if (element.format === 'CSV') {
                const resultado = parseCSVFile(element.data, index);
                this.navigationService.headerTable = resultado[0];
                this.navigationService.dataTable = this.navigationService.dataTable.concat(resultado[1]);
                this.loading[0] = false;
              } else {
                this.navigationService.packagesSelCKAN = '';
                this.loading[0] = false;
                this.errorResponse[0] = true;
              }
              this.loading[2] = false;
            });
          } else {
            this.navigationService.packagesSelCKAN = '';
            this.loading[0] = false;
            this.errorResponse[0] = true;
          }
        },
        error => {
          console.log(error);
          this.navigationService.packagesSelCKAN = '';
          this.loading[0] = false;
          this.errorResponse[0] = true;
        }
      );
    } else {
      this.errorResponse[0] = true;
    }
  }

  urlCall(namePackage: string) {
    this.errorResponse[2] = false;
    this.errorMessage = '';
    this.navigationService.packagesSelURL = namePackage;
    this.navigationService.urlPackagesInfo = namePackage;
    this.urlservice.getPackageInfo(this.navigationService.packagesSelURL).subscribe(
      data => {
        this.packagesInfo = namePackage;
        if (data.result.length !== 0) {
          if (data.result[0].format === 'PX') {
            const resultado = parsePXFile(data.result[0].data);
            this.navigationService.headerTable = resultado[0];
            this.navigationService.dataTable = resultado[1];
            this.loading[2] = false;
          } else if (data.result[0].format === 'CSV') {
            const resultado = parseCSVFile(data.result[0].data, 0);
            this.navigationService.headerTable = resultado[0];
            this.navigationService.dataTable = resultado[1];
            this.loading[2] = false;
          } else if (data.result[0].format === '{"Error": "Not CSV or PX"}') {
            this.loading[2] = false;
            this.errorResponse[2] = true;
            this.navigationService.packagesSelURL = '';
            this.errorMessage = data.result[0].data.errorMessage;
          }
        } else {
          this.navigationService.packagesSelURL = '';
          this.loading[2] = false;
          this.errorResponse[2] = true;
        }
      },
      error => {
        this.navigationService.packagesSelURL = '';
        this.loading[2] = false;
        this.errorResponse[2] = true;
      }
    );
  }

  gaodcCall(name: string, numberPackage: number) {
    this.navigationService.packagesSelGAODC = name;
    this.gaodcservice.getPackageInfo(numberPackage).subscribe(data => {
      this.navigationService.headerTable = data[0];
      data.splice(0, 1);
      this.navigationService.dataTable = data;

      this.openedWithURL = 'GAODC';

      this.packagesInfo = numberPackage.toString();
      this.loading[1] = false;
      this.loading[2] = false;
    },
      error => {
        this.loading[1] = false;
        this.loading[2] = false;
        this.errorResponse[1] = true;
      });
  }

  virtuosoCall(namePackage: string) {
    this.navigationService.packagesSelSPARQL = this.navigationService.virtuosoPackagesInfo;

    this.virtuososervice.getPackageInfo([this.navigationService.packagesSelSPARQL]).subscribe(
      data => {
        this.navigationService.headerTable = data.head.vars;
        this.navigationService.dataTable = [];
        this.utilsGraphService.virtuosoPInitialTable(
          data,
          this.navigationService.headerTable,
          this.navigationService.dataTable
        );

        this.packagesInfo = this.navigationService.virtuosoPackagesInfo;
        this.loading[3] = false;
      },
      error => {
        this.navigationService.packagesSelSPARQL = '';
        this.querryError = true;
        this.loading[3] = false;
      }
    );
  }

  search(event: any) {
    /*
    this.results = Object.assign([], this.listCkan).filter(
      item => item.indexOf(event.query) > -1
    );
    */

    if (this.navigationService.opened === 'CKAN') {
      this.results = Object.assign([], this.listCkan).filter(
        item => item.toLowerCase().indexOf(event.query.toLowerCase()) > -1
      );
    } else if (this.navigationService.opened === 'GAODC') {
      this.results = Object.assign([], this.listGaodc).filter(
        item => item.toLowerCase().indexOf(event.query.toLowerCase()) > -1
      );
    }

  }

  deletePackage(name) {
    if (name === 'CKAN') {
      this.navigationService.packagesSelCKAN = '';
    }
    if (name === 'URL') {
      this.navigationService.packagesSelURL = '';
    }
    if (name === 'SPARQL') { 
      this.navigationService.packagesSelSPARQL = '';
    }
    this.navigationService.dataTable = undefined;
  }

  goBack(): void {
    //this.router.navigate(['/']);
    var type="all";
    this.router.navigate([{outlets: {modal: 'visualData/listGraph/'+type}}]);
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
      ((this.navigationService.opened === 'CKAN' && !this.loading[0]) ||
        (this.navigationService.opened === 'GAODC' && !this.loading[1]) ||
        (this.navigationService.opened === 'URL' && !this.loading[2]) ||
        (this.navigationService.opened === 'SPARQL' && !this.loading[3])) &&
      this.navigationService.dataTable
    ) {
      //this.router.navigate(['/previewData/']);
      this.navigationService.resetPreviewData()
      this.router.navigate([{outlets: {modal: 'visualData/previewData/'+this.type}}]);
    } else {
      this.nextStep = false;
    }
  }

  getOpenedMenu() {
    this.openedMenu = false;
    this.utilsService.openedMenuChange.subscribe(value => {
      this.openedMenu = value;
    });
  }

  toggleOpenedMenu() {
    this.utilsService.tooggleOpenedMenu();
  }

  whoIsOpen(ele,who) {

    if( ele.isOpen) {
      if( this.navigationService.opened !== who) {
        this.resetData();
        this.navigationService.gaodcPackagesInfo = "";
      }
      this.navigationService.isOpened = false;
      if ( this.accordionCkan.isOpen || this.accordionGAODC || this.accordionSPARQL || this.accordionUrl ){
        this.navigationService.isOpened = true;
      }
  
      if ( who === 'CKAN'){
        this.accordionUrl.isOpen = false;
        this.accordionSPARQL.isOpen = false;
        this.accordionGAODC.isOpen = false;
      }
      
      this.navigationService.opened = who;   
    }
     
    
  }

  resetData(onlyDataTable = false) {

    if( !this.isBack ){
      if ( onlyDataTable ){
        this.navigationService.dataTable = null;
      } else {
        this.navigationService.dataTable = null;
        if ( this.navigationService.opened === 'GAODC' ) {
          this.navigationService.packagesSelGAODC = '';
        } if ( this.navigationService.opened === 'CKAN' ) {
          this.navigationService.packagesSelCKAN = '';
        }
      }
      
    }
    this.isBack = false;
  
  }
}
