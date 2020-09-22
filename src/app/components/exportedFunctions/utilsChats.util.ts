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
    private urlService: URLService
  ) { }

  // Process to update all the charts
  prepareAndSave(dataProcess, headerTable, dataTable) {
    let dataSelected = [];
    let dataGroup = [];
    let checkedData = [];
    if (dataProcess.isMap) {
      checkedData = dataProcess.columnsLabel.concat(
        dataProcess.columnsDescription
      );
      checkedData = checkedData.concat(dataProcess.columnsData);
    } else {
      checkedData = dataProcess.columnsLabel.concat(dataProcess.columnsData);
    }

    if (dataProcess.sortOrder !== -2) {
      dataTable = dataTable.sort(
        Comparator(
          headerTable.findIndex(element => element === dataProcess.fieldOrder),
          dataProcess.sortOrder
        )
      );
    }
    // Preparing the initial table with the correct columns and order
    let error = false;
    checkedData.forEach(element => {
      const i = headerTable.indexOf(element);
      if(i != -1){
        const groupIndex = headerTable.indexOf(dataProcess.groupRow);

        const auxArray = [];
        const auxArrayGroup = [];
        for (let index = 0; index < dataTable.length; index++) {
          auxArray.push(dataTable[index][i]);

          if (groupIndex != -1) {
            auxArrayGroup.push(dataTable[index][groupIndex]);
          }
        }
        dataSelected.push(auxArray);
        dataGroup = auxArrayGroup;
      }else{
        error = true;
      }
    });

    if(error){
      console.log("Error: Column mismatch encountered, column names are not the same as previous saved");
      this.loading.next(false);
      return;
    }

    // Prepare the two arrays of data
    // Labels Array and the Data array with the Legend
    let chartLabels = dataSelected[0];
    dataSelected.splice(0, 1);

    let chartDescription = [];
    if (dataProcess.isMap) {
      dataProcess.columnsDescription.forEach(element => {
        if (chartDescription.length === 0) {
          chartDescription = dataSelected[0];
          dataSelected.splice(0, 1);
        } else {
          const aux = dataSelected[0];
          chartDescription.forEach((elemento, index) => {
            chartDescription[index] = elemento + ' - ' + aux[index];
          });
          dataSelected.splice(0, 1);
        }
      });
    }


    if (!dataProcess.groupRow) {
      dataSelected.forEach((element, index) => {
        dataSelected[index] = {
          data: dataSelected[index],
          label: dataProcess.legend[index].label
        };
      });
    } else {

      let groupedData = {};
      dataGroup.forEach((element,i) => {
        //Join group
        if(!groupedData[element])
          groupedData[element] = [];
        //This is done to take care that the function removeDuplicates dont delete duplicate data of other group
        for (let x = groupedData[element].length; x < i; x++) {
            groupedData[element].push("0");
        };
        groupedData[element].push(dataSelected[0][i]);
      });
      dataSelected =[];
      for (const key in groupedData) {
        dataSelected.push({
          data: groupedData[key],
          label: key
        });
      }
    }


    let chartData = dataSelected;

    let chartNumber;
    if (dataProcess.chartType === 'number') {
      let aux = 0;
      chartNumber = dataProcess.numberchart;
      switch (dataProcess.numberchart.numberOption) {
        case '0':
          chartNumber.number = chartLabels[chartLabels.length - 1] || '0';
          break;
        case '1':
          chartLabels.forEach(element => {
            aux = aux + Number(element);
          });
          chartNumber.number = aux.toString();
          break;
        case '2':
          chartLabels.forEach(element => {
            aux = aux + Number(element);
          });
          chartNumber.number = (aux / chartLabels.length).toFixed(2).toString() ;
          break;
      }
    }

    // Delete duplicate values
    if (!dataProcess.isMap) {
      //removeDuplicates(chartLabels, chartData);
      const resultado = removeDuplicates(chartLabels, chartData);
      chartData = resultado[1];
      if (dataProcess.topRows != -1 && dataProcess.topRows != null && dataProcess.topRows != 0) {
        chartLabels = chartLabels.splice(0, dataProcess.topRows);
        chartData = chartData.splice(0, dataProcess.topRows);
      }
    } else {
      let index = 0;
      do {
        let i = index + 1;
        while (i < chartLabels.length) {
          if (
            chartLabels[index] === chartLabels[i] &&
            chartData[0].data[index] === chartData[0].data[i]
          ) {
            chartLabels.splice(i, 1);
            chartData[0].data.splice(i, 1);
            if (chartDescription && chartDescription.length !== 0) {
              chartDescription[index] =
                chartDescription[index] + ' ' + chartDescription[i];
              chartDescription.splice(i, 1);
            }
            i--;
          }
          i++;
        }
        index++;
      } while (index < chartLabels.length);
    }
    // Update the chart with the new data

    this.listGraphService
      .saveGraph(
        dataProcess.chartDataId,
        dataProcess.chartType,
        dataProcess.isMap,
        chartLabels,
        chartNumber,
        chartData,
        chartDescription,
        dataProcess.title,
        dataProcess.widthGraph
      )
      .subscribe(
        dataLink => {
          this.loading.next(true);
          this.listGraphService
            .saveProcess(
              dataProcess.id,
              dataProcess.typeOfData,
              dataProcess.url,
              dataProcess.dataset,
              dataProcess.ckanDataset,
              dataProcess.chartType,
              dataProcess.isMap,
              chartNumber,
              dataProcess.columnsLabel,
              dataProcess.columnsData,
              dataProcess.columnsDescription,
              dataProcess.fieldOrder,
              dataProcess.sortOrder,
              dataProcess.title,
              dataProcess.legend,
              dataProcess.widthGraph,
              dataLink.id,
              dataProcess.topRows,
              dataProcess.groupRow,
              dataProcess.axisXActivator
            )
            .subscribe(
              data => {
                this.loading.next(false);
              },
              error => {
                this.loading.next(false);
              }
            );
        },
        error => {
          this.loading.next(false);
        }
      );
  }

  // Update the Chart of the CKAN
  ckanReloadChart(dataProcess) {
    this.ckanService.getPackageResource({url: dataProcess.url, format: dataProcess.dataset}).subscribe(data => {
      this.loading.next(true);

      let headerTable;
      let dataTable;
      if (data.result.length !== 0) {
        data.result.forEach((element, index) => {
          if (index === 0) {
            headerTable = [];
            dataTable = [];
          }

          if (element.format === 'PX') {
            const result = parsePXFile(element.data);
            headerTable = result[0];
            dataTable = result[1];
          } else if (element.format === 'CSV') {
            const result = parseCSVFile(element.data, index);
            headerTable = result[0];
            dataTable = dataTable.concat(result[1]);
          }
        });
        this.prepareAndSave(dataProcess, headerTable, dataTable);
      }
    });
  }

  // Update the Chart of the GAODC
  gaodcReloadChart(dataProcess) {
    this.gaodcService
      .getPackageInfo(Number(dataProcess.dataset))
      .subscribe(dataTable => {
        this.loading.next(true);

        const headerTable = dataTable[0];
        dataTable.splice(0, 1);
        this.prepareAndSave(dataProcess, headerTable, dataTable);
      });
  }

  // Prepare the initial table of the virtuoso
  virtuosoPInitialTable(virtuosoData, headerTable, dataTable) {
    headerTable = virtuosoData.head.vars;
    virtuosoData.results.bindings.forEach(element => {
      const aux2 = [];
      headerTable.forEach(elementHeader => {
        aux2.push(element[elementHeader].value);
      });
      dataTable.push(aux2);
    });
  }

  // Update the Chart of Virtuoso
  virtuosoReloadChart(dataProcess) {
    this.virtuosoService.getPackageInfo([dataProcess.dataset]).subscribe(
      data => {
        this.loading.next(true);

        let headerTable = [];
        const dataTable = [];

        this.virtuosoPInitialTable(data, headerTable, dataTable);
        headerTable = data.head.vars;

        this.prepareAndSave(dataProcess, headerTable, dataTable);
      },
      error => {
        this.loading.next(false);
      }
    );
  }

  // Update the Chart of Virtuoso
  urlReloadChart(dataProcess) {
    this.urlService.getPackageInfo(dataProcess.dataset).subscribe(
      data => {
        this.loading.next(true);
        let headerTable = [];
        let dataTable = [];
        if (data.result.length !== 0) {
          if (data.result[0].format === 'PX') {
            const resultado = parsePXFile(data.result[0].data);
            headerTable = resultado[0];
            dataTable = resultado[1];
          } else if (data.result[0].format === 'CSV') {
            const resultado = parseCSVFile(data.result[0].data, 0);
            headerTable = resultado[0];
            dataTable = resultado[1];
          }
          this.prepareAndSave(dataProcess, headerTable, dataTable);
        }
      },
      error => {
        this.loading.next(false);
      }
    );
  }
}
