import { Component, OnInit } from '@angular/core';
import { GraphService } from '../../services/graph.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-embed-graph',
    templateUrl: './embed-graph.component.html',
    styleUrls: ['./embed-graph.component.css']
})
export class EmbedGraphComponent implements OnInit {
    // public chartData = [];
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

    constructor(private router: Router, private graphservice: GraphService, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.graphservice.getChart(this.activatedRoute.snapshot.url[2]).subscribe(data => {
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

}
