export function removeDuplicates (chartLabels, chartData){
    const duplicates = chartLabels.filter(function(value,index,self){ return (self.indexOf(value) !== index )});
    
    // Test if the data is a string and if it is, transform the array into number of ones
    chartData.forEach(element => {
        if(typeof element.data[0] == "string"){
            var aux = Array.from(new Array(element.data.length),(val,index)=>1);
            element.data = aux;
        }
    });

    // Delete duplicates and sum their numeric info
    duplicates.forEach(element => {
        const findFirst = chartLabels.indexOf(element);
        for (let i = findFirst + 1; i < chartLabels.length; i++) {
            if(element === chartLabels[i]){
                //Duplicate Data
                chartData.forEach((d, index) => {
                    d.data[findFirst] += d.data[i];
                    d.data.splice(i,1);                  
                });
                chartLabels.splice(i,1);
            }
        }
    });
};


export function parseCSVFile(data){
    var keys = [];
    for (var key in data[0]) {
        keys.push(key); 
    }
    var rows = [];
    data.forEach(element => {
        var aux = [];
        for (var key in element ) {
            aux.push(element[key])
        }
        rows.push(aux);
    });

    return [keys, rows];
}

export function parsePXFile(data){
    var headersNames = [];
    var headersOrder = [];
    var labelsNames = [];
    var values = [];
    var dataTable = [];
    var headerTable= [];
    var parse = "init";
    data = data.replace(/\s+/g, ' ').trim();

    //Prepare the Headers Names
    parse = data.match(/HEADING=[.\s\S]*?;/);
    parse = parse[0].split("=").pop().slice(0, -1);
    headersNames = parse.replace(/",\s?\S?"/g,"\"############\"").split('############');
    headersNames.forEach((element,index) => {
        headersNames[index] = element.replace(/"/g, '').replace(/^\s+/g, '');
    });

    //Prepare the Headers Names of the labels/stub
    parse = data.match(/STUB=[.\s\S]*?;/);
    parse = parse[0].split("=").pop().slice(0, -1);
    labelsNames = parse.replace(/",\s?\S?"/g,"\"############\"").split('############');
    labelsNames.forEach((element,index) => {
        labelsNames[index] = element.replace(/"/g, '').replace(/^\s+/g, '');
    });

    //GET all Headers AND Descriptions of the px file
    while(parse != null){
        parse = data.match(/VALUES\(.*?\)=[.\s\S]*?";/);
        if(parse != null){
            parse = parse[0].slice(7, -1);
            var aux3 = parse.match(/[.\s\S]*?\)/).toString();
            aux3 = aux3.slice(0, aux3.length-1);
            aux3 = aux3.replace(/"/g, '').replace(/^\s+/g, '');
            headersOrder.push(aux3);
            parse = parse.split("=").pop().slice(0, -1);
            
            var aux2 = parse.replace(/",\s?\S?"/g,"\"############\"").split('############');
            aux2.forEach((element,index) => {
                aux2[index] = element.replace(/"/g, '').replace(/^\s+/g, '');
            });
            values.push(aux2);
            
            data = data.split(parse).pop();
        }
    }

    //Prepare Table Data
    parse = data.match(/DATA=[.\s\S]*?;/);
    parse = parse[0].split("= ").pop().slice(0, -1);
    var auxDataTable2 = parse.split(" "); 

    auxDataTable2.forEach((element,index) => {
        if(element == "\".\"")
            auxDataTable2[index] = null;
    });

    var auxDataTable = auxDataTable2.map(function (x) { 
        var n = parseInt(x, 10);
        if(isNaN(n))
            return null
        else
            return n; 
    });

    ///////////////////////////////////////////////////////////
    //Duplicate arrays to match the superior headers and add that header

    // Get the headers array pointers
    var pointersHeaders = [];

    headersNames.reverse().forEach(element=> {
        var indexHeader = headersOrder.findIndex(data => data == element);

        pointersHeaders.push(values[indexHeader]);
    });

    pointersHeaders.reverse().forEach((element,index) => {
        if(index + 1 < pointersHeaders.length){
            var clone = pointersHeaders[index + 1].slice(0);
            element.forEach((e, index2) => {
                if(index2 == 0)
                    pointersHeaders[index + 1] = [];
                pointersHeaders[index + 1] = pointersHeaders[index + 1].concat(clone.map(z => e + " " + z));
            });
        }
    });
    headerTable = pointersHeaders[pointersHeaders.length -1 ];
    ///////////////////////////////////////////////////////////

    //Indicate where to cut on the array and create the respective chucks
    dataTable = chuck(auxDataTable, headerTable.length);
    if(dataTable[ dataTable.length -1 ][0] == null && dataTable[ dataTable.length -1 ].length <= 1){
        dataTable.pop();
    }

    ///////////////////////////////////////////////////////////
    // Prepare the Labels/STUB

    // Get the labels array pointers
    var pointersLabels = [];
    var indexLabels = [];

    labelsNames.forEach(element=> {
        var indexHeader = headersOrder.findIndex(data => data == element);

        pointersLabels.push(values[indexHeader]);
        indexLabels.push(indexHeader);
    });

    pointersLabels.forEach((element, index) => {
        if(index + 1 < pointersLabels.length){
            var aux = [];
            element.forEach(e => {    
                for (let i = 0; i < pointersLabels[index + 1].length; i++) {
                    aux.push(e);                    
                }
            });
            pointersLabels[index] = aux;
        }else{
            var clone = element.slice(0);
            var aux = [];
            for (let index = 0; index < Math.floor(dataTable.length/clone.length); index++) {
                aux = aux.concat(clone);           
            }
            pointersLabels[index] = aux;
        }
    });

    indexLabels.reverse();

    //Add the ROW labels to the table
    pointersLabels.reverse().forEach((element, index) => {
        headerTable.unshift(labelsNames[indexLabels[index]]);
        element.forEach((e, i) => {
            if(dataTable[i] != undefined)
                dataTable[i].unshift(e);
        });
    });

    ///////////////////////////////////////////////////////////

    return [headerTable, dataTable];
}

// split array into chucks of the size parameter
function chuck(array, size) {
    var results = [];
    while (array.length) {
      results.push(array.splice(0, size));
    }
    return results;
};