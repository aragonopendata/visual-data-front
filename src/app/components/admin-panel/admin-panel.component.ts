import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AutoCompleteModule, InputTextModule, InputTextareaModule } from 'primeng/primeng';
import { GraphService } from '../../services/graph.service';
import { UtilsGraphService } from './../exportedFunctions/utilsChats.util';

declare var jQuery:any;


@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AdminPanelComponent implements OnInit, OnDestroy {

    processData: any;
    checkedRemoveGraph: any;
    dataProcess: any;
    dataset:any;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private router: Router,
        private http: Http,
        private graphService: GraphService,
        private utilsGraphService: UtilsGraphService
    ) {
        // Event that disable the loading screen and update the carousel
        this.utilsGraphService.loading.subscribe(value => {
            if(value == false){
                setTimeout(function(){
                    jQuery("#updater").modal("hide");
                },1000);
            }
        })
    }

    ngOnInit(): void {
        this.graphService.getAllProcess().subscribe(data => {
            data.forEach(element => {
               if(element.isMap){
                   element.chartType = "map"
               }  
            });
            this.processData = data;
        },
        error => {
            console.log("Con Error");
        },);
    }


    refreshGraph(graph){
        jQuery("#updater").modal("show");
        this.updateChart(graph);
    }

    refreshAllGraph(){
        this.processData.forEach(element => {
            jQuery("#updater").modal("show");
            this.updateChart(element);
        });
    }

    openModalRemove(graph){
        this.checkedRemoveGraph = graph;
        jQuery("#deleteModal").modal("show");
    }

    removeGraph(){
        this.graphService.removeGraph(this.checkedRemoveGraph.id).subscribe(data => {
            var pos = this.processData.map(function(e) { return e.id; }).indexOf(data.id);
            if(pos != -1){
                this.processData.splice(pos, 1);
                this.processData = this.processData.slice();
            }
            jQuery("#deleteModal").modal("hide");
        },
        error => {
            console.log("Con Error");
            jQuery("#deleteModal").modal("hide");
        },);
    }


    updateChart(dataProcess) {
        if (dataProcess.typeOfData == 'CKAN') {
            this.utilsGraphService.ckanReloadChart(dataProcess);
        }else if (dataProcess.typeOfData == 'GAODC') {
            this.utilsGraphService.gaodcReloadChart(dataProcess);
        }else if (dataProcess.typeOfData == 'URL') {
                this.utilsGraphService.urlReloadChart(dataProcess);
        }else if (dataProcess.typeOfData == 'VIRTUOSO') {
            jQuery("#updater").modal("hide");
            // Prepare Dataset
            this.dataProcess = dataProcess;
            this.dataset = dataProcess.dataset;
            jQuery("#virtuosoModal").modal('show');
        }
    }

    callUpdateVirtuoso(){
        jQuery("#listModal").modal("show");
        this.dataProcess.dataset = this.dataset;
        this.utilsGraphService.virtuosoReloadChart(this.dataProcess);
    }

    ngOnDestroy() {
       
    }
}
