import { Component, OnInit } from '@angular/core';
import { AnimalPersonaServiceService } from '../../services/animal-persona-service.service';
import { AnimalPersona } from '../../models/animalPersona';

declare var $: any; // Declaración de jQuery

/**
 * Componente para gestionar las solicitudes de administración.
 *
 * @export
 * @class SolicitudesAdminComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-solicitudes-admin',
  templateUrl: './solicitudes-admin.component.html',
  styleUrls: ['./solicitudes-admin.component.css']
})
export class SolicitudesAdminComponent implements OnInit {

  /**
   * Lista de AnimalPersona.
   *
   * @type {AnimalPersona[]}
   * @memberof SolicitudesAdminComponent
   */
  animalPersonas: AnimalPersona[];

  /**
   * Indicador de carga.
   *
   * @type {boolean}
   * @memberof SolicitudesAdminComponent
   */
  isLoading: boolean = true;

  /**
   * Crea una instancia de SolicitudesAdminComponent.
   *
   * @param {AnimalPersonaServiceService} animalPersonaService Servicio para gestionar AnimalPersona.
   * @memberof SolicitudesAdminComponent
   */
  constructor(private animalPersonaService: AnimalPersonaServiceService) { }

  /**
   * Método de inicialización del componente.
   *
   * @memberof SolicitudesAdminComponent
   */
  ngOnInit(): void {
    this.getAnimalPersonas();
  }

  /**
   * Obtiene la lista de AnimalPersona.
   *
   * @memberof SolicitudesAdminComponent
   */
  getAnimalPersonas(): void {
    this.animalPersonaService.getAnimalPersonas().subscribe(
      animalPersonas => {
        this.animalPersonas = animalPersonas;
        console.log(this.animalPersonas);
        this.isLoading = false;
        // Inicializar la DataTable después de que los datos estén disponibles
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
