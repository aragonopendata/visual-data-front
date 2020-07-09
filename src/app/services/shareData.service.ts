import { Injectable } from '@angular/core';

@Injectable()
export class ShareDataService {
  public type: any;
  public url: any;
  public datasetHeader: any;
  public dataset: any;
  public datasetSelected: any;
  public ckanDataset: any;
  
  public columnsGraph: any;

  public headerSelected: any;
  public realHeadersSelected: any;
  public dataSelected: any;

  public fieldOrder: any;
  public sortOrder: any;

  constructor() {}
}
