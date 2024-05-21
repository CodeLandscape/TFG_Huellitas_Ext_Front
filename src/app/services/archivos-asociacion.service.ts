import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ArchivoAsociacion} from '../models/archivoAsociacion';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchivosAsociacionService {

  private idAEditar = new BehaviorSubject<number | null>(null);

  constructor(private http: HttpClient) { }

  getDocumentosAsociacion() {
    return this.http.get<ArchivoAsociacion[]>('http://localhost:8080/api-backend/archivo-asociacion/info');
  }

  getDocumento(id) {
    return this.http.get('http://localhost:8080/api-backend/archivo-asociacion/' + id, {responseType: 'blob'});
  }

  deleteDocumento(id) {
    return this.http.delete('http://localhost:8080/api-backend/archivo-asociacion/' + id);
  }

  uploadDocumento(formData: FormData) {
    return this.http.post('http://localhost:8080/api-backend/archivo-asociacion/upload', formData);
  }

  setIdAEditar(id: number) {
    this.idAEditar.next(id);
  }

  getIdAEditar() {
    return this.idAEditar.asObservable();
  }

  getInfoArchivo(idArchivo: number) {
    return this.http.get(`http://localhost:8080/api-backend/archivo-asociacion/info-id/${idArchivo}`);
  }

  editDocumento(formData: FormData) {
    return this.http.put('http://localhost:8080/api-backend/archivo-asociacion/edit', formData);
  }
}
