import {AfterViewInit, Directive, ElementRef, OnDestroy} from '@angular/core';
import {IFrameComponent, iframeResizer} from 'iframe-resizer';

@Directive({
    selector: '[appIframeResizer]'
})
export class IFrameResizerDirective implements AfterViewInit, OnDestroy {
    component: IFrameComponent;

    constructor(public element: ElementRef) {
    }

    ngAfterViewInit() {

        let isOldIE = (navigator.userAgent.indexOf("MSIE") !== -1); // Detect IE10 and below

        const components = iframeResizer({
            heightCalculationMethod: isOldIE ? 'max' : 'grow',
            log: false, 
            //scrolling: true
            //maxHeight: 1050,        
        }, this.element.nativeElement);

        /* save component reference so we can close it later */
        this.component = components && components.length > 0 ? components[0] : null;
    }

    ngOnDestroy(): void {
        if (this.component && this.component.iFrameResizer) {
            this.component.iFrameResizer.close();
        }
    }
}