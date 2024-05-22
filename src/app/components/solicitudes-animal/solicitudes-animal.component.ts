import { Component, OnInit } from '@angular/core';
import {AnimalPersona} from '../../models/animalPersona';
import {AnimalPersonaServiceService} from '../../services/animal-persona-service.service';
import {ComunService} from '../../services/comun.service';
import {AsociacionService} from '../../services/asociacion.service';
import {switchMap} from 'rxjs/operators';
import {AnimalService} from '../../services/animal.service';
import {ActivatedRoute} from '@angular/router';
import {Animal} from '../../models/animal';
declare var $: any;
@Component({
  selector: 'app-solicitudes-animal',
  templateUrl: './solicitudes-animal.component.html',
  styleUrls: ['./solicitudes-animal.component.css']
})
export class SolicitudesAnimalComponent implements OnInit {

  animalPersonas: AnimalPersona[];
  nombreAnimal: string; // Nueva propiedad para almacenar el nombre de la asociacion
  constructor(private animalPersonaService: AnimalPersonaServiceService, protected comunService: ComunService, protected animalService: AnimalService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getAnimalPersonas(params['id']);
    });
    console.log('Solicitudes admin');
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    // tslint:disable-next-line:only-arrow-functions
    $(document).ready(function() {
      $('.table').DataTable();
    });
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
        console.log(this.animalPersonas);
      }
    );
  }


  aceptarSolicitud(id: number, id2: number) {
    // Aquí va el código para aceptar la solicitud
  }

  rechazarSolicitud(id: number, id2: number) {
    // Aquí va el código para rechazar la solicitud
  }
}
