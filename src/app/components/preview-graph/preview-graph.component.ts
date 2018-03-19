import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ShareDataService } from '../../services/shareData.service';
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-preview-graph',
  templateUrl: './preview-graph.component.html',
  styleUrls: ['./preview-graph.component.css']
})
export class PreviewGraphComponent implements OnInit {
  properties: string[];
  data: any;
  chartType: string;
  propertyDataSelected: string;
  propertyLabelSelected: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public dataservice: ShareDataService,
    private router: Router
  ) {
    window.scrollTo(0, 0);
    this.chartType = 'line';
    try {
      this.data = JSON.parse(JSON.stringify(this.dataservice.data));
      this.properties = Object.keys(this.data[0]).map(key => key);
    } catch (error) {
      this.router.navigate(['/selectData/']);
    }
  }

  // lineChart
  public lineChartData: Array<any> = [{ data: [100], label: 'Series A' }];
  public lineChartLabels: Array<any> = ['Select Data'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }

  select(option: any, sel: any, event: any) {
    // If 0 then is a label data
    if (event === true || event.target.checked === true) {
      if (sel === 0) {
        this.propertyLabelSelected = option;
        this.lineChartLabels = this.getDataArray(option);
      } else if (sel === 1) {
        // If 1 then is a data
        this.propertyDataSelected = option;
        this.lineChartData = [
          { data: this.getDataArray(option), label: 'Series A' }
        ];
      }
    } else {
      if (sel === 0) {
        this.lineChartLabels = ['Select Data'];
      } else if (sel === 1) {
        this.lineChartData = [{ data: [100], label: 'Series A' }];
      }
    }
  }

  groupBy(event: any) {
    if (this.propertyLabelSelected !== undefined) {
      if (event.target.checked === true) {
        if (this.data.length > 1) {
          const aux = Object.assign([], this.data);
          /*
          let NaN = false;
          if( isNaN(Number(aux[0][this.propertyDataSelected]))){
            if( aux[i][this.propertyDataSelected] < 0)
              aux[i][this.propertyDataSelected] = 1;
              NaN = true;
          }+*/
          let i = 0,
            j;
          while (i < aux.length) {
            j = i + 1;
            while (j < aux.length) {
              const aux1 = aux[i][this.propertyLabelSelected];
              const aux2 = aux[j][this.propertyLabelSelected];
              if (aux1 === aux2 || (aux1 == null && aux2 == null)) {
                // if(NaN == true)
                aux[i][this.propertyDataSelected] +=
                  aux[j][this.propertyDataSelected];
                aux.splice(j, 1);
                j--;
              }
              j++;
            }
            i++;
          }
          this.data = Object.assign([], aux);
          this.updateGraph();
        }
      } else {
        this.data = JSON.parse(JSON.stringify(this.dataservice.data));
        this.updateGraph();
      }
    }
  }

  updateGraph() {
    this.lineChartLabels.length = 0;
    const aux = this.getDataArray(this.propertyLabelSelected);
    for (let i = aux.length - 1; i >= 0; i--) {
      this.lineChartLabels.push(aux[i]);
    }

    this.lineChartData = [
      { data: this.getDataArray(this.propertyDataSelected), label: 'Series A' }
    ];
  }

  getDataArray(property: any) {
    const aux = [];
    for (let i = 0; i < this.data.length; i++) {
      aux.push(this.data[i][property]);
    }
    return aux;
  }

  changeChart(chart) {
    if (chart === 0) {
      this.chartType = 'line';
    } else if (chart === 1) {
      this.chartType = 'bar';
    } else if (chart === 2) {
      this.chartType = 'pie';
    }
  }

  next() {
    this.lineChartLabels = this.getDataArray(this.propertyLabelSelected);
    console.log(this.lineChartLabels);
  }
}
