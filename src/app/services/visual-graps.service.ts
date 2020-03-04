import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class VisualGrapsService {
  private id$ = new Subject<string>();

  constructor() {}

  agregarId(id: string) {
    this.id$.next(id);
  }

  conseguirId$(): Observable<string> {
    return this.id$.asObservable();
  }



}