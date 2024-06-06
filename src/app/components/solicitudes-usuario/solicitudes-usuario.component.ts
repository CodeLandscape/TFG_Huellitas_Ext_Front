import { Component, OnInit } from '@angular/core';
import { AnimalPersona } from '../../models/animalPersona';
import { AnimalPersonaServiceService } from '../../services/animal-persona-service.service';
import { ComunService } from '../../services/comun.service';
import { TokenService } from '../../services/token.service';
import {PersonaService} from '../../services/persona.service';
import { switchMap } from 'rxjs/operators';
declare var $: any; // Declaración de jQuery

/**
 * Componente para gestionar las solicitudes del usuario.
 *
 * @export
 * @class SolicitudesUsuarioComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-solicitudes-usuario',
  templateUrl: './solicitudes-usuario.component.html',
  styleUrls: ['./solicitudes-usuario.component.css']
})
export class SolicitudesUsuarioComponent implements OnInit {
  /**
   * Lista de AnimalPersona.
   *
   * @type {AnimalPersona[]}
   * @memberof SolicitudesUsuarioComponent
   */
  animalPersonas: AnimalPersona[];

  /**
   * Nombre del usuario.
   *
   * @type {string}
   * @memberof SolicitudesUsuarioComponent
   */
  nombreUsuario: string;

  /**
   * Indicador de carga.
   *
   * @type {boolean}
   * @memberof SolicitudesUsuarioComponent
   */
  isLoading = true;

  /**
   * Crea una instancia de SolicitudesUsuarioComponent.
   *
   * @param {AnimalPersonaServiceService} animalPersonaService Servicio para gestionar AnimalPersona.
   * @param {ComunService} comunService Servicio común.
   * @param {PersonaService} personaService Servicio para gestionar Persona.
   * @memberof SolicitudesUsuarioComponent
   */
  constructor(
    private animalPersonaService: AnimalPersonaServiceService,
    protected comunService: ComunService,
    protected personaService: PersonaService
  ) { }

  /**
   * Método de inicialización del componente.
   *
   * @memberof SolicitudesUsuarioComponent
   */
  ngOnInit(): void {
    this.getAnimalPersonas();
  }

  /**
   * Obtiene la lista de AnimalPersona para el usuario autenticado.
   *
   * @memberof SolicitudesUsuarioComponent
   */
  getAnimalPersonas(): void {
    const usuarioAutenticado = this.comunService.getUsuarioAutenticado();
    if (usuarioAutenticado) {
      this.personaService.getPersonaByUsuarioId(usuarioAutenticado.id).pipe(
        switchMap(persona => {
          console.log(persona);
          // @ts-ignore
          this.nombreUsuario = persona.nombre; // Asignar el nombre del usuario
          // @ts-ignore
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
