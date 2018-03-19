import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AccordionModule } from 'ng2-accordion';
import { AutoCompleteModule } from 'primeng/primeng';
import { CkanService } from '../data/ckan.service';
import { ShareDataService } from '../data/shareData';

@Component({
  selector: 'app-select-data',
  templateUrl: './select-data.component.html',
  styleUrls: ['./select-data.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SelectDataComponent implements OnInit, OnDestroy {

  opened: string;

  list: String[];

  myData: String;

  ckanPackages: String[];

  results: string[];

  constructor(
    private ckanservice: CkanService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    public dataservice: ShareDataService
  ) {
    this.opened = '';
    this.list = ['Cargando Espere'];
    this.ckanPackages = [];
  }

  ngOnInit(): void {
    this.ckanservice.getPackageList().subscribe(data => {
      this.list = data.result;
    });
  }

  ngOnDestroy() {
    if (this.opened === 'CKAN') {
      this.dataservice.type = 'CKAN';
      this.dataservice.data = this.ckanPackages;
    }
  }

  selectPackage() {
    const exist = this.list.find(x => x === this.myData);
    if (exist && this.ckanPackages.length === 0) {
      this.ckanPackages.push(this.myData);
    }
  }

  search(event: any) {
    this.results = Object.assign([], this.list).filter(
      item => item.indexOf(event.query) > -1
    );
  }

  deletePackage() {
    this.ckanPackages.pop();
  }

  goBack(): void {
    this.location.back();
  }

  whoIsOpen(n: string) {
    console.log('Detectado Apertura de ' + n);
    this.opened = n;
  }

  next() {
    this.router.navigate(['/previewData/']);
  }
}
