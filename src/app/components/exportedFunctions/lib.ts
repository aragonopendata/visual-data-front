export function removeDuplicates (chartLabels, chartData){
    const duplicates = chartLabels.filter(function(value,index,self){ return (self.indexOf(value) !== index )});
    
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