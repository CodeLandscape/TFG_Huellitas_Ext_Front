import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {Raza} from '../models/raza';
import {TipoAnimal} from '../models/tipoAnimal';

@Injectable({
  providedIn: 'root'
})
export class RazaService {

  constructor(private http: HttpClient) { }
  // obtener todas las razas
  getRazas(){
    return this.http.get<Raza[]>('http://localhost:8080/api-backend/raza/all');
  }

  // obtener todas las razas por tipo de animal
  getRazasByTipoAnimal(id: number){
    return this.http.get<Raza[]>(`http://localhost:8080/api-backend/raza/findByIdTipoAnimal/${id}`);
  }

  // obtener una raza por id
  getRazaById(id: number){
    return this.http.get<Raza>(`http://localhost:8080/api-backend/raza/findById/${id}`);
  }

  // actualizar una raza
  updateRaza(raza: Raza){
    return this.http.put<Raza>('http://localhost:8080/api-backend/raza/update', raza);
  }

  // añadir una raza
  addRaza(raza: Raza){
    return this.http.post<Raza>('http://localhost:8080/api-backend/raza/add', raza);
  }

  // borrar una raza por id
  deleteRaza(id: number){
    return this.http.delete(`http://localhost:8080/api-backend/raza/delete/${id}`);
  }
}
