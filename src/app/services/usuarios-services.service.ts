import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Usuario} from '../models/usuario';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosServicesService {

  private apiUrl = environment.api.url;

  constructor(private http: HttpClient) { }

  getUsuarios() {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuario/all`);
  }
  getUsuarioById(id: number) {
    return this.http.get<Usuario>(`${this.apiUrl}/usuario/${id}`);
  }
}
