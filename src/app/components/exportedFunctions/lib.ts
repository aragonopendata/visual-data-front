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