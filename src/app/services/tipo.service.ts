import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

/**
 * Servicio para manejar operaciones relacionadas con tipos de animales.
 *
 * @@Injectable
 */
@Injectable({
  providedIn: 'root'
})
export class TipoService {

  /** URL base de la API */
  private apiUrl = environment.api.url;

  /**
   * Constructor que inyecta el HttpClient para realizar peticiones HTTP.
   *
   * @param {HttpClient} http - Cliente HTTP para realizar las peticiones.
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista de todos los tipos.
   *
   * @returns {Observable<any>} Observable que emite un arreglo de tipos.
   */
  getTipos() {
    return this.http.get(`${this.apiUrl}/tipoAnimal/all`);
  }
}
