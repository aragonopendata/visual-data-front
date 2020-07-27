import {Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';
 
@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {
    
    constructor(private _elementRef : ElementRef) { }
 
    @Output() public clickOutside = new EventEmitter();
 
    @HostListener('document:click', ['$event.target'])
    @HostListener('document:touchstart', ['$event.target'])
    /**
	 * Listen to click events, and emit event when click is outside of target element.
     * @param targetElement
	 */
    public onClick(targetElement) {
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit([null, targetElement]);
        }
    }
}
