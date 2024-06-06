import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Raza } from '../models/raza';
import { environment } from '../../environments/environment';

/**
 * Servicio para manejar operaciones relacionadas con las razas de animales.
 *
 * @@Injectable
 */
@Injectable({
  providedIn: 'root'
})
export class RazaService {

  /** URL base de la API */
  private apiUrl = environment.api.url;

  /**
   * Constructor que inyecta el HttpClient para realizar peticiones HTTP.
   *
   * @param {HttpClient} http - Cliente HTTP para realizar las peticiones.
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista de todas las razas.
   *
   * @returns {Observable<Raza[]>} Observable que emite un arreglo de razas.
   */
  getRazas() {
    return this.http.get<Raza[]>(`${this.apiUrl}/raza/all`);
  }

  /**
   * Obtiene la lista de todas las razas por tipo de animal.
   *
   * @param {number} id - ID del tipo de animal.
   * @returns {Observable<Raza[]>} Observable que emite un arreglo de razas correspondiente al tipo de animal proporcionado.
   */
  getRazasByTipoAnimal(id: number) {
    return this.http.get<Raza[]>(`${this.apiUrl}/raza/findByIdTipoAnimal/${id}`);
  }

  /**
   * Obtiene una raza por su ID.
   *
   * @param {number} id - ID de la raza.
   * @returns {Observable<Raza>} Observable que emite la raza correspondiente al ID proporcionado.
   */
  getRazaById(id: number) {
    return this.http.get<Raza>(`${this.apiUrl}/raza/findById/${id}`);
  }

  /**
   * Actualiza una raza.
   *
   * @param {Raza} raza - La raza a actualizar.
   * @returns {Observable<Raza>} Observable que emite la raza actualizada.
   */
  updateRaza(raza: Raza) {
    return this.http.put<Raza>(`${this.apiUrl}/raza/update`, raza);
  }

  /**
   * Añade una nueva raza.
   *
   * @param {Raza} raza - La nueva raza a añadir.
   * @returns {Observable<Raza>} Observable que emite la raza añadida.
   */
  addRaza(raza: Raza) {
    return this.http.post<Raza>(`${this.apiUrl}/raza/add`, raza);
  }

  /**
   * Borra una raza por su ID.
   *
   * @param {number} id - ID de la raza a borrar.
   * @returns {Observable<void>} Observable que emite la respuesta de la operación de borrado.
   */
  deleteRaza(id: number) {
    return this.http.delete(`${this.apiUrl}/raza/delete/${id}`);
  }
}
