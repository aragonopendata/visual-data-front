import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
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
  
  public getHistories(): Observable<History[]>{
    return this.http.get('/assets/mocks/histories.json').map(res => res.json());
    ;
  }

  public getHistory( id: number ): Observable<History>{
    return this.http.get('/assets/mocks/histories.json').pipe(
      map( data => data.json().filter(item => item.id === id)));
  }
}