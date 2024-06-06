import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { AnimalPersona } from '../models/animalPersona';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnimalPersonaServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.api.url;

  /**
   * Obtiene una lista de todas las relaciones Animal-Persona.
   * @returns Observable de un array de AnimalPersona.
   */
  getAnimalPersonas(): Observable<AnimalPersona[]> {
    return this.http.get<AnimalPersona[]>(`${this.apiUrl}/animalPersona/all`).pipe(
      catchError(err => {
        console.error('Error al obtener los datos', err);
        return throwError(err);
      })
    );
  }

  /**
   * Obtiene una lista de relaciones Animal-Persona por ID de persona.
   * @param id - ID de la persona.
   * @returns Observable de un array de AnimalPersona.
   */
  getAnimalPersonasByPersonaId(id: number): Observable<AnimalPersona[]> {
    return this.http.get<AnimalPersona[]>(`${this.apiUrl}/animalPersona/persona/${id}`).pipe(
      catchError(err => {
        console.error('Error al obtener los datos', err);
        return throwError(err);
      })
    );
  }

  /**
   * Obtiene una lista de relaciones Animal-Persona por ID de asociación.
   * @param id - ID de la asociación.
   * @returns Observable de un array de AnimalPersona.
   */
  getAnimalPersonasByAsociacionId(id: number): Observable<AnimalPersona[]> {
    return this.http.get<AnimalPersona[]>(`${this.apiUrl}/animalPersona/asociacion/${id}`).pipe(
      catchError(err => {
        console.error('Error al obtener los datos', err);
        return throwError(err);
      })
    );
  }

  /**
   * Obtiene una lista de relaciones Animal-Persona por ID de animal.
   * @param id - ID del animal.
   * @returns Observable de un array de AnimalPersona.
   */
  getAnimalPersonasByAnimalId(id: number): Observable<AnimalPersona[]> {
    return this.http.get<AnimalPersona[]>(`${this.apiUrl}/animalPersona/${id}`).pipe(
      catchError(err => {
        console.error('Error al obtener los datos', err);
        return throwError(err);
      })
    );
  }

  /**
   * Solicita la adopción de un animal.
   * @param animalPersona - Objeto AnimalPersona que representa la solicitud de adopción.
   * @returns Observable de la respuesta HTTP.
   */
  solicitarAdopcion(animalPersona: AnimalPersona): Observable<any> {
    return this.http.post(`${this.apiUrl}/animalPersona/add`, animalPersona).pipe(
      catchError(err => {
        console.error('Error al solicitar la adopción', err);
        return throwError(err);
      })
    );
  }

  /**
   * Acepta una solicitud de adopción.
   * @param animalPersona - Objeto AnimalPersona que representa la solicitud de adopción a aceptar.
   * @returns Observable de la respuesta HTTP.
   */
  aceptarSolicitud(animalPersona: AnimalPersona): Observable<any> {
    return this.http.put(`${this.apiUrl}/animalPersona/updateEstado`, animalPersona).pipe(
      catchError(err => {
        console.error('Error al aceptar la solicitud', err);
        return throwError(err);
      })
    );
  }

  /**
   * Rechaza una solicitud de adopción.
   * @param animalPersona - Objeto AnimalPersona que representa la solicitud de adopción a rechazar.
   * @returns Observable de la respuesta HTTP.
   */
  rechazarSolicitud(animalPersona: AnimalPersona): Observable<any> {
    // @ts-ignore
    return this.http.put(`${this.apiUrl}/animalPersona/deleteSolicitud`, animalPersona).pipe(
      catchError(err => {
        console.error('Error al rechazar la solicitud', err);
        return throwError(err);
      })
    );
  }
}
