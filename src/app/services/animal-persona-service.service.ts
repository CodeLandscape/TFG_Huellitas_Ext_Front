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
}
