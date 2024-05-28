import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private reloadSubject = new Subject<void>();
  constructor() { }

  get reloadObservable() {
    return this.reloadSubject.asObservable();
  }

  reload() {
    this.reloadSubject.next();
  }
}
