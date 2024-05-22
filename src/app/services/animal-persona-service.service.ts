import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {AnimalPersona} from '../models/animalPersona';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnimalPersonaServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.api.url;

  getAnimalPersonas(): Observable<AnimalPersona[]> {
    return this.http.get<AnimalPersona[]>(`${this.apiUrl}/animalPersona/all`).pipe(
      catchError(err => {
        console.error('Error al obtener los datos', err);
        return throwError(err);
      })
    );
  }

  getAnimalPersonasByPersonaId(id: number): Observable<AnimalPersona[]> {
    return this.http.get<AnimalPersona[]>(`${this.apiUrl}/animalPersona/persona/${id}`).pipe(
      catchError(err => {
        console.error('Error al obtener los datos', err);
        return throwError(err);
      })
    );
  }

  getAnimalPersonasByAsociacionId(id: number) {
    return this.http.get<AnimalPersona[]>(`${this.apiUrl}/animalPersona/asociacion/${id}`).pipe(
      catchError(err => {
        console.error('Error al obtener los datos', err);
        return throwError(err);
      })
    );
  }

  getAnimalPersonasByAnimalId(id: number) {
    return this.http.get<AnimalPersona[]>(`${this.apiUrl}/animalPersona/${id}`).pipe(
      catchError(err => {
        console.error('Error al obtener los datos', err);
        return throwError(err);
      })
    );
  }

  solicitarAdopcion(animalPersona: AnimalPersona) {
    return this.http.post(`${this.apiUrl}/animalPersona/add`, animalPersona).pipe( catchError(err => { console.error('Error al solicitar la adopción', err); return throwError(err); }));
  }
}
