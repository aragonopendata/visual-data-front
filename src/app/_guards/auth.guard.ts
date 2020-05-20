import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { Constants } from '../app.constants';

@Injectable()
export class AuthGuard implements CanActivate {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
            const token = JSON.parse(localStorage.getItem('currentUser')).token;
            const isExpired = this.jwtHelper.isTokenExpired(token);
            if (!isExpired) {
                // logged in so return true
                return true;
            }
        }
        // not logged in so redirect to login page
        window.location.href = Constants.AOD_BASE_URL + '/' + Constants.ROUTER_LINK_LOGIN;
        return false;
    }

    probeTokenAdmin() {
        if (localStorage.getItem('currentUser')) {
            const token = JSON.parse(localStorage.getItem('currentUser')).token;
            const isExpired = this.jwtHelper.isTokenExpired(token);
            if (!isExpired) {
                // logged in so return true
                return true;
            }else{
                localStorage.removeItem('currentUser');
            }
        }
        // not logged in so redirect to login page
        window.location.href = Constants.AOD_BASE_URL + '/' + Constants.ROUTER_LINK_LOGIN;
        return false;
    }
}
