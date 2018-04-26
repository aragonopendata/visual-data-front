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
import { SpinnerModule, InputTextModule } from 'primeng/primeng';
import { removeDuplicates } from '../exportedFunctions/lib';


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
    public columnsData: Array<string> = [];
    public columnsLabel: Array<string> = [];

    // Charts
    //////////////////////////////////////
    public chartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public chartLegend = true;

    // To save Data

    chartType: string;

    public legend: Array<any>;

    public widthGraph: number;

    public chartData: Array<any> = [
        { data: [0], label: 'A' }
    ];
    public chartLabels: string[] = ['No data'];

    public title: string;


    //////////////////////////////////////


    public changeNumberData: number;

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
        this.changeNumberData = 0;
        this.title = this.dataservice.type;

        this.widthGraph = ((window.screen.width / 2) - 100);
        if (this.widthGraph < 300) {
            this.widthGraph = 300;
        }

        try {
            dragulaService.dragend.subscribe((value) => {
                this.onDrop(value.slice(1));
            });
            dragulaService.drop.subscribe((value) => {
                if(value[2] && value[2].id === 'move-2'){
                    if(this.columnsLabel && this.columnsLabel.length  > 0){
                        this.columnsLabel.splice(0,1);
                    }
                }
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

        // TODO: Delete the next IF
        if (!this.dataservice.dataSelected || this.dataservice.dataSelected.length == 0) {
            //this.router.navigate(['/selectData/']);
            this.dataservice.type = "TEST";
            this.dataservice.dataset = "TEST";
            this.dataservice.headerSelected = ["Datos", "de", "prueba"];
            this.dataservice.dataSelected = [[65, 59, 80, 81, 56, 55, 40, 100 ,100], [20, 2, 3, 81, 4, 55, 5, 20, 40], ["HTP", "ASD", "RDX", "SAS", "PACK", "AA", "DD", "SAS", "AA"]];
            this.dataservice.dataSelected.lenght = 3;
        }
        if (this.dataservice.dataSelected && this.dataservice.dataSelected.length != 0) {
            this.columnsTypeData();
        } else {
            this.router.navigate(['/selectData/']);
        }
    }

    //Get All the element of the first column to the user to move
    columnsTypeData(){
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
    }

    onDrop(args) {
        // Generate new Legend Array if there are new elements in Data array
        if (this.changeNumberData != this.columnsData.length) {
            this.legend = [];
            this.columnsData.forEach(element => {
                this.legend.push({ label: element });
            });
            this.changeNumberData = this.columnsData.length;
        }

        // Prepare the labels for the chart with the data indicate int columnsLabel
        if (this.columnsLabel && this.columnsLabel.length !== 0) {
            this.chartLabels = [];
            this.columnsLabel.forEach(element => {
                const indexData = this.columns.findIndex(x => x === element);
                this.chartLabels = this.data[indexData];
            });
        } else {
            this.defaultsChats(0);
        }

        // Prepare the Data for the chart with the data indicate in columnsData
        if (this.columnsData && this.columnsData.length !== 0 && this.data) {
            this.chartData = [];
            let i = 0;
            this.columnsData.forEach(element => {
                const indexData = this.columns.findIndex(x => x === element);
                this.chartData.push({ data: this.data[indexData], label: this.legend[i++].label });
            });
        } else {
            // Default Values
            this.defaultsChats(1);
        }
        
        // Group Data
        if (this.columnsData && this.columnsLabel && this.columnsData.length > 0 && this.columnsLabel.length > 0) {
            const aux = JSON.parse(JSON.stringify(this.data));
            removeDuplicates(this.chartLabels, this.chartData);
            this.data = aux;
        }
        //

        //The next code is for updating the chart DONT TOUCH
        if (this.chart !== undefined && this.chart.chart != undefined) {
            this.chart.chart.destroy();
            this.chart.chart = 0;

            this.chart.chartType = this.chartType;
            this.chart.datasets = this.chartData;
            this.chart.labels = this.chartLabels;
            this.chart.ngOnInit();
        }
    }

    onEditComplete(event) {
        this.onDrop("refresh");
    }

    //Delete the drag and drop label of the specify column
    deleteElement(buffer, index) {
        if (buffer === 1) {
            this.columnsData.splice(index, 1);
        } else if (buffer === 2) {
            this.columnsLabel.splice(index, 1);
        }
        this.onDrop("refresh");
    }

    ngOnInit(): void {
    }

    goBack(): void {
        this.location.back();
    }

    defaultsChats(type) {
        if (type === 0) {
            this.chartLabels = ['No Data'];
        } else {
            this.chartData = [{ data: [0], label: 'A' }];
            this.chartLabels = ['No data'];
        }
    }

    changeChart(chart) {
        if (chart === 0) {
            this.chartType = 'line';
        } else if (chart === 1) {
            this.chartType = 'bar';
        } else if (chart === 2) {
            this.chartType = 'pie';
        }
        this.onDrop("refresh");
    }

    next() {
        this.graphservice.saveGraph(this.chartType, this.chartLabels, this.chartData, this.title,
            this.widthGraph).subscribe(dataLink => {
                this.graphservice.saveProcess(this.dataservice.type, this.dataservice.datasetSelected,
                    this.chartType, this.columnsLabel, this.columnsData, this.title,
                    this.legend, this.widthGraph, dataLink.id).subscribe(data => {
                        this.router.navigate(['/endGraphic/' + dataLink.id]);
                });
            });
    }

    ngOnDestroy() {
    }
}

