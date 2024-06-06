import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoAnimal } from '../models/tipoAnimal';
import { environment } from '../../environments/environment';

/**
 * Servicio para manejar operaciones relacionadas con los tipos de animales.
 *
 * @@Injectable
 */
@Injectable({
  providedIn: 'root'
})
export class TipoAnimalServiceService {

  /** URL base de la API */
  private apiUrl = environment.api.url;

  /**
   * Constructor que inyecta el HttpClient para realizar peticiones HTTP.
   *
   * @param {HttpClient} http - Cliente HTTP para realizar las peticiones.
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista de todos los tipos de animales.
   *
   * @returns {Observable<TipoAnimal[]>} Observable que emite un arreglo de tipos de animales.
   */
  getTipoAnimales() {
    return this.http.get<TipoAnimal[]>(`${this.apiUrl}/tipoAnimal/all`);
  }

  /**
   * Obtiene un tipo de animal por su ID.
   *
   * @param {number} id - ID del tipo de animal.
   * @returns {Observable<TipoAnimal>} Observable que emite el tipo de animal correspondiente al ID proporcionado.
   */
  getTipoAnimalById(id: number) {
    return this.http.get<TipoAnimal>(`${this.apiUrl}/tipoAnimal/findById/${id}`);
  }

  /**
   * Añade un nuevo tipo de animal.
   *
   * @param {TipoAnimal} tipoAnimal - El nuevo tipo de animal a añadir.
   * @returns {Observable<TipoAnimal>} Observable que emite el tipo de animal añadido.
   */
  addTipoAnimal(tipoAnimal: TipoAnimal) {
    return this.http.post<TipoAnimal>(`${this.apiUrl}/tipoAnimal/add`, tipoAnimal);
  }

  /**
   * Borra un tipo de animal por su ID.
   *
   * @param {number} id - ID del tipo de animal a borrar.
   * @returns {Observable<void>} Observable que emite la respuesta de la operación de borrado.
   */
  deleteTipoAnimal(id: number) {
    return this.http.delete(`${this.apiUrl}/tipoAnimal/delete/${id}`);
  }
}
