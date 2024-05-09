import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TipoAnimal} from '../models/tipoAnimal';

@Injectable({
  providedIn: 'root'
})
export class TipoAnimalServiceService {

  constructor(private http: HttpClient) { }
  // obtener todos los tipos de animal
  getTipoAnimales(){
    return this.http.get<TipoAnimal[]>('http://localhost:8080/api-backend/tipoAnimal/all');
  }

// obtener un tipo de animal por id
  getTipoAnimalById(id: number){
    return this.http.get<TipoAnimal>(`http://localhost:8080/api-backend/tipoAnimal/findById/${id}`);
  }

  // añadir un nuevo tipo de animal
  addTipoAnimal(tipoAnimal: TipoAnimal){
    return this.http.post<TipoAnimal>('http://localhost:8080/api-backend/tipoAnimal/add', tipoAnimal);
  }

  // borrar un tipo de animal por id
  deleteTipoAnimal(id: number){
    return this.http.delete(`http://localhost:8080/api-backend/tipoAnimal/delete/${id}`);
  }
}
