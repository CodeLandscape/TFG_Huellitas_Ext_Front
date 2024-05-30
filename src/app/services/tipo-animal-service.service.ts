import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TipoAnimal} from '../models/tipoAnimal';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoAnimalServiceService {

  private apiUrl = environment.api.url;

  constructor(private http: HttpClient) { }
  // obtener todos los tipos de animal
  getTipoAnimales(){
    return this.http.get<TipoAnimal[]>(`${this.apiUrl}/tipoAnimal/all`);
  }

// obtener un tipo de animal por id
  getTipoAnimalById(id: number){
    return this.http.get<TipoAnimal>(`${this.apiUrl}/tipoAnimal/findById/${id}`);
  }

  // añadir un nuevo tipo de animal
  addTipoAnimal(tipoAnimal: TipoAnimal){
    return this.http.post<TipoAnimal>(`${this.apiUrl}/tipoAnimal/add`, tipoAnimal);
  }

  // borrar un tipo de animal por id
  deleteTipoAnimal(id: number){
    return this.http.delete(`${this.apiUrl}/tipoAnimal/delete/${id}`);
  }
}
