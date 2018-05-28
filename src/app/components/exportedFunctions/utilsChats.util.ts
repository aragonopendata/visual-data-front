import { removeDuplicates } from '../exportedFunctions/lib';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { GraphService } from '../../services/graph.service';
import { CkanService } from '../../services/ckan.service';
import { GaodcService } from '../../services/gaodc.service';
import { VirtuosoService } from '../../services/virtuoso.service';
import { URLService } from '../../services/url.service';
import { parseCSVFile } from '../exportedFunctions/lib';
import { parsePXFile } from '../exportedFunctions/lib';
import { Comparator } from '../exportedFunctions/lib';
import { reducerMapPoints } from '../exportedFunctions/lib';
import { prepareArrayXY } from '../exportedFunctions/lib';

@Injectable()
export class UtilsGraphService {

  public loading = new Subject<boolean>();

  constructor(
    private listGraphService: GraphService,
    private ckanService: CkanService,
    private gaodcService: GaodcService,
    private virtuosoService: VirtuosoService,
    private urlService: URLService,
  ) { }

  //Process to update all the charts
  prepareAndSave(dataProcess, headerTable, dataTable){
          const dataSelected = [];
          let checkedData = [];
          if(dataProcess.isMap){
            checkedData = dataProcess.columnsLabel.concat(dataProcess.columnsDescription)
            checkedData = checkedData.concat(dataProcess.columnsData)
          }
          else
            checkedData = dataProcess.columnsLabel.concat(dataProcess.columnsData);

          if(dataProcess.sortOrder != -2)
            dataTable= dataTable.sort(Comparator(headerTable.findIndex(element => element == dataProcess.fieldOrder), dataProcess.sortOrder));
          //Preparing the initial table with the correct columns and order
          checkedData.forEach(element => {
            var i = headerTable.indexOf(element);
    
            const auxArray = [];
            for (let index = 0; index < dataTable.length; index++) {
              auxArray.push(dataTable[index][i]);
            }
            dataSelected.push(auxArray);
          });
    
          // Prepare the two arrays of data 
          // Labels Array and the Data array with the Legend
          var chartLabels = dataSelected[0];
          dataSelected.splice(0, 1);

          var chartDescription;
          if(dataProcess.isMap){
            chartDescription = dataSelected[0];
            dataSelected.splice(0, 1);
          }
    
          dataSelected.forEach((element, index) => {
            dataSelected[index] = { data: dataSelected[index], label: dataProcess.legend[index].label };
          });
    
          var chartData = dataSelected;
    
          //Delete duplicate values
          if(!dataProcess.isMap)
            removeDuplicates(chartLabels, chartData);
          else{

            var index = 0;
            do{
                var i = index + 1;
                while(i < chartLabels.length){
                    if(chartLabels[index] == chartLabels[i] && chartData[0].data[index] == chartData[0].data[i]){
                        chartLabels.splice(i, 1);
                        chartData[0].data.splice(i, 1);
                        if(chartDescription && chartDescription.length != 0){
                          chartDescription[index] = chartDescription[index] + " " + chartDescription[i];
                          chartDescription.splice(i,1);
                        }
                        i--;
                    }
                    i++;
                };
                index++;
            }while(index < chartLabels.length);
          }
    
          // Update the chart with the new data
          
          this.listGraphService.saveGraph(dataProcess.chartDataId, dataProcess.chartType, dataProcess.isMap,chartLabels, chartData, chartDescription, dataProcess.title,
            dataProcess.widthGraph).subscribe(dataLink => {
                this.listGraphService.saveProcess(dataProcess.id, dataProcess.typeOfData, dataProcess.url, dataProcess.dataset,
                  dataProcess.chartType, dataProcess.isMap, dataProcess.columnsLabel, dataProcess.columnsData, dataProcess.columnsDescription, dataProcess.fieldOrder, dataProcess.sortOrder, dataProcess.title,
                  dataProcess.legend, dataProcess.widthGraph, dataLink.id).subscribe(data => {
                      this.loading.next(false);
                },
                error => {
                  this.loading.next(false);
                },);
            },
            error => {
              this.loading.next(false);
            },);
            
  }


  //Update the Chart of the CKAN
  ckanReloadChart(dataProcess) {
    this.ckanService.getPackageInfo([dataProcess.dataset]).subscribe(data => {

      this.loading.next(true);

      var headerTable;
      var dataTable;
      if(data.result.length != 0){
          data.result.forEach((element, index) => {
            if(index == 0){
                headerTable =[];
                dataTable =[];
            }

            if (element.format == "PX") {
                var result = parsePXFile(element.data);
                headerTable = result[0];
                dataTable = result[1];
            }else if(element.format == "CSV") {
                var result = parseCSVFile(element.data, index);
                headerTable = result[0];
                dataTable = dataTable.concat(result[1]);
            }         
        });      
      this.prepareAndSave(dataProcess, headerTable, dataTable);
      }
    });
  }

  //Update the Chart of the GAODC
  gaodcReloadChart(dataProcess) {
    this.gaodcService.getPackageInfo(Number(dataProcess.dataset)).subscribe(dataTable => {

      this.loading.next(true);

      const headerTable = dataTable[0];
      dataTable.splice(0, 1);

      this.prepareAndSave(dataProcess, headerTable, dataTable);

    });
  }

  //Prepare the initial table of the virtuoso
  virtuosoPInitialTable(virtuosoData, headerTable, dataTable){
      headerTable = virtuosoData.head.vars;
      virtuosoData.results.bindings.forEach(element => {
          var aux2 = [];
          headerTable.forEach(elementHeader => {
          aux2.push(element[elementHeader].value);  
        });
        dataTable.push(aux2);
      });
  }

  //Update the Chart of Virtuoso
  virtuosoReloadChart(dataProcess) {
    this.virtuosoService.getPackageInfo([dataProcess.dataset]).subscribe(data => {
      
      this.loading.next(true);

      var headerTable = [];
      var dataTable = [];

      this.virtuosoPInitialTable(data, headerTable, dataTable); 
      headerTable = data.head.vars;

      this.prepareAndSave(dataProcess, headerTable, dataTable);
    },
    error => {
      this.loading.next(false);
    },);
  }

    //Update the Chart of Virtuoso
    urlReloadChart(dataProcess) {
      this.urlService.getPackageInfo(dataProcess.dataset).subscribe(data => {      
        this.loading.next(true);
        var headerTable = [];
        var dataTable = [];
        if(data.result.length != 0){
          if (data.result[0].format == "PX") {
              var result = parsePXFile(data.result[0].data);
              headerTable = result[0];
              dataTable = result[1];
          }else if(data.result[0].format == "CSV") {
              var result = parseCSVFile(data.result[0].data,0);
              headerTable = result[0];
              dataTable = result[1];
          }
          this.prepareAndSave(dataProcess, headerTable, dataTable);
        }
      },
      error => {
        this.loading.next(false);
      },);
    }

}