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

  currentUser: any;

  constructor(private http: Http) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')); 
  }

  private createAuthorizationHeader(headers: Headers) {
		if (this.currentUser && this.currentUser.token && this.currentUser.key) {
			//Authorization header: API_KEY:JWT_Token
			let authorizationHeaderValue = this.currentUser.token + ':' + this.currentUser.key;
      headers.append('Authorization', authorizationHeaderValue);
		}
	}

  private buildRequestHeaders() {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		headers.append('Content-Type', ' application/json');
		return headers;
  }
  
  createJsonFromString(field, value) {
		let JSONElement: any = {};
		JSONElement[field] = value;
		return JSONElement;
	}

  public getCategories(): Observable<Category[]> {
    let fullUrl=Constants.AOD_BASE_URL + Constants.SERVER_API_LINK_GA_OD_CORE_PUBLIC +Constants.SERVER_API_LINK_GA_OD_CORE_PUBLIC_PREVIEW;
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

  public getHistoryBackUserByToken(token: string){
    let fullUrl=Constants.AOD_BASE_API_WEB_FOCUS + Constants.ROUTER_LINK_SERVICES_WEB +Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ENTIRE_HISTORY_BY_TOKEN;
    return this.http.get(fullUrl + '/' + token).map(res => res.json());;
  }

  public getHistoryBackAdminByToken(token: string){
    let fullUrl = Constants.AOD_BASE_API_ADMIN_FOCUS + Constants.ROUTER_LINK_SERVICES_ADMIN + Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ENTIRE_HISTORY_BY_TOKEN;
		let headers = this.buildRequestHeaders();
    return this.http.get(fullUrl + '/' + token , { headers: headers }).map(res => res.json());;
  }


  public getHistories(): Observable<any>{
    let fullUrl=Constants.AOD_BASE_API_WEB_FOCUS + Constants.ROUTER_LINK_SERVICES_WEB +Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ALL_HISTORIES;
    return this.http.get(fullUrl).map(res => res.json());
  }

  public getHistoryBack(id: string){
    let fullUrl=Constants.AOD_BASE_API_WEB_FOCUS + Constants.ROUTER_LINK_SERVICES_WEB +Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ENTIRE_HISTORY;
    return this.http.get(fullUrl + '/' + id).map(res => res.json());;
  }

  public getHistoriesBySearch(text:string, category:string) {
    let fullUrl=Constants.AOD_BASE_API_WEB_FOCUS + Constants.ROUTER_LINK_SERVICES_WEB +Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ALL_HISTORIES;
    let params = new URLSearchParams();
    params.append("text", text)
    params.append("category", category)
    return this.http.get(fullUrl, {search: params  }).pipe(map((res:Response) => res.json()));
  }

  public setHistory(history:History){
    let fullUrl=Constants.AOD_BASE_API_WEB_FOCUS + Constants.ROUTER_LINK_SERVICES_WEB +Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ENTIRE_HISTORY;
    return this.http.put(fullUrl, history).map(res => res.json());
  }

  public getTokenState(token: string){
    let fullUrl=Constants.AOD_BASE_API_WEB_FOCUS + Constants.ROUTER_LINK_SERVICES_WEB +Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ENTIRE_HISTORY + Constants.ROUTER_LINK_TOKEN_STATE;
    console.log(fullUrl);
    return this.http.get(fullUrl + '/' + token).map(res => res.json());;
  }

  public updateHistory(history:History){
    let fullUrl=Constants.AOD_BASE_API_WEB_FOCUS + Constants.ROUTER_LINK_SERVICES_WEB +Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ENTIRE_HISTORY;
    return this.http.post(fullUrl, history).map(res => res.json());;
  }

  public updateMailHistoryUser(history:History){
    let fullUrl=Constants.AOD_BASE_API_WEB_FOCUS + Constants.ROUTER_LINK_SERVICES_WEB +Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ENTIRE_HISTORY_AND_EMAIL;
    console.log(fullUrl)
    return this.http.post(fullUrl, history).map(res => res.json());;
  }

  public publishHistory(history: History) {
    let fullUrl = Constants.AOD_BASE_API_ADMIN_FOCUS + Constants.ROUTER_LINK_SERVICES_ADMIN + Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ENTIRE_HISTORY;
		let headers = this.buildRequestHeaders();
		let requestBodyParams: any = this.createJsonFromString('history', history);
		return this.http.post(fullUrl, JSON.stringify(requestBodyParams), { headers: headers }).map(res => res.json());;
	}

  public sendSaveAdminMail(history:History){
    const headers = new Headers();
    let fullUrl= Constants.VISUAL_BACK_SERVER_URL + Constants.SEND_MAIL_SAVE_ADMIN_HISTORY_PATH;
    headers.append('Content-Type', 'application/json');

    return this.http.post(fullUrl,history,{headers: headers}).map(res => JSON.parse(JSON.stringify(res)))
      .catch(err => {
      console.log('hay eror:' + err)
        return Observable.throw('error envío correo');
      });
  }

  public sendSaveUserMail(history:History){
    const headers = new Headers();
    let fullUrl= Constants.VISUAL_BACK_SERVER_URL + Constants.SEND_MAIL_SAVE_USER_HISTORY_PATH;
    headers.append('Content-Type', 'application/json');

    return this.http.post(fullUrl,history,{headers: headers}).map(res => JSON.parse(JSON.stringify(res)))
      .catch(err => {
      console.log('hay eror:' + err)
        return Observable.throw('error envío correo');
      });
      
  }

  public sendPublicUserMail(history:History){
    const headers = new Headers();
    let fullUrl= Constants.VISUAL_BACK_SERVER_URL + Constants.SEND_MAIL_PUBLIC_USER_HISTORY_PATH;
    headers.append('Content-Type', 'application/json');

    return this.http.post(fullUrl,history,{headers: headers}).map(res => JSON.parse(JSON.stringify(res)))
      .catch(err => {
      console.log('hay eror:' + err)
        return Observable.throw('error envío correo');
      });
      
  }


  public getEmbedUrlSlideShare(url:string){

    let fullUrl= Constants.API_SLIDESHARE_CONVERT_URL_TO_EMBED + "?url=" + url + "&format=json" 
    return this.http.get(fullUrl).map( (res:any) => {
      return res.json()
    });
      
  }

}