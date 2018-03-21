import { Injectable } from '@angular/core';

@Injectable()
export class ShareEndDataService {
    public ChartData: Array<any>;
    public ChartLabels: Array<any>;
    public ChartColors: Array<any>;
    public ChartType: string;

  constructor() {}
}
