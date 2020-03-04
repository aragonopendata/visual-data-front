import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Constants } from '../app.constants';
import { map } from 'rxjs/operators';



@Injectable()
export class HistoriesService {


  constructor(private http: Http) {
  }

  
  public getCategories() {
    let fullUrl=Constants.AOD_BASE_URL_LOCAL + Constants.SERVER_API_LINK_GA_OD_CORE_PUBLIC +Constants.SERVER_API_LINK_GA_OD_CORE_PUBLIC_PREVIEW;
    console.log(fullUrl);
    let params = new URLSearchParams();
    params.append(Constants.SERVER_API_LINK_GA_OD_CORE_PUBLIC_FILTER_SQL, Constants.SERVER_API_LINK_GA_OD_CORE_PUBLIC_SQL_NIVEL_1);
    params.append(Constants.SERVER_API_LINK_GA_OD_CORE_PUBLIC_VIEW_ID, Constants.SERVER_API_LINK_GA_OD_CORE_PUBLIC_VIEW_ID_NUMBER_TOPICS);
    console.log(params)
    return this.http.get(fullUrl, { search: params }).pipe(map(res => res.json()));
  }
  
  public getHistories(){
    let fullUrl=Constants.AOD_BASE_URL_MOCK + Constants.MOCK_HISTORY ;
    return this.http.get(fullUrl).pipe(map(res => res.json()));
  }

  public getHistory(id:string){
    let fullUrl=Constants.AOD_BASE_URL_MOCK + Constants.MOCK_HISTORY ;
    return this.http.get(fullUrl).pipe(map(res => res.json()));
  }
}
