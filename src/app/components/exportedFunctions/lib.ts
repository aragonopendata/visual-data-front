export function removeDuplicates(chartLabels, chartData) {
  const duplicates = chartLabels.filter(function(value, index, self) {
    return self.indexOf(value) !== index;
  });
  const unique = chartLabels.filter((v, i, a) => a.indexOf(v) === i);

  // Test if the data is a string and if it is, transform the array into number of ones
  chartData.forEach(element => {
    if (typeOfArray(element.data) === 'String') {
      const aux = Array.from(new Array(element.data.length), (val, index) => 1);
      element.data = aux;
    }
  });
  
  // Delete duplicates and sum their numeric info
  duplicates.forEach(element => {
    const findFirst = chartLabels.indexOf(element);
    for (let i = findFirst + 1; i < chartLabels.length; i++) {
      if (element === chartLabels[i]) {
        // Duplicate Data
        chartData.forEach((d, index) => {
          d.data[findFirst] = Number(d.data[findFirst]);
          if(d.data[i])
            d.data[findFirst] += Number(d.data[i])
          d.data.splice(i, 1);
        });
        chartLabels.splice(i, 1);
      }
    }
  });

  chartData.forEach((d, index) => {
    d.data.forEach((element, index) => {
      if(element % 1 != 0){
        d.data[index] = Number(element).toFixed(2);
      }
    });
  });
  
  return [unique, chartData];
}

export function typeOfArray(array) {
  let exit = true;
  let newIndex = 0;

  do {
    exit = false;
    if (
      isNaN(array[newIndex]) &&
      array[newIndex] !== undefined &&
      array[newIndex] != null
    ) {
      exit = true;
      return 'String';
    } else {
      newIndex++;
      if (newIndex >= array.length) {
        exit = true;
        return 'Number';
      }
    }
  } while (!exit);
  return undefined;
}

export function Comparator(index, order) {
  return function(a, b) {
    if (!isNaN(Number(a[index])) && !isNaN(Number(b[index]))) {
      if (order === 1) {
        return a[index] - b[index];
      } else {
        return b[index] - a[index];
      }
    }
    if (a[index] < b[index]) {
      return order === 1 ? 1 : -1;
    }
    if (a[index] > b[index]) {
      return order === 1 ? -1 : 1;
    }
    return 0;
  };
}

export function prepareArrayXY(data, labels) {
  const aux: Array<{ x: number; y: number }> = [];
  data.forEach((element, index) => {
    let long = Number(labels[index]);
    let lat = Number(element);
    if (!isNaN(long) && !isNaN(long)) {
      if (long <= 180 && long >= -180 && lat <= 90 && lat >= -90) {
        aux.push({
          x: long,
          y: lat
        });
      }else{
        var auxConvert = convertUtmToLatLng (long, lat, 30, "N");
        long = auxConvert.lng;
        lat = auxConvert.lat;
        aux.push({
          x: long,
          y: lat
        });
      }
    }
  });
  return aux;
}

function convertUtmToLatLng (UTMEasting, UTMNorthing, UTMZoneNumber, UTMZoneLetter)
{
    var eccSquared = 0.00669438;
    var a = 6378137;
    var e1 = (1 - Math.sqrt(1 - eccSquared)) / (1 + Math.sqrt(1 - eccSquared));
    var x = UTMEasting - 500000.0; //remove 500,000 meter offset for longitude
    var y = UTMNorthing;
    var ZoneNumber = UTMZoneNumber;
    var ZoneLetter = UTMZoneLetter;
    var NorthernHemisphere;
    if(UTMEasting===undefined)
    {
        console.log("Please pass the UTMEasting!");
        return {lat: 0, lng: 0};
    }
    if(UTMNorthing===undefined)
    {
        console.log("Please pass the UTMNorthing!");
        return {lat: 0, lng: 0};
    }
    if(UTMZoneNumber===undefined)
    {
        console.log("Please pass the UTMZoneNumber!");
        return {lat: 0, lng: 0};
    }
    if(UTMZoneLetter===undefined)
    {
      console.log("Please pass the UTMZoneLetter!");
        return {lat: 0, lng: 0};
    }

    if ('N' === ZoneLetter) {
        NorthernHemisphere = 1;
    } else {
        NorthernHemisphere = 0;
        y -= 10000000.0;
    }

    var LongOrigin = (ZoneNumber - 1) * 6 - 180 + 3;  

    var eccPrimeSquared = (eccSquared) / (1 - eccSquared);

    var M = y / 0.9996;
    var mu = M / (a * (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256));

    var phi1Rad = mu + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu)
    + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu)
    + (151 * e1 * e1 * e1 / 96) * Math.sin(6 * mu);
    var phi1 = toDegrees(phi1Rad);

    var N1 = a / Math.sqrt(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
    var T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
    var C1 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
    var R1 = a * (1 - eccSquared) / Math.pow(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
    var D = x / (N1 * 0.9996);

    var Lat = phi1Rad - (N1 * Math.tan(phi1Rad) / R1) * (D * D / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * eccPrimeSquared) * D * D * D * D / 24
        + (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C1 * C1) * D * D * D * D * D * D / 720);
    Lat = toDegrees(Lat);

    var Long = (D - (1 + 2 * T1 + C1) * D * D * D / 6 + (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * eccPrimeSquared + 24 * T1 * T1)
        * D * D * D * D * D / 120) / Math.cos(phi1Rad);
    Long = LongOrigin + toDegrees(Long);
    return {lat: Lat, lng: Long};
};

function toDegrees(rad) {

  return rad / Math.PI * 180;
};


export function reducerMapPoints(points, descriptions) {
  let index = 0;
  do {
    let i = index + 1;
    while (i < points.length) {
      if (points[index].x === points[i].x && points[index].y === points[i].y) {
        points.splice(i, 1);
        if (descriptions && descriptions.length !== 0) {
          descriptions[index] = descriptions[index] + ' ' + descriptions[i];
          descriptions.splice(i, 1);
        }
        i--;
      }
      i++;
    }
    index++;
  } while (index < points.length);

  return [points, descriptions];
}

export function parseCSVFile(data, index) {
  const keys = [];
  for (const key in data[0]) {
    if (key) {
      keys.push(key);
    }
  }
  const rows = [];
  data.forEach(element => {
    const aux = [];
    for (const key in element) {
      if (key) {
        aux.push(element[key]);
      }
    }
    rows.push(aux);
  });

  return [keys, rows];
}

export function parsePXFile(data) {
  let headersNames = [];
  const headersOrder = [];
  let labelsNames = [];
  const values = [];
  let dataTable = [];
  let headerTable = [];
  let parse = 'init';
  data = data.replace(/\s+/g, ' ').trim();

  // Prepare the Headers Names
  parse = data.match(/HEADING=[.\s\S]*?;/);
  parse = parse[0]
    .split('=')
    .pop()
    .slice(0, -1);
  headersNames = parse
    .replace(/",\s?\S?"/g, '"############"')
    .split('############');
  headersNames.forEach((element, index) => {
    headersNames[index] = element.replace(/"/g, '').replace(/^\s+/g, '');
  });

  // Prepare the Headers Names of the labels/stub
  parse = data.match(/STUB=[.\s\S]*?;/);
  parse = parse[0]
    .split('=')
    .pop()
    .slice(0, -1);
  labelsNames = parse
    .replace(/",\s?\S?"/g, '"############"')
    .split('############');
  labelsNames.forEach((element, index) => {
    labelsNames[index] = element.replace(/"/g, '').replace(/^\s+/g, '');
  });

  // GET all Headers AND Descriptions of the px file
  while (parse != null) {
    parse = data.match(/VALUES\(.*?\)=[.\s\S]*?";/);
    if (parse != null) {
      parse = parse[0].slice(7, -1);
      let aux3 = parse.match(/[.\s\S]*?\)/).toString();
      aux3 = aux3.slice(0, aux3.length - 1);
      aux3 = aux3.replace(/"/g, '').replace(/^\s+/g, '');
      headersOrder.push(aux3);
      parse = parse
        .split('=')
        .pop()
        .slice(0, -1);

      const aux2 = parse
        .replace(/",\s?\S?"/g, '"############"')
        .split('############');
      aux2.forEach((element, index) => {
        aux2[index] = element.replace(/"/g, '').replace(/^\s+/g, '');
      });
      values.push(aux2);

      data = data.split(parse).pop();
    }
  }

  // Prepare Table Data
  parse = data.match(/DATA=[.\s\S]*?;/);
  parse = parse[0]
    .split('= ')
    .pop()
    .slice(0, -1);
  const auxDataTable2 = parse.split(' ');

  auxDataTable2.forEach((element, index) => {
    if (element === '"."') {
      auxDataTable2[index] = null;
    }
  });

  const auxDataTable = auxDataTable2.map(function(x) {
    const n = parseInt(x, 10);
    if (isNaN(n)) {
      return null;
    } else {
      return n;
    }
  });

  ///////////////////////////////////////////////////////////
  // Duplicate arrays to match the superior headers and add that header

  // Get the headers array pointers
  const pointersHeaders = [];

  headersNames.reverse().forEach(element => {
    const indexHeader = headersOrder.findIndex(dato => dato === element);

    pointersHeaders.push(values[indexHeader]);
  });

  pointersHeaders.reverse().forEach((element, index) => {
    if (index + 1 < pointersHeaders.length) {
      const clone = pointersHeaders[index + 1].slice(0);
      element.forEach((e, index2) => {
        if (index2 === 0) {
          pointersHeaders[index + 1] = [];
        }
        pointersHeaders[index + 1] = pointersHeaders[index + 1].concat(
          clone.map(z => e + ' ' + z)
        );
      });
    }
  });
  headerTable = pointersHeaders[pointersHeaders.length - 1];
  ///////////////////////////////////////////////////////////

  // Indicate where to cut on the array and create the respective chucks
  dataTable = chuck(auxDataTable, headerTable.length);
  if (
    dataTable[dataTable.length - 1][0] == null &&
    dataTable[dataTable.length - 1].length <= 1
  ) {
    dataTable.pop();
  }

  ///////////////////////////////////////////////////////////
  // Prepare the Labels/STUB

  // Get the labels array pointers
  const pointersLabels = [];
  const indexLabels = [];

  labelsNames.forEach(element => {
    const indexHeader = headersOrder.findIndex(dato => dato === element);

    pointersLabels.push(values[indexHeader]);
    indexLabels.push(indexHeader);
  });

  pointersLabels.forEach((element, index) => {
    if (index + 1 < pointersLabels.length) {
      const auxiliar = [];
      element.forEach(e => {
        for (let i = 0; i < pointersLabels[index + 1].length; i++) {
          auxiliar.push(e);
        }
      });
      pointersLabels[index] = auxiliar;
    } else {
      const clone = element.slice(0);
      let auxiliar = [];
      for (
        let indice = 0;
        indice < Math.floor(dataTable.length / clone.length);
        indice++
      ) {
        auxiliar = auxiliar.concat(clone);
      }
      pointersLabels[index] = auxiliar;
    }
  });

  indexLabels.reverse();

  // Add the ROW labels to the table
  pointersLabels.reverse().forEach((element, index) => {
    headerTable.unshift(labelsNames[indexLabels[index]]);
    element.forEach((e, i) => {
      if (dataTable[i] !== undefined) {
        dataTable[i].unshift(e);
      }
    });
  });

  ///////////////////////////////////////////////////////////

  return [headerTable, dataTable];
}

// split array into chucks of the size parameter
function chuck(array, size) {
  const results = [];
  while (array.length) {
    results.push(array.splice(0, size));
  }
  return results;
}

export function getRandomColor(n) {
  if(n > 11){
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return {backgroundColor: color};
  }else{
    //Default colors
    const color = [
      {backgroundColor: '#5ea2ba'},
      {backgroundColor: 'rgb(255, 99, 132)'},
      {backgroundColor: 'rgb(54, 162, 235)'},
      {backgroundColor: 'rgb(255, 206, 86)'},
      {backgroundColor: 'rgb(231, 233, 237)'},
      {backgroundColor: 'rgb(75, 192, 192)'},
      {backgroundColor: 'rgb(151, 187, 205])'},
      {backgroundColor: 'rgb(220, 220, 220)'},
      {backgroundColor: 'rgb(70, 191, 189)'},
      {backgroundColor: 'rgb(253, 180, 92)'},
      {backgroundColor: 'rgb(148, 159, 177)'},
      {backgroundColor: 'rgb(77, 83, 96)'},
    ];
    return color[n];
  }
}
