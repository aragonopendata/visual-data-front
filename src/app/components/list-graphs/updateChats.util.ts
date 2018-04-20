import { removeDuplicates } from '../exportedFunctions/lib';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { GraphService } from '../../services/graph.service';
import { GaodcService } from '../../services/gaodc.service';

@Injectable()
export class UpdateGraphService {

  public loading = new Subject<boolean>();

  constructor(
    private listGraphService: GraphService,
    private gaodcService: GaodcService,
  ) { }

  gaodcReloadChart(dataProcess) {
    this.gaodcService.getPackageInfo(Number(dataProcess.dataset)).subscribe(dataTable => {

      this.loading.next(true);

      const headerTable = dataTable[0];
      let checkedData = [];
      dataTable.splice(0, 1);

      const dataSelected = [];
      checkedData = dataProcess.columnsLabel.concat(dataProcess.columnsData);

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

      dataSelected.forEach((element, index) => {
        dataSelected[index] = { data: dataSelected[index], label: dataProcess.legend[index] };
      });

      var chartData = dataSelected;

      //Delete duplicate values

      removeDuplicates(chartLabels, chartData);

      // Update the chart with the new data
      this.listGraphService.updateProcess(dataProcess.chartDataId, dataProcess.chartType,
        chartLabels, chartData, dataProcess.title, dataProcess.widthGraph).subscribe(response => {
          this.loading.next(false);
        });
    });
  }
}