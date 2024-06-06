import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * Servicio para manejar operaciones relacionadas con animales.
 */
@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private idAEditar = new BehaviorSubject<number | null>(null);
  private apiUrl = environment.api.url;

  constructor(private http: HttpClient) { }

  /**
   * Guarda un nuevo animal en la base de datos.
   * @param animal - Objeto que representa al animal.
   * @returns Observable de la respuesta HTTP.
   */
  guardarAnimal(animal: any) {
    return this.http.post(`${this.apiUrl}/animal/add`, animal);
  }

  /**
   * Obtiene una lista de animales con paginación y filtros.
   * @param pagina - Número de la página a obtener.
   * @param filtro - Array de filtros a aplicar.
   * @returns Observable de la respuesta HTTP.
   */
  getAnimales(pagina: number, filtro: any[]) {
    let params = new HttpParams().set('page', pagina.toString());

    if (filtro && filtro.length > 0) {
      filtro.forEach((param) => {
        for (let key in param) {
          params = params.set(key, param[key]);
        }
      });
    }

    return this.http.get(`${this.apiUrl}/animal/all`, { params: params });
  }

  /**
   * Obtiene una lista de animales de una asociación con paginación y filtros.
   * @param pagina - Número de la página a obtener.
   * @param filtro - Array de filtros a aplicar.
   * @returns Observable de la respuesta HTTP.
   */
  getAnimalesAsociacion(pagina: number, filtro: any[]) {
    let params = new HttpParams().set('page', pagina.toString());

    params = params.set('filtrarPorAsociacion', true);

    if (filtro && filtro.length > 0) {
      filtro.forEach((param) => {
        for (let key in param) {
          params = params.set(key, param[key]);
        }
      });
    }

    return this.http.get(`${this.apiUrl}/animal/all`, { params: params });
  }

  /**
   * Elimina un animal por su ID.
   * @param id - ID del animal a eliminar.
   * @returns Observable de la respuesta HTTP.
   */
  deleteAnimal(id: number) {
    return this.http.delete(`${this.apiUrl}/animal/delete/${id}`);
  }

  /**
   * Obtiene un animal por su ID.
   * @param id - ID del animal a obtener.
   * @returns Observable de la respuesta HTTP.
   */
  getAnimal(id: number) {
    return this.http.get(`${this.apiUrl}/animal/findById/${id}`);
  }

  /**
   * Establece el ID del animal que se está editando.
   * @param id - ID del animal a editar.
   */
  setIdAEditar(id: number) {
    this.idAEditar.next(id);
  }

  /**
   * Obtiene un observable del ID del animal que se está editando.
   * @returns Observable del ID del animal a editar.
   */
  getIdAEditar() {
    return this.idAEditar.asObservable();
  }

  /**
   * Actualiza la información de un animal.
   * @param id - ID del animal a actualizar.
   * @param animal - Objeto con la nueva información del animal.
   * @returns Observable de la respuesta HTTP.
   */
  actualizarAnimal(id: number, animal: any) {
    return this.http.put(`${this.apiUrl}/animal/update/${id}`, animal);
  }

  /**
   * Guarda una imagen del animal.
   * @param formData - FormData que contiene la imagen del animal.
   * @returns Observable de la respuesta HTTP.
   */
  guardarImagenAnimal(formData: FormData) {
    return this.http.post(`${this.apiUrl}/imagen-animal/upload`, formData);
  }

  /**
   * Obtiene la imagen de un animal por su ID.
   * @param idAnimal - ID del animal cuya imagen se desea obtener.
   * @returns Observable de la imagen en formato Blob.
   */
  getImagenAnimal(idAnimal: number) {
    return this.http.get(`${this.apiUrl}/imagen-animal/animal/${idAnimal}`, { responseType: 'blob' });
  }

  /**
   * Obtiene la información de la imagen de un animal por su ID.
   * @param idAnimal - ID del animal cuya información de imagen se desea obtener.
   * @returns Observable de la respuesta HTTP.
   */
  getInfoImagenAnimal(idAnimal: number) {
    return this.http.get(`${this.apiUrl}/imagen-animal/info/${idAnimal}`);
  }
}
