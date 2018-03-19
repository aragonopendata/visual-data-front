import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';
import { ShareDataService } from '../data/shareData';
import { CkanService } from '../data/ckan.service';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'preview-data',
  templateUrl: './preview-data.component.html',
  styleUrls: [ './preview-data.component.css' ]
})
export class PreviewData implements OnInit {

  properties: string[];
  data: any;
  checked: boolean[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    public dataservice: ShareDataService,
    private ckanservice: CkanService
  ) { 
    this.data = [];
    this.properties = ["Cargando"];

    //TODO: Borrar las dos siguientes lineas, usadas para debug
    this.dataservice.type = "CKAN";
    this.dataservice.data = "123456789-7";
  }

  ngOnInit(): void {
    if(this.dataservice.type == "CKAN"){
      this.ckanservice.getPackageInfo(this.dataservice.data).subscribe(data => {
        this.data = data.result.results;
        this.properties = Object.keys(this.data[0]).map((key)=>{ return key});
        console.log(this.data);
      });
    }
  }


  ngOnDestroy() {
    //Count number of trues in checked list
    /*
    var myCount = this.checked.reduce(function(a,b){
      return b?a+1:a;
    },0);
    */
    //var arrayGenerated:any[][] = [[myCount],[]];
    var arrayGenerated = [];
    for (var j = 0; j < this.data.length; j++) {
      var union = {};
      for (var i = 0; i < this.properties.length; i++) {
        //console.log(this.properties[i]);
        if(this.checked[this.properties[i]]){
          union = Object.assign(union, {[this.properties[i]]: this.data[j][this.properties[i]]});
          //arrayGenerated[i][j] = this.data[j][this.properties[i]];;
        }
      }
      arrayGenerated.push(union);
    } 
    this.dataservice.data = arrayGenerated;
    console.log(arrayGenerated);
  }

  updateChecked(option :any, event : boolean) {
    if(this.checked[option])
      this.checked[option]=!this.checked[option];
    else
      this.checked[option] = true;
  }

  /*
  nestedColumn(column: string, data: string){
    console.log(column);
    console.log(data);
    if(column == "resources")
      return false;
    return true;
  }

  extractData(property: any, data: any){
    if(property == "resources"){

    }
    else{
      return data;
    }
  }
*/

  next(){
    this.router.navigate(['/previewGraph/']); 
  }

  goBack(): void {
    this.location.back();
  }
}