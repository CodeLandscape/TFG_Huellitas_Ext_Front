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
  nombreUsuario: string; // Nueva propiedad para almacenar el nombre del usuario
  isLoading: boolean = true;

  constructor(private animalPersonaService: AnimalPersonaServiceService, protected comunService: ComunService, protected personaService: PersonaService) { }
  ngOnInit(): void {
    this.getAnimalPersonas();
    console.log('Solicitudes admin');
  }

  // tslint:disable-next-line:use-lifecycle-interface


  getAnimalPersonas(): void {
    const usuarioAutenticado = this.comunService.getUsuarioAutenticado();
    if (usuarioAutenticado) {
      this.personaService.getPersonaByUsuarioId(usuarioAutenticado.id).pipe(
        switchMap(persona => {
          console.log(persona);
          this.nombreUsuario = persona.nombre; // Asignar el nombre del usuario
          return this.animalPersonaService.getAnimalPersonasByPersonaId(persona.id);
        })
      ).subscribe(
        animalPersonas => {
          this.animalPersonas = animalPersonas;
          this.isLoading = false;
          // tslint:disable-next-line:only-arrow-functions
          $(document).ready(function() {
            $('#datatable').DataTable({
              pagingType: 'full_numbers',
              pageLength: 10,
              responsive: {
                details: {
                  type: 'inline',
                  target: 0
                }
              },
              language: {
                url: 'https://cdn.datatables.net/plug-ins/2.0.8/i18n/es-ES.json'
              }
            });
          });
          console.log(this.animalPersonas);
        }
      );
    } else {
      console.error('Usuario autenticado no encontrado');
    }
  }
}
