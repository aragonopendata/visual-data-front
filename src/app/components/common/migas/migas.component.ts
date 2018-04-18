import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { NavigationEnd } from '@angular/router';
import {BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'app-migas',
    templateUrl: './migas.component.html',
    styleUrls: ['./migas.component.css']
})
export class MigasComponent implements OnInit {
    correctPageMigas: boolean;
    listRoutesAccepted: any;
    id =  new BehaviorSubject<string>('data');
    constructor(private router: Router) {
        this.listRoutesAccepted = ['/selectData', '/previewData', '/previewGraph', '/endGraphic'];
        this.router.events
            .filter(event => (event instanceof NavigationEnd))
            .subscribe((routeData: any) => {
                this.id.next(this.router.url.slice(12));
                const pattern = "^" + this.listRoutesAccepted[3] + "/*";
                if ((this.listRoutesAccepted.indexOf(this.router.url) > -1) || new RegExp(pattern).test(this.router.url)) {
                    this.correctPageMigas = true;
                } else {
                    this.correctPageMigas = false;
                }
            });
    }

    ngOnInit() {
    }
}
