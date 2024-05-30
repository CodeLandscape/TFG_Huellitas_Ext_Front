import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ArchivoAsociacion} from '../models/archivoAsociacion';
import {BehaviorSubject} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ArchivosAsociacionService {

  private idAEditar = new BehaviorSubject<number | null>(null);
  private apiUrl = environment.api.url;

  constructor(private http: HttpClient) { }

  getDocumentosAsociacion() {
    return this.http.get<ArchivoAsociacion[]>(`${this.apiUrl}/archivo-asociacion/info`);
  }

  getDocumento(id) {
    return this.http.get(`${this.apiUrl}/archivo-asociacion/` + id, {responseType: 'blob'});
  }

  deleteDocumento(id) {
    return this.http.delete(`${this.apiUrl}/archivo-asociacion/` + id);
  }

  uploadDocumento(formData: FormData) {
    return this.http.post(`${this.apiUrl}/archivo-asociacion/upload`, formData);
  }

  setIdAEditar(id: number) {
    this.idAEditar.next(id);
  }

  getIdAEditar() {
    return this.idAEditar.asObservable();
  }

  getInfoArchivo(idArchivo: number) {
    return this.http.get(`${this.apiUrl}/archivo-asociacion/info-id/${idArchivo}`);
  }

  editDocumento(formData: FormData) {
    return this.http.put(`${this.apiUrl}/archivo-asociacion/edit`, formData);
  }
}
