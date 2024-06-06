import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { environment } from '../../environments/environment';

/**
 * Servicio para manejar operaciones relacionadas con los usuarios.
 *
 * @@Injectable
 */
@Injectable({
  providedIn: 'root'
})
export class UsuariosServicesService {

  /** URL base de la API */
  private apiUrl = environment.api.url;

  /**
   * Constructor que inyecta el HttpClient para realizar peticiones HTTP.
   *
   * @param {HttpClient} http - Cliente HTTP para realizar las peticiones.
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista de todos los usuarios.
   *
   * @returns {Observable<Usuario[]>} Observable que emite un arreglo de usuarios.
   */
  getUsuarios() {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuario/all`);
  }

  /**
   * Obtiene un usuario por su ID.
   *
   * @param {number} id - ID del usuario.
   * @returns {Observable<Usuario>} Observable que emite el usuario correspondiente al ID proporcionado.
   */
  getUsuarioById(id: number) {
    return this.http.get<Usuario>(`${this.apiUrl}/usuario/${id}`);
  }
}
