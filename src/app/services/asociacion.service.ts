import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Asociacion } from '../models/asociacion';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsociacionService {

  private apiUrl = environment.api.url;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene la asociación de la sesión actual.
   * @returns Observable de la asociación de la sesión actual.
   */
  getAsociacionSesion() {
    return this.http.get<Asociacion>(`${this.apiUrl}/asociacion/sesion`);
  }

  /**
   * Obtiene una lista de todas las asociaciones.
   * @returns Observable de un array de asociaciones.
   */
  getAsociaciones() {
    return this.http.get<Asociacion[]>(`${this.apiUrl}/asociacion/all`);
  }

  /**
   * Actualiza la información de una asociación.
   * @param value - Objeto con los datos actualizados de la asociación.
   * @returns Observable de la respuesta HTTP.
   */
  actualizarAsociacion(value: any) {
    return this.http.put(`${this.apiUrl}/usuario/update`, value);
  }

  /**
   * Da de baja una asociación por su ID.
   * @param id - ID de la asociación a dar de baja.
   * @returns Observable de la respuesta HTTP.
   */
  darDeBaja(id: number) {
    return this.http.put(`${this.apiUrl}/usuario/baja/` + id, null);
  }

  /**
   * Da de baja la asociación de la sesión actual.
   * @returns Observable de la respuesta HTTP.
   */
  darDeBajaSesion() {
    return this.http.put(`${this.apiUrl}/usuario/baja-sesion/`, null);
  }

  /**
   * Activa una asociación por su ID.
   * @param id - ID de la asociación a activar.
   * @returns Observable de la respuesta HTTP.
   */
  activarAsociacion(id: number) {
    return this.http.put(`${this.apiUrl}/usuario/alta/` + id, null);
  }

  /**
   * Obtiene una asociación por el ID de su usuario.
   * @param id - ID del usuario.
   * @returns Observable de la asociación.
   */
  getAsociacionByUsuarioId(id: number) {
    return this.http.get<Asociacion>(`${this.apiUrl}/asociacion/usuario/` + id);
  }
}
