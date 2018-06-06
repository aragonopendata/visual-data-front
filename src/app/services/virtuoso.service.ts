import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Constants } from '../app.constants';
import { Observable } from 'rxjs/Observable';
// Observable class extensions
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// This Injectable make the calls to the api
@Injectable()
export class VirtuosoService {
  serverURL: string;
  constructor(private router: Router, private http: Http) {
    this.serverURL = Constants.VISUAL_BACK_SERVER_URL;
  }
  // Make the call to get all the package iniformation
  getPackageInfo(data: String[]) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = JSON.stringify({ packages: data[0] });
    return this.http
      .post(this.serverURL + '/services/virtuoso/packageInfo', body, {
        headers: headers
      })
      .map(res => {
        return JSON.parse(res.text());
      })
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }
}
