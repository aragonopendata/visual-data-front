import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ShareDataService } from '../../services/shareData.service';
import { ChartsModule } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { GraphService } from '../../services/graph.service';
import { DragulaService } from 'ng2-dragula';
@Component({
    selector: 'app-preview-graph',
    templateUrl: './preview-graph.component.html',
    styleUrls: ['./preview-graph.component.css']
})
export class PreviewGraphComponent implements OnInit, OnDestroy {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective;

    // Data
    properties: string[];
    propertiesType: string[];
    data: any;
    chartType: string;

    public columnsData: Array<string> = [];
    public columnsLabel: Array<string> = [];


    // Line Chart
    //////////////////////////////////////
    public lineChartData: Array<any> = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
        { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
    ];
    public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartLegend = true;
    public lineChartType = 'line';

    //////////////////////////////////////

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        public dataservice: ShareDataService,
        private router: Router,
        private graphservice: GraphService,
        private dragulaService: DragulaService
    ) {
        window.scrollTo(0, 0);

        try {
            dragulaService.drop.subscribe((value) => {
                this.onDrop(value.slice(1));
              });
            dragulaService.setOptions('another-bag', {
                copy: function (el, source) {
                    return source.id === 'no-drop';
                },
                accepts: function (el, target, source, sibling) {
                    return target.id !== 'no-drop'; // elements can be dropped in any of the `containers` by default
                }
            });
        } catch (error) {
        }

        try {
            this.data = JSON.parse(JSON.stringify(this.dataservice.columnsGraph));
            this.properties = Object.keys(this.data[0]).map(key => key);
            this.propertiesType = Object.keys(this.data[0]).map(key => this.data[0][key].constructor.name);
            console.log(this.data);
        } catch (error) {
            // this.router.navigate(['/selectData/']);
            this.properties = ['The', 'possibilities', 'are', 'endless!'];
            this.propertiesType = ['String', 'String', 'String', 'String'];
        }
    }

    private onDrop(args) {
        // TODO: Comprobar data que entra como undefined siendo que se han cargado los datos y actualizar datos tabla
        console.log(this.columnsData);
        if (!this.data) {
            console.log(this.data);
            console.log('Cargar Datos');
            return;
        }
        // this.lineChartLabels = [];
        // this.lineChartData = [];
        if (this.columnsData && this.columnsData.length !== 0) {
            this.columnsData.forEach(element => {
                console.log(this.columnsData);
                let aux = [];
                this.data.forEach(d => {
                    //console.log(d);
                    aux = Object.keys(d).map(key => d[key]);
                });
                console.log(aux);
                // this.lineChartLabels.push({ data: [, label: 'Series A'});
                /*for (let index = 0; index < this.data.length; index++) {
                }*/
            });
        }
        if (this.columnsLabel && this.columnsLabel.length !== 0) {
            console.log('aqui');
        }
        // do something
      }

    deleteElement(buffer, index) {
        if (buffer === 1) {
            this.columnsData.splice(index, 1);
        } else if (buffer === 2) {
            this.columnsLabel.splice(index, 1);
        }
    }

    ngOnInit(): void {
    }

    goBack(): void {
        this.location.back();
    }

    changeChart(chart) {
        if (chart === 0) {
            this.chartType = 'line';
        } else if (chart === 1) {
            this.chartType = 'bar';
        } else if (chart === 2) {
            this.chartType = 'pie';
        }
    }

    next() {
        /*
            this.graphservice.saveGraph(this.chartType, this.lineChartLabels, this.lineChartData,
                this.lineChartColors).subscribe(dataLink => {
                this.graphservice.saveProcess(this.dataservice.type, this.dataservice.dataset, this.dataservice.columnsGraph,
                    this.chartType, this.propertyLabelSelected, this.propertyDataSelected,
                    this.groupValue, dataLink.response).subscribe(data => {
                        this.router.navigate(['/endGraphic/' + dataLink.response]);
                });
            });
            */
    }

    ngOnDestroy() {
    }
}

