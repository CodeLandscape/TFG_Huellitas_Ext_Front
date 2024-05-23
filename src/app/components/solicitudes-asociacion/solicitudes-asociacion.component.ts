import { Component, OnInit } from '@angular/core';
import {AnimalPersona} from '../../models/animalPersona';
import {AnimalPersonaServiceService} from '../../services/animal-persona-service.service';
import {ComunService} from '../../services/comun.service';
import {PersonaService} from '../../services/persona.service';
import {switchMap} from 'rxjs/operators';
import {AsociacionService} from '../../services/asociacion.service';
import Swal from "sweetalert2";
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
          // tslint:disable-next-line:only-arrow-functions
          $(document).ready(function() {
            $('.table').DataTable();
          });
          console.log(this.animalPersonas);
        }
      );
    } else {
      console.error('Usuario autenticado no encontrado');
    }
  }

  aceptarSolicitud(id: number, id2: number) {
    const animalPersona = new AnimalPersona();
    animalPersona.idAnimal = {id: id};
    animalPersona.idPersona = {id: id2};

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de aceptar la solicitud',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, aceptar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.animalPersonaService.aceptarSolicitud(animalPersona).subscribe(
          response => {
            console.log(response);
            Swal.fire('Éxito', 'Solicitud aceptada con éxito', 'success');
            this.getAnimalPersonas(); // Recargar los datos
          },
          error => {
            Swal.fire('Error', 'Hubo un error al aceptar la solicitud', 'error');
          }
        );
      }
    });
  }

  rechazarSolicitud(id: number, id2: number) {
    const animalPersona = new AnimalPersona();
    animalPersona.idAnimal = {id: id};
    animalPersona.idPersona = {id: id2};

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de rechazar la solicitud',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, rechazar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.animalPersonaService.rechazarSolicitud(animalPersona).subscribe(
          response => {
            console.log(response);
            Swal.fire('Éxito', 'Solicitud rechazada con éxito', 'success');
            this.getAnimalPersonas(); // Recargar los datos
          },
          error => {
            Swal.fire('Error', 'Hubo un error al rechazar la solicitud', 'error');
          }
        );
      }
    });
  }
}
