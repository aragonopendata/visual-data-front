import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() points: any;
  @Input() zoom: any;
  @Input() descriptionPoints: any;
  @Input() turnDescript: any;

  description: any;

  constructor() {}

  ngOnInit() {}

  pointerChange(n: number) {
    if (n === 1) {
      jQuery('#selector').css('cursor', '-webkit-grabbing');
      jQuery('#selector').css('cursor', 'grabbing');
    } else {
      jQuery('#selector').css('cursor', '-webkit-grab');
      jQuery('#selector').css('cursor', 'grab');
    }
  }

  mapOnClick(evt) {
    if (this.turnDescript === 'true') {
      const map = evt.map;
      this.description = '';
      // this bit checks if user clicked on a feature
      const point = map.forEachFeatureAtPixel(evt.pixel, function(
        feature,
        layer
      ) {
        return feature.getId();
      });

      jQuery('#selector').css('cursor', '-webkit-grabbing');
      jQuery('#selector').css('cursor', 'grabbing');

      var modiifyPos = true;
      if (
        this.descriptionPoints &&
        this.descriptionPoints.length > point &&
        this.descriptionPoints[point]
      ) {
        this.description = this.descriptionPoints[point];
        jQuery('#mydiv').css('display', 'block');
      } else if (point >= 0) {
        this.description = 'Sin descripción';
        jQuery('#mydiv').css('display', 'block');
      } else {
        jQuery('#selector').css('cursor', '-webkit-grab');
        jQuery('#selector').css('cursor', 'grab');
        jQuery('#mydiv').css('display', 'none');
        this.description = '';
        modiifyPos = false;
      }

      //Calculate the position of the div
      if(modiifyPos){
        var positionX = evt.originalEvent.layerX - 60;
        var positionY = evt.originalEvent.layerY + 40;

        //var downGrid = false;
        //var boxDescript = jQuery( '#mydiv' ).slice(0);
        //console.log(boxDescript);
/*

        var p = jQuery( '#selector');
        console.log(p);

        var boxDescript = jQuery( '#mydiv' ).slice(0);
        var offsetLeft = boxDescript[0].offsetLeft;
        console.log(boxDescript);
        console.log(offsetLeft);

        if(offsetLeft < 0){
          console.log("Pasamos Izquieda");
          positionX += 70;
        }

        if(positionY + boxDescript[0].clientHeight > p[0].clientHeight){
          console.log("Pasamos Abajo");
          positionY -= (boxDescript[0].clientHeight + 30 + 30);
          downGrid = true;
        }

        if(positionX + boxDescript[0].clientWidth > p[0].clientWidth){
          console.log("Pasamos Derecha");
          positionX -= boxDescript[0].clientWidth - 30;
          if(!downGrid){
            positionY -= (boxDescript[0].clientHeight);
          }
        }
*/
      

        jQuery('#mydiv').css({
          top: positionY,
          left: positionX
        });
/*
        //Solve a bug with the visor
        if(boxDescript[0].offsetTop == 0 &&  boxDescript[0].offsetLeft == 0 && boxDescript[0].clientHeight == 0){
          jQuery('#mydiv').css('visibility', 'hidden');
          jQuery('#mydiv').css('display', 'inline-block');
        }else{
          jQuery('#mydiv').css('visibility', 'visible');
        }
      */
      }
    }
  }
}
