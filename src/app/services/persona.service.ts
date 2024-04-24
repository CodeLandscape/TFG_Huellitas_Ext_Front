import { Injectable } from '@angular/core';
import {Usuario} from '../models/usuario';
import {Provincia} from '../models/provincia';
import {Observable, of} from 'rxjs';
import {Persona} from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  personaEjemplo: Persona = new Persona(1, new Usuario(1, new Provincia(1, 'Badajoz'), 'usuario@gmail.com', 'Badajoz', '1234', 'Calle Falsa 123', '666666666', true), 'Juana', 'Pérez', '12345678A');

  constructor() { }

  getPersonaSesion(): Observable<Persona> {
    return of(this.personaEjemplo);
  }

  actualizarPersona(id: number, value: any) {
    console.log(id);
    console.log(value);
    return of(true);
  }

  darDeBaja(id: number) {
    console.log(id);
    return of(true);
  }
}
