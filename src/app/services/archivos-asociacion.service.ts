import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ArchivoAsociacion} from '../models/archivoAsociacion';

@Injectable({
  providedIn: 'root'
})
export class ArchivosAsociacionService {

  constructor(private http: HttpClient) { }

  getDocumentosAsociacion() {
    return this.http.get<ArchivoAsociacion[]>('http://localhost:8080/api-backend/archivo-asociacion/info');
  }

  getDocumento(id) {
    return this.http.get('http://localhost:8080/api-backend/archivo-asociacion/' + id, {responseType: 'blob'});
  }
}
