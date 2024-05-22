import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ArchivoAnimal} from '../models/archivoAnimal';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchivosAnimalService {

  private idAEditar = new BehaviorSubject<number | null>(null);

  constructor(private http: HttpClient) { }

  getDocumentosAnimal(idAnimal: number) {
    return this.http.get<ArchivoAnimal[]>(`http://localhost:8080/api-backend/documento-animal/info/${idAnimal}`);
  }

  getDocumento(id) {
    return this.http.get('http://localhost:8080/api-backend/documento-animal/' + id, {responseType: 'blob'});
  }

  deleteDocumento(id) {
    return this.http.delete('http://localhost:8080/api-backend/documento-animal/' + id);
  }

  setIdAEditar(id) {
    this.idAEditar.next(id);
  }

  uploadDocumento(formData: FormData) {
    return this.http.post('http://localhost:8080/api-backend/documento-animal/upload', formData);
  }

  getIdAEditar() {
    return this.idAEditar.asObservable();
  }

  editDocumento(formData: FormData) {
    return this.http.put('http://localhost:8080/api-backend/documento-animal/edit', formData);
  }

  getInfoArchivo(idArchivo: number) {
    return this.http.get<ArchivoAnimal>(`http://localhost:8080/api-backend/documento-animal/info-id/${idArchivo}`);
  }
}
