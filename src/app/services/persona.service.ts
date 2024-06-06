import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Persona } from '../models/persona';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

/**
 * Servicio para manejar operaciones relacionadas con las personas.
 *
 * @@Injectable
 */
@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  /** URL base de la API */
  private apiUrl = environment.api.url;

  /**
   * Constructor que inyecta el HttpClient para realizar peticiones HTTP.
   *
   * @param {HttpClient} http - Cliente HTTP para realizar las peticiones.
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene los datos de la persona de la sesión actual.
   *
   * @returns {Observable<Persona>} Observable que emite la persona de la sesión actual.
   */
  getPersonaSesion(): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/persona/sesion`);
  }

  /**
   * Obtiene una persona por su ID.
   *
   * @param {number} id - ID de la persona.
   * @returns {Observable<Persona>} Observable que emite la persona correspondiente al ID proporcionado.
   */
  getPersonaById(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/persona/` + id);
  }

  /**
   * Obtiene una persona por el ID de su usuario.
   *
   * @param {number} id - ID del usuario.
   * @returns {Observable<Persona>} Observable que emite la persona correspondiente al ID del usuario proporcionado.
   */
  getPersonaByUsuarioId(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/persona/usuario/` + id);
  }

  /**
   * Actualiza los datos de una persona.
   *
   * @param {any} value - Datos de la persona a actualizar.
   * @returns {Observable<any>} Observable que emite la respuesta de la operación de actualización.
   */
  actualizarPersona(value: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuario/update`, value);
  }

  /**
   * Da de baja una persona por su ID.
   *
   * @param {number} id - ID de la persona a dar de baja.
   * @returns {Observable<any>} Observable que emite la respuesta de la operación de baja.
   */
  darDeBaja(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuario/baja-sesion/`, null);
  }
}
