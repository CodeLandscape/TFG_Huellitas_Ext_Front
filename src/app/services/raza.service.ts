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

  getRazas() {
    return this.http.get<Raza[]>('http://localhost:8080/api-backend/raza/all');
  }
}
