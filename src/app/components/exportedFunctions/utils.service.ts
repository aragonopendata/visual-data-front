import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UtilsService {

    openedMenu: boolean;
    openedMenuChange: Subject<boolean> = new Subject<boolean>();

    constructor() {
        this.openedMenuChange.subscribe((value) => {
            this.openedMenu = value;
        });
    }

    tooggleOpenedMenu() {
        this.openedMenuChange.next(!this.openedMenu);
    }

}
