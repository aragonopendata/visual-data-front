import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AccordionModule } from 'ngx-accordion';
import { AutoCompleteModule, InputTextModule, InputTextareaModule } from 'primeng/primeng';
import { CkanService } from '../../services/ckan.service';
import { GaodcService } from '../../services/gaodc.service';
import { VirtuosoService } from '../../services/virtuoso.service';
import { ShareDataService } from '../../services/shareData.service';
import { UtilsGraphService } from './../exportedFunctions/utilsChats.util';

@Component({
    selector: 'app-select-data',
    templateUrl: './select-data.component.html',
    styleUrls: ['./select-data.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class SelectDataComponent implements OnInit, OnDestroy {

    // Identify what dataset are we using
    opened: string;

    openedWithURL: string;

    results: string[];

    dataTable: any;

    headerTable: string[];

    // Loading dataset

    loading: boolean[];
    errorResponse: boolean[];

    //Modal Data if the text is too long

    mData: any;

    //Error mensaje if the data are not load or dont exist

    nextStep: boolean;
    urlError: boolean;
    querryError: boolean;

    // Dropbox Init List

    listCkan: string[];

    listGaodc: string[];

    // Select packages and List packages

    ckanPackagesInfo: string;

    gaodcPackagesInfo: string;

    urlPackagesInfo: string;

    virtuosoPackagesInfo: string;

    packagesInfo: String;

    packagesList: String[];

    constructor(
        private ckanservice: CkanService,
        private gaodcservice: GaodcService,
        private virtuososervice: VirtuosoService,
        private route: ActivatedRoute,
        private location: Location,
        private router: Router,
        public dataservice: ShareDataService,
        public utilsGraphService: UtilsGraphService,
        private http: Http
    ) {
        this.opened = '';
        this.listCkan = ['Cargando Espere'];
        this.listGaodc = ['Cargando Espere'];
        this.packagesList = [];
        this.headerTable = [];
        this.loading = [true, true, false, false]; // CKAN, GAODC, URL, VIRTUOSO
        this.errorResponse = [false, false, false, false]; // CKAN, GAODC, URL, VIRTUOSO
        this.nextStep = true;
        this.urlError = false;
        this.querryError = false;
    }

    ngOnInit(): void {
        this.ckanservice.getPackageList().subscribe(data => {
            this.listCkan = data.result;
            this.loading[0] = false;
        },
        error => {
           this.loading[0] = false;
           this.errorResponse[0] = true;
        },);
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
    }

    ngOnDestroy() {
        if(this.opened !== 'URL'){
            this.dataservice.type = this.opened;
        }else{
            this.dataservice.type = this.openedWithURL;
        }
        this.dataservice.datasetSelected = this.packagesInfo;
        this.dataservice.datasetHeader = this.headerTable;
        this.dataservice.dataset = this.dataTable;
    }

    selectPackage() {
        if (this.opened === 'CKAN') {
            const exist = this.listCkan.find(x => x === this.ckanPackagesInfo);
            if (exist && this.packagesList.length === 0) {
                this.loading[0] = true;

                this.ckanCall(this.ckanPackagesInfo);
            }
        } else if (this.opened === 'GAODC') {
            const exist = this.listGaodc.findIndex(x => x === this.gaodcPackagesInfo);
            if (exist > -1 && this.packagesList.length === 0) {
                this.loading[1] = true;

                this.gaodcCall(this.gaodcPackagesInfo, exist + 1);
            }
        } else if (this.opened === 'URL') {
            this.urlError = false;
            this.loading[2] = true;

            //GAODC Check
            const checker = this.checkURL();
            if (checker >= 0) {
                    //Correct link
                    this.gaodcCall(this.urlPackagesInfo, checker);
            } else if(checker == -2){
                this.ckanCall(this.urlPackagesInfo.substr(50, this.urlPackagesInfo.length - 1));
            } else {
                this.urlError = true;
                this.loading[2] = false;
            }
        } else if (this.opened === 'VIRTUOSO') {
            this.querryError = false;
            this.loading[3] = true;
        
            this.virtuosoCall(this.virtuosoPackagesInfo);
        }
    }

    // Function that return -1 if the url is invalid,
    // if the url correspond to GAODC, return the number of the pakage
    // if the url correspond to CKAN, return -2
    checkURL() {
        let exist = 0;
        // TODO: Check All URLs
        const url_ToCkeck = ["https://opendata.aragon.es/GA_OD_Core/preview?view_id=", 
                             "https://opendata.aragon.es/datos/catalogo/dataset/"];

        //GAODC Test URL
        if (this.urlPackagesInfo != undefined && this.urlPackagesInfo.substr(0, 54) === url_ToCkeck[0]) {
            const n_package = Number(this.urlPackagesInfo.substr(54, this.urlPackagesInfo.length - 1));

            if (n_package.toString() !== 'NaN') {
                return n_package;
            }else{
                return -1;
            }
        } else if (this.urlPackagesInfo != undefined && this.urlPackagesInfo.substr(0, 50) === url_ToCkeck[1]) { //CKAN Test URL
            return -2;
        } else{
            return -1;
        }
    }

    ckanCall(namePackage: string){
        this.packagesList.push(namePackage);
        this.ckanPackagesInfo = namePackage;
        this.ckanservice.getPackageInfo(this.packagesList).subscribe(data => {
            this.packagesInfo = namePackage;

            console.log('TODO');
            console.log(data);

            if (data.result[0].format == "PX") {
                this.parsePXFile(data.result[0].data);
            }

            this.loading[0] = false;
            this.loading[2] = false;
        },
        error => {
           this.packagesList.pop();
           this.loading[0] = false;
           this.loading[2] = false;
           this.errorResponse[0] = true;
        },);
    }


    parsePXFile(data){
        var headersNames = [];
        var headersOrder = [];
        var values = [];
        var dataTable = [];
        var parse = "init";
        data = data.replace(/\s+/g, ' ').trim();

        //Prepare the Headers Names
        parse = data.match(/HEADING=[.\s\S]*?;/);
        parse = parse[0].split("=").pop().slice(0, -1);
        headersNames = parse.replace(/",\s?\S?"/g,"\"############\"").split('############');
        headersNames.forEach((element,index) => {
            headersNames[index] = element.replace(/"/g, '').replace(/^\s+/g, '');
        });

        //GET all Headers AND Descriptions of the px file
        while(parse != null){
            parse = data.match(/VALUES\(.*?\)=[.\s\S]*?;/);
            if(parse != null){
                parse = parse[0].slice(7, -1);
                var aux3 = parse.match(/[.\s\S]*?\)/).toString();
                aux3 = aux3.slice(0, aux3.length-1);
                aux3 = aux3.replace(/"/g, '').replace(/^\s+/g, '');
                headersOrder.push(aux3);
                parse = parse.split("=").pop().slice(0, -1);
                
                var aux2 = parse.replace(/",\s?\S?"/g,"\"############\"").split('############');
                aux2.forEach((element,index) => {
                    aux2[index] = element.replace(/"/g, '').replace(/^\s+/g, '');
                });
                values.push(aux2);
                
                data = data.split(parse).pop();
            }
        }

        this.headerTable = values[values.length-1];

        //Prepare Table Data
        parse = data.match(/DATA=[.\s\S]*?;/);
        parse = parse[0].split("= ").pop().slice(0, -1);
        var aux = parse.split(" "); 

        aux.forEach((element,index) => {
            if(element == "\".\"")
                aux[index] = null;
        });

        dataTable = this.chuck(aux, values[values.length - 1].length);

        console.log("Nombres de cabecera");
        console.log(headersNames);
        console.log("Orden de datos extraidos con respecto a cabecera"); // TODO: no se parsea aun bien el headerORder
        console.log(headersOrder);
        console.log("Cabecera");
        console.log(values);
        console.log("Datos de la tabla");
        console.log(dataTable);
        this.dataTable = dataTable;
    }

    // split array into chucks of the size parameter
    chuck(array, size) {
        var results = [];
        while (array.length) {
          results.push(array.splice(0, size));
        }
        return results;
    };

    gaodcCall(name: String, numberPackage : number){
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
    }

    virtuosoCall(namePackage: string){
        this.packagesList.push(this.virtuosoPackagesInfo);

        this.virtuososervice.getPackageInfo(this.packagesList).subscribe(data => {
            this.headerTable = data.head.vars;
            this.dataTable = [];
            this.utilsGraphService.virtuosoPInitialTable(data,this.headerTable,this.dataTable);
            
            this.packagesInfo = this.virtuosoPackagesInfo;
            this.loading[3] = false;
        },
        error => {
            this.packagesList.pop();
            this.querryError = true;
            this.loading[3] = false;
        },);
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
        this.packagesList.pop();
        this.dataTable = undefined;
    }

    goBack(): void {
        this.router.navigate(['/']);
        // this.location.back();
    }

    whoIsOpen(n: string) {
        console.log('Detectado Apertura de ' + n);
        this.deletePackage()
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
