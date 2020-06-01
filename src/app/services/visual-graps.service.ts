import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class VisualGrapsService {

  private idGraph$ = new Subject<string>();
  private titleGraph$ = new Subject<string>();
  private closed$ = new Subject<boolean>();

  constructor() {}
  
  setIdGraph(id: string) {
    this.idGraph$.next(id);
  }

  setTitleGraph(title: string) {
    this.titleGraph$.next(title);
  }

  setClose(closed: boolean){
    this.closed$.next(closed);
  }

  getIdGraph(): Observable<string> {
    return this.idGraph$.asObservable();  
  }

  getTitleGraph(): Observable<string> {
    return this.titleGraph$.asObservable();  
  }

  getClose(): Observable<boolean> {
    return this.closed$.asObservable();  
  }

}