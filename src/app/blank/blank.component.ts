import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

@Component({
  selector: 'blank',
  template: ''
})

//Blank Component, this component is use to reload 
//the "current" componet where the user is located
export class BlankComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
  ) { 
  }
  
  ngOnInit(): void {}
}