import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Constants } from '../app.constants';
import 'rxjs/add/operator/map';

@Injectable()
export class ListGraphService {
  constructor(private http: Http) {}

  public getCharts() {
    return this.http
      .get(Constants.VISUAL_BACK_SERVER_URL + Constants.LIST_ALL_CHARTS_PATH)
      .map((res: Response) => res.json());
  }
}
