import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ShareDataService } from '../../services/shareData.service';
import { ChartsModule } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { GraphService } from '../../services/graph.service';
import { DragulaService } from 'ng2-dragula';
import { SpinnerModule, InputTextModule, DropdownModule, CheckboxModule } from 'primeng/primeng';
import { removeDuplicates, typeOfArray, getRandomColor } from '../exportedFunctions/lib';
import { prepareArrayXY } from '../exportedFunctions/lib';
import { reducerMapPoints } from '../exportedFunctions/lib';
import { UtilsService } from '../exportedFunctions/utils.service';
import { SelectItem } from '../../models/SelectItem';
import { VisualGrapsService } from '../../services/visual-graps.service';

@Component({
  selector: 'app-preview-graph',
  templateUrl: './preview-graph.component.html',
  styleUrls: ['./preview-graph.component.scss'],
  providers: [DragulaService]
})
export class PreviewGraphComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  loading:boolean = false;
  // Data
  data: any;
  columns: string[];
  realColumns: string[];
  clickFinish:boolean = false;

  // Drag
  columnsType: string[];
  public columnsData: Array<string> = [];
  public columnsLabel: Array<string> = [];
  public descriptionPoints: Array<string> = [];
  nextStep: string;
  editLeyend: boolean = false;
  type = 'all';
  public axisXActivator = 0;
  
  // Charts
  //////////////////////////////////////
  public chartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    elements: {
      line: {
              fill: false
      }
    },
    scales: {
      xAxes: [ 
        {
          ticks: {
            beginAtZero: true,
            callback: function(value, index, array) {
              return null;
            }
            // autoSkip: false,
            // callback: (value, index, array) => {
            //   if(index % this.axisXActivator === 0){
            //     return value;
            //   }
            // }
          }
        }
      ]
    }
  };
  public chartLegend = true;
  

  // To save Data

  chartType: string;
  chartMap: boolean;
  chartNumber: string;
  public legend: Array<any>;

  public widthGraph: number;

  public chartData: Array<any> = [{ data: [0], label: 'A' }];
  public chartLabels: any = ['No data'];

  public title: string;

  public color: any;

  public chartDescriptionPoints: string[] = [];

  //////////////////////////////////////

  points: Array<{ x: number; y: number }> = [];

  public changeNumberData: number;

  typeOfData: string;

  openedMenu: boolean;

  topRows: number;

  groupRow: string = null;

  headersDropdown: Array<any> = [];
  numberOptions: SelectItem[];
  selectedNumberOption: any;
  numberColor: string = '#000000';
  numberUnits: string;
  numberSize: number;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public dataservice: ShareDataService,
    private router: Router,
    private graphservice: GraphService,
    private dragulaService: DragulaService,
    private utilsService: UtilsService,
    private myService: VisualGrapsService,
    private _cdRef: ChangeDetectorRef
  ) {

    this.route.params.subscribe(params => {
      this.type=params.type; 
    });
    
    this.typeOfData = "STA";
    window.scrollTo(0, 0);
    this.nextStep = '';
    this.chartType = 'line';
    if ( this.type==='number' ) {
      this.chartType = 'number';
    }
    this.changeNumberData = 0;
    this.numberSize = 100;
    this.numberUnits = '';
    this.title = "";
    this.chartMap = false;
    this.chartNumber = '0';
    this.numberOptions = [
      {
        label: 'Último valor',
        value: '0'
      },
      {
        label: 'Suma de valores',
        value: '1'
      },
      {
        label: 'Media de valores',
        value: '2'
      }
    ];
    this.selectedNumberOption = this.numberOptions[0].value;

    this.widthGraph = window.screen.width / 2 - 100;
    if (this.widthGraph < 300) {
      this.widthGraph = 300;
    }

    try {
      dragulaService.dragend.subscribe(value => {
        this.loading = true;
        this._cdRef.detectChanges();
        setTimeout(() => {
          this.onDrop(value.slice(1));
          this.loading = false;
          this._cdRef.detectChanges();
        }, 100);
      });
      dragulaService.drop.subscribe(value => {
        if (value[2] && value[2].id === 'move-2') {
          if (this.columnsLabel && this.columnsLabel.length > 0) {
            this.columnsLabel.splice(0, 1);
          }
        }

        if (value[2] && value[2].id === 'move-1' && this.chartType == 'number') {
          if (this.columnsData && this.columnsData.length > 0) {
            this.columnsData.splice(0, 1);
          }
        }

        /*else
                if(value[2] && value[2].id === 'move-3'){
                    if(this.descriptionPoints && this.descriptionPoints.length  > 0){
                        this.descriptionPoints.splice(0,1);
                    }
                }*/
      });
      dragulaService.setOptions('another-bag', {
        copy: function(el, source) {
          return source.id === 'no-drop';
        },
        accepts: function(el, target, source, sibling) {
          return target.id !== 'no-drop'; // elements can be dropped in any of the `containers` by default
        }
      }); 
    } catch (error) {}

    if (
      this.dataservice.dataSelected &&
      this.dataservice.dataSelected.length !== 0
    ) {
      this.columnsTypeData();
    } else {
      this.location.back();
      // this.router.navigate(['/selectData/']);
    }
      this.getOpenedMenu();
  }

  showDescription(event): void {
    alert(event.nombre);
  }

  // Get All the element of the first column to the user to move
  columnsTypeData() {
    this.columnsType = [];
    this.data = this.dataservice.dataSelected;
    this.columns = this.dataservice.headerSelected;
    this.headersDropdown.push({label: "Agrupar", value: null});
    this.columns.forEach(element => {
      this.headersDropdown.push({label: element, value: element});
    });

    this.realColumns = this.dataservice.realHeadersSelected;

    this.data.forEach(element => {
      this.columnsType.push(typeOfArray(element));
    });

    if(this.typeOfData = 'TEST'){
      this.dataservice.dataSelected = null;
      this.dataservice.headerSelected = null;;
      this.dataservice.realHeadersSelected = null;;
    }
  }

  onDrop(args) {

    // Generate new Legend Array if there are new elements in Data array
    if (this.changeNumberData !== this.columnsData.length) {
      this.legend = [];
      this.columnsData.forEach(element => {
        this.legend.push({ label: element });
      });
      this.changeNumberData = this.columnsData.length;
    }

    // Prepare the labels for the chart with the data indicate int columnsLabel
    if (this.columnsLabel && this.columnsLabel.length !== 0) {
      this.chartLabels = [];
      this.columnsLabel.forEach(element => {
        const indexData = this.columns.findIndex(x => x === element);
        this.chartLabels = this.data[indexData];
      });
    } else {
      this.defaultsChats(0);
    }
    
    // Prepare the Data for the chart with the data indicate in columnsData
    if (this.columnsData && this.columnsData.length !== 0 && this.data) {
      this.chartData = [];
      let i = 0;
      this.columnsData.forEach(element => {
        const indexData = this.columns.findIndex(x => x === element);

        if(this.groupRow == null) {
          this.chartData.push({
            data: this.data[indexData],
            label: this.legend[i++].label
          });
        }else{
          const indexgroup = this.columns.findIndex(x => x === this.groupRow);
          const indexData = this.columns.findIndex(x => x === element);
          let groupHeader = this.data[indexgroup];
          let groupedData = {};
          groupHeader.forEach((element,i) => {
            //Join group
            if(!groupedData[element])
              groupedData[element] = [];
            //This is done to take care that the function removeDuplicates dont delete duplicate data of other group
            for (let x = groupedData[element].length; x < i; x++) {
                groupedData[element].push("0");
            };
            
            groupedData[element].push(this.data[indexData][i]);
          });

          for (const key in groupedData) {
            this.chartData.push({
              data: groupedData[key],
              label: key
            });
          }

        }
      });
    } else {
      // Default Values
      this.defaultsChats(1);
    }

    // Prepare the Description Array for the chart with the data indicate in columnsData
    if (
      this.descriptionPoints &&
      this.descriptionPoints.length !== 0 &&
      this.data
    ) {
      this.chartDescriptionPoints = [];
      this.descriptionPoints.forEach(element => {
        const indexData = this.columns.findIndex(x => x === element);
        if (this.chartDescriptionPoints.length === 0) {
          this.chartDescriptionPoints = this.data[indexData].slice(0);
        } else {
          const aux = this.data[indexData].slice(0);
          this.chartDescriptionPoints.forEach((elemento, index) => {
            this.chartDescriptionPoints[index] = elemento + ' - ' + aux[index];
          });
        }
      });
    }

    if (this.chartType === 'number') {
      let aux = 0;
      switch (this.selectedNumberOption) {
        case '0':
          this.chartNumber = this.chartData[0].data[this.chartData[0].data.length - 1] || '0';
          break;
        case '1':
          this.chartData[0].data.forEach(element => {
            aux = aux + Number(element);
          });
          this.chartNumber = aux.toString();
          break;
        case '2':
          this.chartData[0].data.forEach(element => {
            aux = aux + Number(element);
          });
          this.chartNumber = (aux / this.chartData[0].data.length).toFixed(2).toString() ;
          break;
      }
    }
    // Group Data
    if (
      this.columnsData &&
      this.columnsLabel &&
      this.columnsData.length > 0 &&
      this.columnsLabel.length > 0
    ) {
      if (this.chartMap) {
        this.points = prepareArrayXY(this.chartData[0].data, this.chartLabels);
        // usage example:
        const resultado = reducerMapPoints(
          this.points,
          this.chartDescriptionPoints
        );

        this.points = resultado[0];
        this.chartDescriptionPoints = resultado[1];
      } else {
        const aux = JSON.parse(JSON.stringify(this.data));
        const resultado = removeDuplicates(this.chartLabels, this.chartData);
        
        this.chartLabels = resultado[0];
        this.chartData = resultado[1];
        if(this.chartType === 'bar'){
          this.color = [];
          for(let i = 0; i < this.chartData.length; i++ ){
            this.color.push(getRandomColor(i));
          }
        }
        if(this.topRows != -1 && this.topRows != null && this.topRows != 0){
          this.chartLabels = this.chartLabels.splice(0, this.topRows);
          this.chartData = this.chartData.splice(0, this.topRows);
        }
        this.data = aux;
      }
    }
    //

    // The next code is for updating the chart DONT TOUCH
    // if (
    //   this.chart !== undefined &&
    //   this.chart.chart !== undefined &&
    //   !this.chartMap && this.chartType !== 'number'
    // ) {
    //   this.chart.chart.destroy();
    //   this.chart.chart = 0;

    //   this.chart.chartType = this.chartType;
    //   this.chart.datasets = this.chartData;
    //   this.chart.labels = this.chartLabels;

    //   this.chart.ngOnInit();
      
    // }
  }

  saveLeyend(event){

    if( this.editLeyend ){
      this.onEditComplete(event) ;
      this.editLeyend = false;
    }
  }

  onEditComplete(event) {
    if(this.axisXActivator != 0){
      this.chartOptions.scales.xAxes[0].ticks = {
        beginAtZero: true,
        autoSkip: false,
        callback: (value, index, array) => {
          if(index % this.axisXActivator === 0){
            return value;
          }
        }
      }
    }else{
      this.chartOptions.scales.xAxes[0].ticks = {
        beginAtZero: true,
        callback: function(value, index, array) {
          return null;
        }
      }
    }

    this.loading = true;
    setTimeout(() => {
      this.onDrop('refresh');
      this.loading = false;
      this._cdRef.detectChanges();
    }, 100);
    
  }

  // Delete the drag and drop label of the specify column
  deleteElement(buffer, index) {
    this.points = [];
    if (buffer === 1) {
      this.columnsData.splice(index, 1);
    } else if (buffer === 2) {
      this.columnsLabel.splice(index, 1);
    } else if (buffer === 3) {
      this.descriptionPoints.splice(index, 1);
    }
    this.loading = true;
    setTimeout(() => {
      this.onDrop('refresh');
      this.loading = false;
      this._cdRef.detectChanges();
    }, 100);
  }

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }

  defaultsChats(type) {
    if (type === 0) {
      this.chartLabels = ['No Data'];
    } else {
      this.chartData = [{ data: [0], label: 'A' }];
      this.chartLabels = ['No data'];
    }
  }

  changeChart(chart) {
    this.chartMap = false;
    this.chartType = '';
    this.color = [];
    if (chart === 0) {
      this.chartType = 'line';
    } else if (chart === 1) {
      this.chartType = 'bar';
    } else if (chart === 2) {
      this.chartType = 'doughnut';
    } else if (chart === 3) {
      this.chartMap = true;
    } else if (chart === 4) {
      this.chartType = 'number';
    }
    this.loading = true;
    
    setTimeout(() => {
      this.onDrop('refresh');
      this.loading = false;
      this._cdRef.detectChanges();
    }, 100);
  }

  changeDataNumber() {
    this.loading = true;
    setTimeout(() => {
      this.onDrop('refresh');
      this.loading = false;
      this._cdRef.detectChanges();
    }, 100);
  }

  next() {
    this.clickFinish=true;
    // Get the real names of the label column Names if there was a posible change
    var rColumnsLables = [];
    this.columnsLabel.forEach(x => {
      rColumnsLables.push(
        this.realColumns[this.columns.findIndex(e => e === x)]
      );
    });

    // Get the real names of the Data column Names if there was a posible change
    const rColumnsData = [];
    this.columnsData.forEach(x => {
      rColumnsData.push(this.realColumns[this.columns.findIndex(e => e === x)]);
    });

    const rColumnsDescript = [];
    this.descriptionPoints.forEach(x => {
      rColumnsDescript.push(
        this.realColumns[this.columns.findIndex(e => e === x)]
      );
    });

    const pointY = [];
    if (this.chartMap) {
      this.chartLabels = [];
      this.points.forEach(element => {
        this.chartLabels.push(element.x);
        pointY.push(element.y);
      });

      this.chartData = [{ data: pointY, label: 'A' }];
    }

    if (!this.title || this.title === '') {
      this.nextStep = 'Se necesita un título para la gráfica';
      this.clickFinish=false;
    } else if ((rColumnsData.length === 0 || rColumnsLables.length === 0) && this.chartType !== 'number') {
      this.nextStep = 'Se necesitan datos para generar la gráfica.';
      this.clickFinish=false;
    } else {
      // Upload All

      let numberchart = {}
      if (this.chartType === 'number') {
        numberchart = {
          number: this.chartNumber,
          numberOption: this.selectedNumberOption,
          numberColor: this.numberColor,
          numberUnits: this.numberUnits,
          numberSize: this.numberSize,
        }
        rColumnsLables = [];
        this.chartLabels = ['No data'];
      }

      this.graphservice
        .saveGraph(
          null,
          this.chartType,
          this.chartMap,
          this.chartLabels,
          numberchart,
          this.chartData,
          this.chartDescriptionPoints,
          this.title,
          this.widthGraph
        )
        .subscribe(dataLink => {
          this.graphservice
            .saveProcess(
              null,
              this.dataservice.type,
              this.dataservice.url,
              this.dataservice.datasetSelected,
              this.dataservice.ckanDataset,
              this.chartType,
              this.chartMap,
              numberchart,
              rColumnsLables,
              rColumnsData,
              rColumnsDescript,
              this.dataservice.fieldOrder,
              this.dataservice.sortOrder,
              this.title,
              this.legend,
              this.widthGraph,
              dataLink.id,
              this.topRows,
              this.groupRow,
              this.axisXActivator
            )
            .subscribe(data => {
              //this.router.navigate([{outlets: {modal: 'visualData/endGraphic/' + dataLink.id}}]);
              document.getElementsByTagName('body')[0].classList.remove('no-scroll');
              this.myService.setIdGraph(dataLink.id);
              this.myService.setTitleGraph(this.title);
              this.clickFinish=true;
              this.router.navigate([{outlets: {modal: null}}]);
            });
        });
    }
  }

  ngOnDestroy() {}

  getOpenedMenu(){
    this.openedMenu = false;
    this.utilsService.openedMenuChange.subscribe(value => {
      this.openedMenu = value;
    });
  }

  toggleOpenedMenu() {
      this.utilsService.tooggleOpenedMenu();
  }
}
