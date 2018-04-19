import { removeDuplicates } from './lib';
import { GraphService } from '../../services/graph.service';
import { GaodcService } from '../../services/gaodc.service';
import { Observable } from 'rxjs/Observable';

export function gaodcReloadChart(dataProcess, gaodcService: GaodcService,  graphService: GraphService){
  gaodcService.getPackageInfo(Number(dataProcess.dataset)).subscribe(dataTable => {
    const headerTable = dataTable[0];
    let checkedData = [];
    dataTable.splice(0, 1);

    const dataSelected = [];
    checkedData = dataProcess.columnsLabel.concat(dataProcess.columnsData);

    //Preparing the initial table in the correct order
    checkedData.forEach(element => {
      var i = headerTable.indexOf(element);

      const auxArray = [];
      for (let index = 0; index < dataTable.length; index++) {
        auxArray.push(dataTable[index][i]);
      }
      dataSelected.push(auxArray);
    });

    // Prepare the two arrays of data and add the labels
    let chartLabels = dataSelected[0];
    dataSelected.splice(0, 1);

    dataSelected.forEach((element, index) => {
      dataSelected[index] = { data: dataSelected[index], label: dataProcess.legend[index] };
    });

    let chartData = dataSelected;

    //Delete duplicate values

    removeDuplicates(chartLabels, chartData);

    // Send Update

    graphService.updateProcess(dataProcess.chartDataId, dataProcess.chartType,
      chartLabels, chartData, dataProcess.title, dataProcess.widthGraph).subscribe(response => {
        console.log(response);
        return response;
    });
  });
  console.log("Aqui");
}