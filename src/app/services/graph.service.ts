import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map'

import { Observable } from 'rxjs/Observable';

@Injectable()
export class GraphService {
  constructor(private http: Http) { }

  public getCharts(pages, sizeOfPAges) {
    return this.http
      .get(
        Constants.VISUAL_BACK_SERVER_URL +
        Constants.LIST_ALL_CHARTS_PATH +
        '/?page=' +
        pages +
        '&size=' +
        sizeOfPAges 
      )
      .map((res: Response) => res.json())
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }

  public getChartsByType(pages, sizeOfPAges, type) {
    return this.http
      .get(
        Constants.VISUAL_BACK_SERVER_URL +
        Constants.LIST_TYPE_CHARTS_PATH +
        '/?page=' +
        pages +
        '&size=' +
        sizeOfPAges +
        '&type='+
        type
      )
      .map((res: Response) => res.json())
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }

  public getChart(id) {
    return this.http
      .get(Constants.VISUAL_BACK_SERVER_URL + Constants.GET_CHART_PATH + id)
      .map((res: Response) => res.json())
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }

  // Make the call to save the info of the graph
  saveGraph(
    id: string,
    type: string,
    isMap: boolean,
    labels: object,
    number: any,
    data: object,
    descrip: object,
    title: string,
    width: number
  ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify({
      id: id,
      type: type,
      isMap: isMap,
      labels: labels,
      number: number,
      data: data,
      descriptions: descrip,
      title: title,
      width: width
    });

    return this.http
      .post(
        Constants.VISUAL_BACK_SERVER_URL + Constants.SAVE_CHART_PATH,
        body,
        {
          headers: headers
        }
      )
      .map(res => {
        return JSON.parse(res.text());
      })
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }

  // Make the call to save the process of graph generation
  saveProcess(
    id,
    typeOfData,
    url,
    dataset,
    ckanDataset,
    chartType,
    isMap,
    numberchart,
    columnsLabel,
    columnsData,
    columnsDescrip,
    fieldOrder,
    sortOrder,
    title,
    legend,
    widthGraph,
    chartDataId,
    topRows,
    groupRow,
    axisXActivator
  ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify({
      id: id,
      chartDataId: chartDataId,
      url: url,
      typeOfData: typeOfData,
      dataset: dataset,
      ckanDataset: ckanDataset,
      chartType: chartType,
      isMap: isMap,
      numberchart: numberchart,
      columnsLabel: columnsLabel,
      columnsData: columnsData,
      columnsDescription: columnsDescrip,
      fieldOrder: fieldOrder,
      sortOrder: sortOrder,
      title: title,
      legend: legend,
      widthGraph: widthGraph,
      topRows: topRows,
      groupRow: groupRow,
      axisXActivator: axisXActivator
    });
    
    return this.http
      .post(
        Constants.VISUAL_BACK_SERVER_URL + Constants.SAVE_PROCESS_PATH,
        body,
        {
          headers: headers
        }
      )
      .map(res => {
        return JSON.parse(res.text());
      })
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }

  // Make the call to save the process of graph generation
  downloadProcess(chartId) {
    return this.http
      .get(
        Constants.VISUAL_BACK_SERVER_URL +
        Constants.DOWNLOAD_PROCESS_PATH +
        chartId
      )
      .map((res: Response) => res.json())
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }

  // Make the call to save the process of graph generation
  updateProcess(chartId, type, dataset, labels, data, title, width) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify({
      id: chartId,
      type: type,
      dataset: dataset,
      labels: labels,
      data: data,
      title: title,
      width: width
    });

    return this.http
      .post(
        Constants.VISUAL_BACK_SERVER_URL + Constants.SAVE_PROCESS_PATH,
        body,
        {
          headers: headers
        }
      )
      .map(res => {
        return JSON.parse(res.text());
      })
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }

  // Make the call to save the process of graph generation
  getAllProcess() {
    return this.http
      .get(
        Constants.VISUAL_BACK_SERVER_URL + Constants.DOWNLOAD_PROCESS_ALL_PATH
      )
      .map((res: Response) => res.json())
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }

  // Make the call to remove the graph
  removeGraph(idProcess) {
    return this.http
      .get(
        Constants.VISUAL_BACK_SERVER_URL +
        Constants.REMOVE_GRAPH_PATH +
        idProcess
      )
      .map((res: Response) => res.json())
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }

  // Make the call to remove the graph
  saveTitleChart(idProcess, title) {
    return this.http
      .get(
        Constants.VISUAL_BACK_SERVER_URL +
        Constants.SAVE_GRAPH_TITLE_PATH +
        idProcess + "?title=" +
        title
      )
      .map((res: Response) => res.json())
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }
}
