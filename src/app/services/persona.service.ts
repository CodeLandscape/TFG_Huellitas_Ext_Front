import { Injectable } from '@angular/core';
import {Usuario} from '../models/usuario';
import {Provincia} from '../models/provincia';
import {Observable, of} from 'rxjs';
import {Persona} from '../models/persona';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(
    private http: HttpClient
  ) { }
  private apiUrl = environment.api.url;

  getPersonaSesion(): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/persona/sesion`);
  }

  getPersonaById(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/persona/` + id);
  }

  getPersonaByUsuarioId(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/persona/usuario/` + id);
  }

  actualizarPersona(value: any) {
    return this.http.put(`${this.apiUrl}/usuario/update`, value);
  }


  darDeBaja(id: number) {
    return this.http.put(`${this.apiUrl}/usuario/baja-sesion/`, null);
  }
}
