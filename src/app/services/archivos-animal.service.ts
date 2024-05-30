import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ArchivoAnimal} from '../models/archivoAnimal';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArchivosAnimalService {

  private idAEditar = new BehaviorSubject<number | null>(null);
  private apiUrl = environment.api.url;

  constructor(private http: HttpClient) { }

  getDocumentosAnimal(idAnimal: number) {
    return this.http.get<ArchivoAnimal[]>(`${this.apiUrl}/documento-animal/info/${idAnimal}`);
  }

  getDocumento(id) {
    return this.http.get(`${this.apiUrl}/documento-animal/` + id, {responseType: 'blob'});
  }

  deleteDocumento(id) {
    return this.http.delete(`${this.apiUrl}/documento-animal/` + id);
  }

  setIdAEditar(id) {
    this.idAEditar.next(id);
  }

  uploadDocumento(formData: FormData) {
    return this.http.post(`${this.apiUrl}/documento-animal/upload`, formData);
  }

  getIdAEditar() {
    return this.idAEditar.asObservable();
  }

  editDocumento(formData: FormData) {
    return this.http.put(`${this.apiUrl}/documento-animal/edit`, formData);
  }

  getInfoArchivo(idArchivo: number) {
    return this.http.get<ArchivoAnimal>(`${this.apiUrl}/documento-animal/info-id/${idArchivo}`);
  }
}
