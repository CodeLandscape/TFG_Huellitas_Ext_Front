import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArchivoAsociacion } from '../models/archivoAsociacion';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArchivosAsociacionService {

  private idAEditar = new BehaviorSubject<number | null>(null);
  private apiUrl = environment.api.url;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los documentos de la asociación.
   * @returns Observable de un array de ArchivoAsociacion.
   */
  getDocumentosAsociacion() {
    return this.http.get<ArchivoAsociacion[]>(`${this.apiUrl}/archivo-asociacion/info`);
  }

  /**
   * Obtiene un documento por su ID.
   * @param id - ID del documento.
   * @returns Observable del documento en formato Blob.
   */
  getDocumento(id: number) {
    return this.http.get(`${this.apiUrl}/archivo-asociacion/` + id, { responseType: 'blob' });
  }

  /**
   * Elimina un documento por su ID.
   * @param id - ID del documento a eliminar.
   * @returns Observable de la respuesta HTTP.
   */
  deleteDocumento(id: number) {
    return this.http.delete(`${this.apiUrl}/archivo-asociacion/` + id);
  }

  /**
   * Sube un nuevo documento.
   * @param formData - FormData que contiene el documento a subir.
   * @returns Observable de la respuesta HTTP.
   */
  uploadDocumento(formData: FormData) {
    return this.http.post(`${this.apiUrl}/archivo-asociacion/upload`, formData);
  }

  /**
   * Establece el ID del documento que se está editando.
   * @param id - ID del documento a editar.
   */
  setIdAEditar(id: number) {
    this.idAEditar.next(id);
  }

  /**
   * Obtiene un observable del ID del documento que se está editando.
   * @returns Observable del ID del documento a editar.
   */
  getIdAEditar() {
    return this.idAEditar.asObservable();
  }

  /**
   * Obtiene la información de un archivo por su ID.
   * @param idArchivo - ID del archivo.
   * @returns Observable de un ArchivoAsociacion.
   */
  getInfoArchivo(idArchivo: number) {
    return this.http.get(`${this.apiUrl}/archivo-asociacion/info-id/${idArchivo}`);
  }

  /**
   * Edita un documento existente.
   * @param formData - FormData que contiene el documento editado.
   * @returns Observable de la respuesta HTTP.
   */
  editDocumento(formData: FormData) {
    return this.http.put(`${this.apiUrl}/archivo-asociacion/edit`, formData);
  }
}
