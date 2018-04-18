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

    // Make the call to save the info of the graph
    saveGraph(type, labels, data, title, legend, width) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        const body = JSON.stringify(
            { 'type': type, 'labels': labels , 'data':
            data, 'title': title, 'legend': legend , 'width': width}
        );

        return this.http
          .post(Constants.VISUAL_BACK_SERVER_URL + Constants.SAVE_CHART_PATH, body, {
            headers: headers
          })
          .map(res => {
            return JSON.parse(res.text());
          });
    }

    // Make the call to save the process of graph generation
    saveProcess(typeOfData, dataset, chartType, columnsLabel, columnsData, title, legend, widthGraph, chartDataId) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const body = JSON.stringify(
            { 'chartDataId': chartDataId, 'typeOfData': typeOfData, 'dataset': dataset , 'chartType': chartType,
            'columnsLabel': columnsLabel, 'columnsData': columnsData, 'title': title, 'legend': legend,
            'widthGraph': widthGraph }
        );

        return this.http
          .post(Constants.VISUAL_BACK_SERVER_URL + Constants.SAVE_PROCESS_PATH, body, {
            headers: headers
          })
          .map(res => {
            return JSON.parse(res.text());
          });
    }
}
