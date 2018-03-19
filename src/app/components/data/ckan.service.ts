import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Http, Headers, RequestOptions} from '@angular/http';

import { Config } from '../../config'

//This Injectable make the calls to the api
@Injectable()
export class CkanService {
    serverURL: string;
    constructor(private router: Router,private http:Http, private config:Config){
      this.serverURL = config.serverURL;
    }

    //Make the call to get the list of all packages
    getPackageList() {
      var headers = new Headers();
      //headers.append('Access-Control-Allow-Origin','*');
      headers.append('Content-Type', 'application/json');
      return this.http.get(this.serverURL +'/services/ckan/packageList' , {headers: headers}).map(res => { 
          return res.json();
      });
    }

    //Make the call to get all the package iniformation
    getPackageInfo(data: String[]){
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      var body = JSON.stringify({"packages": "\"" + data+ "\""});
      return this.http.post(this.serverURL +'/services/ckan/packageInfo', body, {headers: headers}).map(res => {
            return res.json();
      });
    }
};