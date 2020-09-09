import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response, Headers } from '@angular/http';
import { Constants } from '../app.constants';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { History, Content } from '../models/History';
import { Category } from '../models/Category';
import { Contents } from '../models/Contents';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class HistoriesService {

  currentUser: any;

  constructor(private http: Http, private _sanitizer: DomSanitizer) {
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
    let fullUrl=Constants.AOD_API_WEB_BASE_URL +Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ENTIRE_HISTORY_BY_TOKEN;
    return this.http.get(fullUrl + '/' + token).map(res => res.json());;
  }

  public getHistoryBackAdminByToken(token: string){
    let fullUrl = Constants.AOD_API_ADMIN_BASE_URL + Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ENTIRE_HISTORY_BY_TOKEN;
		let headers = this.buildRequestHeaders();
    return this.http.get(fullUrl + '/' + token , { headers: headers }).map(res => res.json());;
  }


  public getHistories(): Observable<any>{
    let fullUrl=Constants.AOD_API_WEB_BASE_URL +Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ALL_HISTORIES;
    return this.http.get(fullUrl).map(res => res.json());
  }

  public getHistoryBackUserById(id: string){
    let fullUrl=Constants.AOD_API_WEB_BASE_URL +Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ENTIRE_HISTORY;
    return this.http.get(fullUrl + '/' + id).map(res => res.json());;
  }
  
  public getHistoryBackAdminById(id: string){
    let fullUrl=Constants.AOD_API_ADMIN_BASE_URL +Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ENTIRE_HISTORY;
    let headers = this.buildRequestHeaders();
    return this.http.get(fullUrl + '/' + id,  { headers: headers }).map(res => res.json());;
  }

  public getHistoryBackUserByUrl(url: string){
    let fullUrl=Constants.AOD_API_WEB_BASE_URL +Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ENTIRE_HISTORY_BY_URL;
    return this.http.get(fullUrl + '/' + url).map(res => res.json());;
  }

  public getHistoryBackAdminByUrl(url: string){
    let fullUrl=Constants.AOD_API_ADMIN_BASE_URL +Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ENTIRE_HISTORY_BY_URL;
    let headers = this.buildRequestHeaders();
    return this.http.get(fullUrl + '/' + url,  { headers: headers }).map(res => res.json());;
  }

  public getHistoriesBySearch(text:string, category:string) {
    let fullUrl=Constants.AOD_API_WEB_BASE_URL +Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ALL_HISTORIES;
    let params = new URLSearchParams();
    params.append("text", text)
    params.append("category", category)
    return this.http.get(fullUrl, {search: params  }).pipe(map((res:Response) => res.json()));
  }

  public setHistory(history:History){
    let fullUrl=Constants.AOD_API_WEB_BASE_URL +Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ENTIRE_HISTORY;
    return this.http.put(fullUrl, history).map(res => res.json());
  }

  public getTokenState(token: string){
    let fullUrl=Constants.AOD_API_WEB_BASE_URL +Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ENTIRE_HISTORY + Constants.ROUTER_LINK_TOKEN_STATE;
    return this.http.get(fullUrl + '/' + token).map(res => res.json());;
  }

  public updateHistoryUser(history:History){
    let fullUrl=Constants.AOD_API_WEB_BASE_URL +Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ENTIRE_HISTORY;
    return this.http.post(fullUrl, history).map(res => res.json());;
  }

  public updateHistoryAdmin(history:History){
    let fullUrl=Constants.AOD_API_ADMIN_BASE_URL +Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ENTIRE_HISTORY;
    let headers = this.buildRequestHeaders();
		let requestBodyParams: any = this.createJsonFromString('history', history);
		return this.http.post(fullUrl, JSON.stringify(requestBodyParams), { headers: headers }).map(res => res.json());
  }

  public updateMailHistoryUser(history:History){
    let fullUrl=Constants.AOD_API_WEB_BASE_URL  +Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ENTIRE_HISTORY_AND_EMAIL;
    return this.http.post(fullUrl, history).map(res => res.json());;
  }

  public publishHistory(history: History) {
    let fullUrl = Constants.AOD_API_ADMIN_BASE_URL + Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_ENTIRE_HISTORY;
		let headers = this.buildRequestHeaders();
		let requestBodyParams: any = this.createJsonFromString('history', history);
    return this.http.put(fullUrl, JSON.stringify(requestBodyParams), { headers: headers }).map(res => res.json())
    .catch(err => {
      console.log('Error haciendo el push de la historia:' + err)
        return Observable.throw('Error haciendo el push de la historia');
      });
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

  public getImageByCategoryId(category_id: string){
    let fullUrl=Constants.AOD_API_WEB_BASE_URL +Constants.ROUTER_LINK_FOCUS + Constants.ROUTER_LINK_IMAGE_CATEGORY;
    return this.http.get(fullUrl + '/' + category_id).map(res => res.json());;
  }

  public getInfoContents(element) {

    return new Promise((resolve, reject) => {
      if(element.type_content ==  Contents.graph){
        this.urlGraph(element.visual_content).then( (url) => {
          element.srcGraph = url;
          resolve(element)
        });
      } else if (element.type_content ==  Contents.youtube) {
        this.urlYoutube(element.visual_content).then( (url) => {
          element.srcYoutube = url;
          resolve(element)
        });
      } else if (element.type_content ==  Contents.shareSlides) {
        this.urlSlideShare(element.visual_content).then( (url) => {
          element.srcSlideShare = url;
          resolve(element)
        });
      }else{
        resolve(element)
      }
    });
    
  }

  private urlGraph(id: string) {
    return new Promise((resolve, reject) => {
      let url = Constants.FOCUS_URL+'/charts/embed/'+id;
      resolve(this._sanitizer.bypassSecurityTrustResourceUrl(url));
    });
  }

  private urlYoutube(id: string) {
    return new Promise((resolve, reject) => {
      let url = "https://www.youtube.com/embed/"+id;
      resolve(this._sanitizer.bypassSecurityTrustResourceUrl(url));
    });
  }
  
  private urlSlideShare(id: string) {
    return new Promise((resolve, reject) => {
      let url = "https://www.slideshare.net/slideshow/embed_code/key/"+id;
      resolve(this._sanitizer.bypassSecurityTrustResourceUrl(url));
    });
  }

  getIconCategory(id) {

    if (id === 1261){
      return "https://opendata.aragon.es/static/public/i/temas/12-Justicia.png"
    } else if (id === 1262){
      return "https://opendata.aragon.es/static/public/i/temas/18-Sociedad.png"
    }  else if (id === 1263){
      return "https://opendata.aragon.es/static/public/i/temas/15-Salud.png"
    }  else if (id === 1264){
      return "https://opendata.aragon.es/static/public/i/temas/07-Educacion.png"
    }  else if (id === 1265){
      return "https://opendata.aragon.es/static/public/i/temas/08-Empleo.png"
    }  else if (id === 1266){
      return "https://opendata.aragon.es/static/public/i/temas/02-Comercio.png"
    }  else if (id === 1267){
      return "https://opendata.aragon.es/static/public/i/temas/14-MedioRural.png"
    }  else if (id === 1268){
      return "https://opendata.aragon.es/static/public/i/temas/13-Medioambiente.png"
    }  else if (id === 1269){
      return "https://opendata.aragon.es/static/public/i/temas/11-Industria.png"
    }  else if (id === 1270){
      return "https://opendata.aragon.es/static/public/i/temas/03-Cultura.png"
    }  else if (id === 1271){
      return "https://opendata.aragon.es/static/public/i/temas/22-Vivienda.png"
    }  else if (id === 1272){
      return "https://opendata.aragon.es/static/public/i/temas/19-Transporte.png"
    } 

  }

}