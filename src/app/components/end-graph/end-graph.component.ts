import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { GraphService } from '../../services/graph.service';

@Component({
    selector: 'app-end-graph',
    templateUrl: './end-graph.component.html',
    styleUrls: ['./end-graph.component.css']
})
export class EndGraphComponent implements OnInit {
    public chartLegend = true;
    public chartOptions: any = {
        responsive: true
    };
    public chartData: Array<any> = [
        { data: [0], label: 'Series A' }
    ];
    public chartLabels: Array<any> = ['Select Data'];
    public chartColors: Array<any> = [];
    public chartType = 'bar';

    constructor(
        private activatedRoute: ActivatedRoute,
        private location: Location,
        private router: Router,
        private graphservice: GraphService
    ) {
    }

    ngOnInit(): void {
        let id;
        const aux = this.activatedRoute.snapshot.url[0];
        if (aux.toString() !== '/endGraphic') {
            id = this.activatedRoute.snapshot.url[2];
        } else {
            id = this.activatedRoute.snapshot.url[1];
        }
        this.graphservice.getChart(id).subscribe(data => {
            this.chartType = data.type;
            console.log(this.chartType);
            this.chartLabels = data.labels;
            console.log(this.chartLabels);
            this.chartColors = data.colors;
            console.log(this.chartColors);
            this.chartData = data.data;
            console.log(this.chartData);
        });
    }

    goBack(): void {
        this.location.back();
    }
}
