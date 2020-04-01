import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response, Headers } from '@angular/http';
import { Constants } from '../app.constants';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { History } from '../models/History';
import { Category } from '../models/Category';
import { filter } from 'rxjs/operator/filter';

@Injectable()
export class HistoriesService {

  constructor(private http: Http) { }

  public getCategories(): Observable<Category[]> {
    let fullUrl=Constants.AOD_BASE_URL_LOCAL + Constants.SERVER_API_LINK_GA_OD_CORE_PUBLIC +Constants.SERVER_API_LINK_GA_OD_CORE_PUBLIC_PREVIEW;
    let params = new URLSearchParams();
    params.append(Constants.SERVER_API_LINK_GA_OD_CORE_PUBLIC_FILTER_SQL, Constants.SERVER_API_LINK_GA_OD_CORE_PUBLIC_SQL_NIVEL_1);
    params.append(Constants.SERVER_API_LINK_GA_OD_CORE_PUBLIC_VIEW_ID, Constants.SERVER_API_LINK_GA_OD_CORE_PUBLIC_VIEW_ID_NUMBER_TOPICS);
    return this.http.get(fullUrl, { search: params }).pipe(
      map(data => {
        return data.json().splice(1,data.json().length).map( element => {
          return new Category(element[0],  element[1], element[2], element[3], element[4], element[5]);
        });
      })
    );
  }
  
  /*
  public getHistories(): Observable<History[]>{
    return this.http.get('/assets/mocks/histories.json').map(res => res.json());
    ;
  }
  */

 public getHistories(): Observable<any>{
  let fullUrl=Constants.AOD_BASE_API_WEB_FOCUS + Constants.ROUTER_LINK_SERVICES_WEB +Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ALL_HISTORIES;
  return this.http.get(fullUrl).map(res => res.json());
}


  public getHistory( id: number ): Observable<History>{
    return this.http.get('/assets/mocks/histories.json').pipe(
      map( data => data.json().filter(item => item.id === id)));
  }

  public setHistory(history:History){
    console.log(history)
    let fullUrl=Constants.AOD_BASE_API_WEB_FOCUS + Constants.ROUTER_LINK_SERVICES_WEB +Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ENTIRE_HISTORY;
    let requestBodyParams: any = history;
    console.log(fullUrl);
    //console.log(JSON.stringify(requestBodyParams))
    return this.http.put(fullUrl, history).map(res => res.json());;
  }

  public getHistoryBack(id: string){
    let fullUrl=Constants.AOD_BASE_API_WEB_FOCUS + Constants.ROUTER_LINK_SERVICES_WEB +Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ENTIRE_HISTORY;
    return this.http.get(fullUrl + '/' + id).map(res => res.json());;
  }

  public updateHistory(history:History){
    console.log(history)
    let fullUrl=Constants.AOD_BASE_API_WEB_FOCUS + Constants.ROUTER_LINK_SERVICES_WEB +Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ENTIRE_HISTORY;
    let requestBodyParams: any = history;
    console.log(fullUrl);
    //console.log(JSON.stringify(requestBodyParams))
    return this.http.post(fullUrl, history).map(res => res.json());;
  }

  public sendAdminMail(history:History){
    const headers = new Headers();
    let fullUrl= Constants.VISUAL_BACK_SERVER_URL + Constants.SEND_MAIL_ADMIN_HISTORY_PATH;
    headers.append('Content-Type', 'application/json');
    console.log('dentro de send email');

    /*
    const body = JSON.stringify({
      title: title
    });
    */

    return this.http.post(fullUrl,history,{headers: headers}).map(res => JSON.parse(JSON.stringify(res)))
      .catch(err => {
      console.log('hay eror:' + err)
        return Observable.throw('errorConexion');
      });
  }

  public sendUserMail(history:History){
    const headers = new Headers();
    let fullUrl= Constants.VISUAL_BACK_SERVER_URL + Constants.SEND_MAIL_USER_HISTORY_PATH;
    headers.append('Content-Type', 'application/json');

    /*
    const body = JSON.stringify({
      title: title,
      email: email
    });
    */

    return this.http.post(fullUrl,history,{headers: headers}).map(res => JSON.parse(JSON.stringify(res)))
      .catch(err => {
      console.log('hay eror:' + err)
        return Observable.throw('errorConexion');
      });
      
  }

}