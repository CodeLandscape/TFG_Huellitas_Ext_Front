import { Component, OnInit } from '@angular/core';
import {AnimalPersona} from '../../models/animalPersona';
import {AnimalPersonaServiceService} from '../../services/animal-persona-service.service';
import {ComunService} from "../../services/comun.service";
import {TokenService} from "../../services/token.service";
import {AuthTokenService} from "../../services/auth-token.service";
import {PersonaService} from "../../services/persona.service";
import {switchMap} from "rxjs/operators";
declare var $: any; // Declaración de jQuery

@Component({
  selector: 'app-solicitudes-usuario',
  templateUrl: './solicitudes-usuario.component.html',
  styleUrls: ['./solicitudes-usuario.component.css']
})
export class SolicitudesUsuarioComponent implements OnInit {
  animalPersonas: AnimalPersona[];
  constructor(private animalPersonaService: AnimalPersonaServiceService, private comunService: ComunService, private personaService: PersonaService) { }
  ngOnInit(): void {
    this.getAnimalPersonas();
    console.log('Solicitudes admin');
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    // tslint:disable-next-line:only-arrow-functions
    $(document).ready(function() {
      $('.table').DataTable();
    });
  }

  getAnimalPersonas(): void {
    const usuarioAutenticado = this.comunService.getUsuarioAutenticado();
    if (usuarioAutenticado) {
      this.personaService.getPersonaByUsuarioId(usuarioAutenticado.id).pipe(
        switchMap(persona => {
          console.log(persona);
          return this.animalPersonaService.getAnimalPersonasByPersonaId(persona.id);
        })
      ).subscribe(
        animalPersonas => {
          this.animalPersonas = animalPersonas;
          console.log(this.animalPersonas);
        }
      );
    } else {
      console.error('Usuario autenticado no encontrado');
    }
  }
}
