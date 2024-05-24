import { Component, OnInit } from '@angular/core';
import {AnimalPersona} from '../../models/animalPersona';
import {AnimalPersonaServiceService} from '../../services/animal-persona-service.service';
import {ComunService} from '../../services/comun.service';
import {AsociacionService} from '../../services/asociacion.service';
import {switchMap} from 'rxjs/operators';
import {AnimalService} from '../../services/animal.service';
import {ActivatedRoute} from '@angular/router';
import {Animal} from '../../models/animal';
import Swal from "sweetalert2";
declare var $: any;
@Component({
  selector: 'app-solicitudes-animal',
  templateUrl: './solicitudes-animal.component.html',
  styleUrls: ['./solicitudes-animal.component.css']
})
export class SolicitudesAnimalComponent implements OnInit {

  animalPersonas: AnimalPersona[];
  nombreAnimal: string; // Nueva propiedad para almacenar el nombre de la asociacion
  // tslint:disable-next-line:max-line-length
  constructor(private animalPersonaService: AnimalPersonaServiceService, protected comunService: ComunService, protected animalService: AnimalService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getAnimalPersonas(params.id);
    });
    console.log('Solicitudes admin');
  }

  getAnimalPersonas(id: number): void {
    this.animalService.getAnimal(id).pipe(
      switchMap((animal: Animal) => {
        console.log(animal);
        this.nombreAnimal = animal.nombre; // Asignar el nombre del animal
        return this.animalPersonaService.getAnimalPersonasByAnimalId(animal.id);
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
            this.getAnimalPersonas(id); // Recargar los datos
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
            this.getAnimalPersonas(id); // Recargar los datos
          },
          error => {
            Swal.fire('Error', 'Hubo un error al rechazar la solicitud', 'error');
          }
        );
      }
    });
  }
}