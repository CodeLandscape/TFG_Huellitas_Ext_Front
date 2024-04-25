import { Injectable } from '@angular/core';
import {Usuario} from '../models/usuario';
import {Provincia} from '../models/provincia';
import {Observable, of} from 'rxjs';
import {Persona} from '../models/persona';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(
    private http: HttpClient
  ) { }

  getPersonaSesion(): Observable<Persona> {
    return this.http.get<Persona>('http://localhost:8080/api-backend/persona/' + 1);
  }

  actualizarPersona(id: number, value: any) {
    return this.http.put('http://localhost:8080/api-backend/usuario/' + id, value);
  }

  darDeBaja(id: number) {
    return this.http.put('http://localhost:8080/api-backend/usuario/baja/' + id, null);
  }
}
