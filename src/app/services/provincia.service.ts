import { Injectable } from '@angular/core';
import { Provincia } from '../models/provincia';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

/**
 * Servicio para manejar operaciones relacionadas con las provincias.
 *
 * @@Injectable
 */
@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {
  /** URL base de la API */
  private apiUrl = environment.api.url;

  /**
   * Constructor que inyecta el HttpClient para realizar peticiones HTTP.
   *
   * @param {HttpClient} http - Cliente HTTP para realizar las peticiones.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de todas las provincias.
   *
   * @returns {Observable<Provincia[]>} Observable que emite un arreglo de provincias.
   */
  getProvincias() {
    return this.http.get<Provincia[]>(`${this.apiUrl}/provincia/all`);
  }
}
