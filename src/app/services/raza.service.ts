import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {Raza} from '../models/raza';
import {TipoAnimal} from '../models/tipoAnimal';

@Injectable({
  providedIn: 'root'
})
export class RazaService {

  razasEjemplo: Raza[] = [
    new Raza(1, 'Pastor Alemán', new TipoAnimal(1, 'Perro')),
    new Raza(2, 'Chihuahua', new TipoAnimal(1, 'Perro')),
    new Raza(3, 'Egipcio', new TipoAnimal(2, 'Gato')),
    ];
  constructor(private http: HttpClient) { }

  getRazas() {
    return this.http.get<Raza[]>('http://localhost:8080/api-backend/raza/all');
  }
}
