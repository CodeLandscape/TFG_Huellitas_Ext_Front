import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {Raza} from '../models/raza';
import {TipoAnimal} from '../models/tipoAnimal';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RazaService {

  private apiUrl = environment.api.url;

  constructor(private http: HttpClient) { }
  // obtener todas las razas
  getRazas(){
    return this.http.get<Raza[]>(`${this.apiUrl}/raza/all`);
  }

  // obtener todas las razas por tipo de animal
  getRazasByTipoAnimal(id: number){
    return this.http.get<Raza[]>(`${this.apiUrl}/raza/findByIdTipoAnimal/${id}`);
  }

  // obtener una raza por id
  getRazaById(id: number){
    return this.http.get<Raza>(`${this.apiUrl}/raza/findById/${id}`);
  }

  // actualizar una raza
  updateRaza(raza: Raza){
    return this.http.put<Raza>(`${this.apiUrl}/raza/update`, raza);
  }

  // añadir una raza
  addRaza(raza: Raza){
    return this.http.post<Raza>(`${this.apiUrl}/raza/add`, raza);
  }

  // borrar una raza por id
  deleteRaza(id: number){
    return this.http.delete(`${this.apiUrl}/raza/delete/${id}`);
  }
}
