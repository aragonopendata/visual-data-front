import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class GraphService {

    constructor(private http: Http) { }

    public getCharts() {
        return this.http
          .get(Constants.VISUAL_BACK_SERVER_URL + Constants.LIST_ALL_CHARTS_PATH)
          .map((res: Response) => res.json());
    }

    public getChart(id) {
        return this.http
          .get(Constants.VISUAL_BACK_SERVER_URL + Constants.GET_CHART_PATH + id)
          .map((res: Response) => res.json());
    }

    // Make the call to get all the package iniformation
    saveGraph(type, labels, data, color) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const body = JSON.stringify(
            { 'type': '"' + type + '"', 'labels': '"' + labels + '"', 'data': '"' + data + '"', 'color': '"' + color + '"' }
        );
        return this.http
          .post(Constants.SAVE_CHART_PATH, body, {
            headers: headers
          })
          .map(res => {
            return res.json();
          });
    }
}
