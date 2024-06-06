import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Servicio para manejar la recarga del Navbar.
 *
 * @@Injectable
 */
@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  /** Subject para emitir eventos de recarga */
  private reloadSubject = new Subject<void>();

  /**
   * Constructor del servicio NavbarService.
   */
  constructor() { }

  /**
   * Obtiene el observable que emite eventos de recarga.
   *
   * @returns {Observable<void>} Observable que emite eventos de recarga.
   */
  get reloadObservable() {
    return this.reloadSubject.asObservable();
  }

  /**
   * Emite un evento para recargar el Navbar.
   *
   * @returns {void}
   */
  reload() {
    this.reloadSubject.next();
  }
}
