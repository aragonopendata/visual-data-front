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
    saveGraph(type, labels, data, color) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        color[0].backgroundColor = color[0].backgroundColor.toString();

        for (let index = 0; index < labels.length; index++) {
            if (!labels[index]) {
                labels[index] = 'undefined';
            }
        }
        console.log(labels);
        const body = JSON.stringify(
            { 'type': type, 'labels': labels , 'data':
            data, 'colors': color }
        );

        return this.http
          .post(Constants.VISUAL_BACK_SERVER_URL + Constants.SAVE_CHART_PATH, body, {
            headers: headers
          })
          .map(res => {
            return res.json();
          });
    }

    // Make the call to save the process of graph generation
    saveProcess(typeOfData, dataset, columnsGraph, chartType, propertyLabelSelected, propertyDataSelected, groupValue, chartDataId) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const body = JSON.stringify(
            { 'typeOfData': typeOfData, 'dataset': dataset , 'chartType': chartType,
            'columnLabels': propertyLabelSelected, 'columnData': propertyDataSelected, 'groupValue': groupValue,
            'chartDataId': chartDataId}
        );

        console.log(body);

        return this.http
          .post(Constants.VISUAL_BACK_SERVER_URL + Constants.SAVE_PROCESS_PATH, body, {
            headers: headers
          })
          .map(res => {
            return res.json();
          });
    }
}
