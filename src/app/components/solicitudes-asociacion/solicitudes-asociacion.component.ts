import { Component, OnInit } from '@angular/core';
import {AnimalPersona} from '../../models/animalPersona';
import {AnimalPersonaServiceService} from '../../services/animal-persona-service.service';
import {ComunService} from '../../services/comun.service';
import {PersonaService} from '../../services/persona.service';
import {switchMap} from 'rxjs/operators';
import {AsociacionService} from '../../services/asociacion.service';
declare var $: any; // Declaración de jQuery

@Component({
  selector: 'app-solicitudes-asociacion',
  templateUrl: './solicitudes-asociacion.component.html',
  styleUrls: ['./solicitudes-asociacion.component.css']
})
export class SolicitudesAsociacionComponent implements OnInit {

  animalPersonas: AnimalPersona[];
  nombreAsociacion: string; // Nueva propiedad para almacenar el nombre de la asociacion
  constructor(private animalPersonaService: AnimalPersonaServiceService, protected comunService: ComunService, protected asociacionService: AsociacionService) { }
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
      this.asociacionService.getAsociacionByUsuarioId(usuarioAutenticado.id).pipe(
        switchMap(asociacion => {
          console.log(asociacion);
          this.nombreAsociacion = asociacion.nombre; // Asignar el nombre del usuario
          return this.animalPersonaService.getAnimalPersonasByAsociacionId(asociacion.id);
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

  aceptarSolicitud(id: number, id2: number) {

  }

  rechazarSolicitud(id: number, id2: number) {

  }
}
