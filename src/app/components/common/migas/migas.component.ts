import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-migas',
    templateUrl: './migas.component.html',
    styleUrls: ['./migas.component.css']
})
export class MigasComponent implements OnInit {
    correctPageMigas: boolean;
    listRoutesAccepted: any;
    constructor(private router: Router) {
        this.listRoutesAccepted = ['/selectData', '/previewData', '/previewGraph', '/endGraphic'];
        this.router.events
        .filter(event => (event instanceof NavigationEnd))
            .subscribe((routeData: any) => {
                    if (this.listRoutesAccepted.indexOf(this.router.url) > -1) {
                        this.correctPageMigas = true;
                    } else {
                        this.correctPageMigas = false;
                    }
            });
    }

    ngOnInit() {
    }
}
