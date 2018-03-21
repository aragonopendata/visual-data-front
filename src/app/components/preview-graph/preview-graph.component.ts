import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ShareDataService } from '../../services/shareData.service';
//import { ShareEndDataService } from '../../services/shareEndData.service';
import { ChartsModule } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
@Component({
    selector: 'app-preview-graph',
    templateUrl: './preview-graph.component.html',
    styleUrls: ['./preview-graph.component.css']
})
export class PreviewGraphComponent implements OnInit, OnDestroy {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective;

    // Data
    properties: string[];
    data: any;

    // Default variables
    public defaultLineColor: Array<any> = [
        { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public defaultPieColors: Array<any> = [];
    public lineChartLegend = true;
    public lineChartOptions: any = {
        responsive: true
    };

    // Share Info HTML, functions
    color: string;
    indexChangeColor = -1;
    propertyDataSelected: string;
    propertyLabelSelected: string;
    groupValue: boolean;

    // lineChart
    public lineChartData: Array<any> = [
        { data: [0], label: 'Series A' }
    ];
    public lineChartLabels: Array<any> = ['Select Data'];
    public lineChartColors: Array<any> = this.defaultLineColor;
    chartType: string;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        public dataservice: ShareDataService,
        // public endDataService: ShareEndDataService,
        private router: Router
    ) {
        this.groupValue = false;
        window.scrollTo(0, 0);
        this.chartType = 'line';
        try {
            this.data = JSON.parse(JSON.stringify(this.dataservice.data));
            this.properties = Object.keys(this.data[0]).map((key) => key);
            this.createColorArray();
        } catch (error) {
            this.router.navigate(['/selectData/']);
        }
    }

    ngOnInit(): void {
    }

    goBack(): void {
        this.location.back();
    }

    createColorArray() {
       this.defaultPieColors = [{backgroundColor: []}];
        for (let index = 0; index < this.data.length; index++) {
            this.defaultPieColors[0].backgroundColor.push('#' + '0123456789abcdef'.split('').map(function(v, i, a) {
                return i > 5 ? null : a[Math.floor(Math.random() * 16)]; }).join(''));
        }
    }

    select(option: any, sel: any, event: any) {
        // If 0 then is a label data
        if (event === true || event.target.checked === true) {
            if (sel === 0) {
                this.propertyLabelSelected = option;
                this.lineChartLabels = this.getDataArray(option);
                this.propertyDataSelected = undefined;
                this.lineChartData = [{ data: [100], label: 'Series A' }];
                this.groupValue = false;
                this.data = JSON.parse(JSON.stringify(this.dataservice.data));
                this.updateGraph();
            } else if (sel === 1) {
                // If 1 then is a data
                this.propertyDataSelected = option;
                this.lineChartData = [
                    { data: this.getDataArray(option), label: 'Series A' }
                ];
            }
        } else {
            if (sel === 0) {
                this.lineChartLabels = ['Select Data'];
            } else if (sel === 1) {
                this.lineChartData = [{ data: [100], label: 'Series A' }];
            }
        }
    }

    groupBy(event: any) {
        if (this.propertyLabelSelected !== undefined) {
            if (event.target.checked === true) {
                if (this.data.length > 1) {
                    const aux = Object.assign([], this.data);
                    let i = 0, j;
                    while (i < aux.length) {
                        let NaNs = false;
                        const aux3 = aux[i][this.propertyDataSelected];
                        if (isNaN(Number(aux3)) || aux3 === true || aux3 === false) {
                            aux[i][this.propertyDataSelected] = 1;
                            NaNs = true;
                        }
                        j = i + 1;
                        while (j < aux.length) {
                            const aux1 = aux[i][this.propertyLabelSelected];
                            const aux2 = aux[j][this.propertyLabelSelected];
                            if (aux1 === aux2 || aux1 == null && aux2 == null) {
                                if ( NaNs !== true) {
                                    aux[i][this.propertyDataSelected] += aux[j][this.propertyDataSelected];
                                } else {
                                    aux[i][this.propertyDataSelected]++;
                                }
                                aux.splice(j, 1);
                                j--;
                            }
                            j++;
                        }
                        i++;
                    }
                    this.data = Object.assign([], aux);
                    this.updateGraph();
                    this.createColorArray();
                }
            } else {
                this.data = JSON.parse(JSON.stringify(this.dataservice.data));
                this.updateGraph();
                this.createColorArray();
            }
        }
    }

    updateGraph() {
        this.lineChartLabels = this.getDataArray(this.propertyLabelSelected);
        setTimeout(() => {
        if (this.chart && this.chart.chart && this.chart.chart.config) {
            this.chart.chart.config.data.labels = this.lineChartLabels;
            this.chart.chart.update();
            }
        });

        this.lineChartData = [
            { data: this.getDataArray(this.propertyDataSelected), label: 'Series A' }
        ];
    }

    getDataArray(property: any) {
        const aux = [];
        for (let i = 0; i < this.data.length; i++) {
            aux.push(this.data[i][property]);
        }
        return aux;
    }

    changeChart(chart) {
        if (chart === 0) {
            this.lineChartColors = this.defaultLineColor;
            this.chartType = 'line';
        } else if (chart === 1) {
            this.lineChartColors = this.defaultLineColor;
            this.chartType = 'bar';
        } else if (chart === 2) {
            this.lineChartColors = this.defaultPieColors;
            this.chartType = 'pie';
        }
    }

    saveIndex(i) {
        this.indexChangeColor = i;
    }

    saveColor() {
        this.lineChartColors[0].backgroundColor[this.indexChangeColor] = this.color;
        this.updateGraph();
    }

    next() {
        this.router.navigate(['/previewGraph/']);
    }

    ngOnDestroy() {
       /* this.endDataService.ChartData = this.lineChartData;
        this.endDataService.ChartLabels = this.lineChartLabels;
        this.endDataService.ChartColors = this.defaultLineColor;
        this.endDataService.ChartType = this.chartType;*/
    }
}

