import { Component, OnInit, EventEmitter, Input, Output  } from '@angular/core';

declare var jQuery:any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() points: any;
  @Input() zoom: any;
  @Input() descriptionPoints: any;

  description:any;

  constructor() {
  }

  ngOnInit() {}

  mapOnClick(evt) {
    const map = evt.map;
    // this bit checks if user clicked on a feature
    const point = map.forEachFeatureAtPixel(evt.pixel,
     function(feature, layer) {
      return feature.getId();
    });

    if(this.descriptionPoints && this.descriptionPoints.length > point && this.descriptionPoints[point])
      this.description = this.descriptionPoints[point];
    else if(point >=0)
      this.description = "Sin descripción";
    else
      this.description = "";

    jQuery("#descrip").modal("show");
  }
}
