import { removeDuplicates } from './lib';

  export function gaodcReloadChart(dataProcess, dataTable, chartLabels, chartData) {
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
    chartLabels = dataSelected[0];
    dataSelected.splice(0, 1);

    dataSelected.forEach((element, index) => {
      dataSelected[index] = { data: dataSelected[index], label: dataProcess.legend[index] };
    });

    chartData = dataSelected;

    //Delete duplicate values

    removeDuplicates(chartLabels, chartData);
}