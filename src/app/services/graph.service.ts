import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GraphService {

  constructor(private http: Http) { }

  public getCharts() {
    return this.http
      .get(Constants.VISUAL_BACK_SERVER_URL + Constants.LIST_ALL_CHARTS_PATH)
      .map((res: Response) => res.json()).catch((err) => { 
        return Observable.throw("errorConexion");
      });
  }

  public getChart(id) {
    return this.http
      .get(Constants.VISUAL_BACK_SERVER_URL + Constants.GET_CHART_PATH + id)
      .map((res: Response) => res.json()).catch((err) => { 
        return Observable.throw("errorConexion");
      });
  }

  // Make the call to save the info of the graph
  saveGraph(id: string, type: string, labels: object, data: object, title: string, width: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify(
      { 'id': id,
        'type': type, 'labels': labels, 'data':
          data, 'title': title, 'width': width
      }
    );

    return this.http
      .post(Constants.VISUAL_BACK_SERVER_URL + Constants.SAVE_CHART_PATH, body, {
        headers: headers
      })
      .map(res => {
        return JSON.parse(res.text());
      }).catch((err) => { 
        return Observable.throw("errorConexion");
      });
  }

  // Make the call to save the process of graph generation
  saveProcess(id, typeOfData, url, dataset, chartType, columnsLabel, columnsData, title, legend, widthGraph, chartDataId) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify(
      {
        'id': id, 'chartDataId': chartDataId, 'url': url, 'typeOfData': typeOfData, 'dataset': dataset, 'chartType': chartType,
        'columnsLabel': columnsLabel, 'columnsData': columnsData, 'title': title, 'legend': legend,
        'widthGraph': widthGraph
      }
    );


    return this.http
      .post(Constants.VISUAL_BACK_SERVER_URL + Constants.SAVE_PROCESS_PATH, body, {
        headers: headers
      })
      .map(res => {
        return JSON.parse(res.text());
      }).catch((err) => { 
        return Observable.throw("errorConexion");
      });
  }

  // Make the call to save the process of graph generation
  downloadProcess(chartId) {
    return this.http
      .get(Constants.VISUAL_BACK_SERVER_URL + Constants.DOWNLOAD_PROCESS_PATH + chartId)
      .map((res: Response) => res.json()).catch((err) => { 
        return Observable.throw("errorConexion");
      });
  }

  // Make the call to save the process of graph generation
  updateProcess(chartId, type, dataset, labels, data, title, width) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify(
      {
        'id': chartId, 'type': type, 'dataset': dataset, 'labels': labels, 'data':
          data, 'title': title, 'width': width
      }
    );   

    return this.http
      .post(Constants.VISUAL_BACK_SERVER_URL + Constants.SAVE_PROCESS_PATH, body, {
        headers: headers
      })
      .map(res => {
        return JSON.parse(res.text());
      }).catch((err) => { 
        return Observable.throw("errorConexion");
      });
  }
}
