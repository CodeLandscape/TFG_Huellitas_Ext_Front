import { Component, OnInit } from '@angular/core';
import {AnimalPersonaServiceService} from '../../services/animal-persona-service.service';
import {AnimalPersona} from '../../models/animalPersona';

declare var $: any; // Declaración de jQuery

@Component({
  selector: 'app-solicitudes-admin',
  templateUrl: './solicitudes-admin.component.html',
  styleUrls: ['./solicitudes-admin.component.css']
})
export class SolicitudesAdminComponent implements OnInit {
  animalPersonas: AnimalPersona[];
  constructor(private animalPersonaService: AnimalPersonaServiceService) { }
  ngOnInit(): void {
    this.getAnimalPersonas();
    console.log('Solicitudes admin');
  }

  getAnimalPersonas(): void {
    this.animalPersonaService.getAnimalPersonas().subscribe(
      animalPersonas => {
        this.animalPersonas = animalPersonas;
        console.log(this.animalPersonas);
        // Inicializar la DataTable después de que los datos estén disponibles
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
      }
    );
  }
}
