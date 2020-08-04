import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {

  ckanPackagesInfo: string;
  packagesSelCKAN: string = '';
  packagesSelGAODC: string = '';
  packagesSelURL: string = '';
  packagesSelSPARQL: string = '';

  //ckan
  resourcesPackages: any;
  
  //externo
  urlPackagesInfo: string;

  //virtuoso
  virtuosoPackagesInfo: string;

  //GAODC
  gaodcPackagesInfo: string;

  //table
  tableToShow: number = 0;
  dataTable: any;
  headerTable: string[] = [];

  private _opened: string;
  private _isOpened: boolean = false;

  constructor() {}

  get opened(): string{
    return this._opened;
  }
  set opened(value: string){
    this._opened = value;
  }

  get isOpened(): boolean{
    return this._isOpened;
  }
  set isOpened(value: boolean){
    this._isOpened = value;
  }


  reset() {
    this.ckanPackagesInfo = '';
    this.packagesSelCKAN = '';
    this.packagesSelGAODC = '';
    this.packagesSelURL = '';
    this.packagesSelSPARQL = '';

    //ckan
    this.resourcesPackages = null;
  
    //externo
    this.urlPackagesInfo = null;

    //virtuoso
    this.virtuosoPackagesInfo = null;

    //GAODC
    this.gaodcPackagesInfo = null;

    //table
    this.tableToShow = 0;
    this.dataTable = null;
    this.headerTable = [];

    this.opened = null;
    this.isOpened = false;

  }


}
