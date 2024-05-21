import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Usuario} from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosServicesService {

  constructor(private http: HttpClient) { }

  getUsuarios() {
    return this.http.get<Usuario[]>('http://localhost:8080/api-backend/usuario/all');
  }
  getUsuarioById(id: number) {
    return this.http.get<Usuario>(`http://localhost:8080/api-backend/usuario/${id}`);
  }
}
