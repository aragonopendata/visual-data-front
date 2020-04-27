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
export class CkanService {
  serverURL: string;
  constructor(private router: Router, private http: Http) {
    this.serverURL = Constants.VISUAL_BACK_SERVER_URL;
  }

  // Make the call to get the list of all packages
  getPackageList() {
    const headers = new Headers();
    // headers.append('Access-Control-Allow-Origin','*');
    headers.append('Content-Type', 'application/json');
    return this.http
      .get(this.serverURL + '/services/ckan/packageList', { headers: headers })
      .map(res => {
        return res.json();
      })
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }

  // Make the call to get all the package information
  getPackageInfo(data: String[]) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = JSON.stringify({ packages: data });
    return this.http
      .post(this.serverURL + '/services/ckan/packageInfo', body, {
        headers: headers
      })
      .map(res => {
        let result = JSON.parse(res.text().toString());
        try {
          if (result.result.length !== 0 && Object.keys(result.result[0].data[0])[0].includes("!DOCTYPE HTML PUBLIC")) {
            throw "301 html";
          }
        } catch (error) { }

        return result;
      })
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }

  // Make the call to get the resource (The data CSV, PX...)
  getPackageResource(resource) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');;
    const body = JSON.stringify(resource);
    return this.http
      .post(this.serverURL + '/services/ckan/packageResource', body, {
        headers: headers
      })
      .map(res => {
        let result = JSON.parse(res.text().toString());
        try {
          if (result.result.length !== 0 && Object.keys(result.result[0].data[0])[0].includes("!DOCTYPE HTML PUBLIC")) {
            throw "301 html";
          }
        } catch (error) { }

        return result;
      })
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }

}
