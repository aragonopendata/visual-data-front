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
export class URLService {
  serverURL: string;
  constructor(private router: Router, private http: Http) {
    this.serverURL = Constants.VISUAL_BACK_SERVER_URL;
  }

  // Make the call to get all the package iniformation
  getPackageInfo(data: String) {
    console.log("URL")
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    const body = JSON.stringify({ packages:  data  });
    return this.http
      .post(this.serverURL + '/services/url/packageInfo', body, {
        headers: headers
      })
      .map(res => {
        return JSON.parse(res.text().toString());
      }).catch((err) => { 
        return Observable.throw("errorConexion");
      });
  }
}
