import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArchivoAnimal } from '../models/archivoAnimal';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArchivosAnimalService {

  private idAEditar = new BehaviorSubject<number | null>(null);
  private apiUrl = environment.api.url;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los documentos asociados a un animal por su ID.
   * @param idAnimal - ID del animal.
   * @returns Observable de un array de ArchivoAnimal.
   */
  getDocumentosAnimal(idAnimal: number) {
    return this.http.get<ArchivoAnimal[]>(`${this.apiUrl}/documento-animal/info/${idAnimal}`);
  }

  /**
   * Obtiene un documento por su ID.
   * @param id - ID del documento.
   * @returns Observable del documento en formato Blob.
   */
  getDocumento(id: number) {
    return this.http.get(`${this.apiUrl}/documento-animal/` + id, { responseType: 'blob' });
  }

  /**
   * Elimina un documento por su ID.
   * @param id - ID del documento a eliminar.
   * @returns Observable de la respuesta HTTP.
   */
  deleteDocumento(id: number) {
    return this.http.delete(`${this.apiUrl}/documento-animal/` + id);
  }

  /**
   * Establece el ID del documento que se está editando.
   * @param id - ID del documento a editar.
   */
  setIdAEditar(id: number) {
    this.idAEditar.next(id);
  }

  /**
   * Sube un nuevo documento.
   * @param formData - FormData que contiene el documento a subir.
   * @returns Observable de la respuesta HTTP.
   */
  uploadDocumento(formData: FormData) {
    return this.http.post(`${this.apiUrl}/documento-animal/upload`, formData);
  }

  /**
   * Obtiene un observable del ID del documento que se está editando.
   * @returns Observable del ID del documento a editar.
   */
  getIdAEditar() {
    return this.idAEditar.asObservable();
  }

  /**
   * Edita un documento existente.
   * @param formData - FormData que contiene el documento editado.
   * @returns Observable de la respuesta HTTP.
   */
  editDocumento(formData: FormData) {
    return this.http.put(`${this.apiUrl}/documento-animal/edit`, formData);
  }

  /**
   * Obtiene la información de un archivo por su ID.
   * @param idArchivo - ID del archivo.
   * @returns Observable de un ArchivoAnimal.
   */
  getInfoArchivo(idArchivo: number) {
    return this.http.get<ArchivoAnimal>(`${this.apiUrl}/documento-animal/info-id/${idArchivo}`);
  }
}
