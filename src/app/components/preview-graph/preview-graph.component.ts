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
    data: any;
    columns: string[];

    // Drag
    columnsType: string[];
    chartType: string;

    public columnsData: Array<string> = [];
    public columnsLabel: Array<string> = [];


    // Line Chart
    //////////////////////////////////////
    public lineChartData: Array<any> = [
        { data: [0], label: 'A' }
    ];
    public lineChartLabels: Array<any> = ['No data'];

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
        this.chartType = 'line';
        try {
            dragulaService.dragend.subscribe((value) => {
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
        } catch (error) { }

        if (this.dataservice.dataSelected) {
            this.columnsType = [];
            this.data = this.dataservice.dataSelected;
            this.columns = this.dataservice.headerSelected;

            this.data.forEach(element => {
                let exit = true;
                let newIndex = 0;

                do {
                    exit = true;

                    if (element.length > newIndex) {
                        if (!element[newIndex]) {
                            exit = false;
                            newIndex++;
                        } else {
                            this.columnsType.push(element[newIndex].constructor.name);
                        }
                    } else {
                        this.columnsType.push('undefined');
                    }
                } while (!exit);
            });
        } else {
            // this.router.navigate(['/selectData/']);
            this.columns = ['Need', 'to', 'load', 'data!'];
            this.columnsType = ['String', 'String', 'String', 'String'];
        }
    }

    onDrop(args) {
        // TODO: Comprobar data que entra como undefined siendo que se han cargado los datos y actualizar datos tabla
        /*
        public lineChartData: Array<any> = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
            { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
        ];
        */
        if (this.columnsData && this.columnsData.length !== 0 && this.data) {
            console.log('Dentro de Datos');
            if (this.chartType === 'line' ) {
                this.lineChartData = [];
                this.columnsData.forEach(element => {
                    const indexData = this.columns.findIndex(x => x === element);
                    this.lineChartData.push({ data: this.data[indexData], label: indexData});
                });
            }
        }

        if (this.columnsLabel && this.columnsLabel.length !== 0) {
            console.log('Dentro de Etiquetas');
            if (this.chartType === 'line' ) {
                this.lineChartLabels = [];
                this.columnsLabel.forEach(element => {
                    const indexData = this.columns.findIndex(x => x === element);
                    this.lineChartLabels.push(this.data[indexData]);
                });
            }
        }
        console.log(this.lineChartData);
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

