import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class VisualGrapsService {

  private idGraph$ = new Subject<string>();

  constructor() {}
  
  setIdGraph(id: string) {
    this.idGraph$.next(id);
  }

  getIdGraph(): Observable<string> {
    return this.idGraph$.asObservable();  
  }

}