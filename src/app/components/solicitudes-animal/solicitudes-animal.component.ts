import { Component, OnInit } from '@angular/core';
import { AnimalPersona } from '../../models/animalPersona';
import { AnimalPersonaServiceService } from '../../services/animal-persona-service.service';
import { ComunService } from '../../services/comun.service';
import { AsociacionService } from '../../services/asociacion.service';
import { switchMap } from 'rxjs/operators';
import { AnimalService } from '../../services/animal.service';
import { ActivatedRoute } from '@angular/router';
import { Animal } from '../../models/animal';
import Swal from 'sweetalert2';
declare var $: any;

/**
 * Componente para gestionar las solicitudes relacionadas con un animal específico.
 *
 * @export
 * @class SolicitudesAnimalComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-solicitudes-animal',
  templateUrl: './solicitudes-animal.component.html',
  styleUrls: ['./solicitudes-animal.component.css']
})
export class SolicitudesAnimalComponent implements OnInit {

  /**
   * Lista de AnimalPersona.
   *
   * @type {AnimalPersona[]}
   * @memberof SolicitudesAnimalComponent
   */
  animalPersonas: AnimalPersona[];

  /**
   * Nombre del animal.
   *
   * @type {string}
   * @memberof SolicitudesAnimalComponent
   */
  nombreAnimal: string;

  /**
   * ID del animal.
   *
   * @type {number}
   * @memberof SolicitudesAnimalComponent
   */
  idAnimal: number;

  /**
   * Indicador de carga.
   *
   * @type {boolean}
   * @memberof SolicitudesAnimalComponent
   */
  isLoading: boolean = true;

  /**
   * Crea una instancia de SolicitudesAnimalComponent.
   *
   * @param {AnimalPersonaServiceService} animalPersonaService Servicio para gestionar AnimalPersona.
   * @param {ComunService} comunService Servicio común.
   * @param {AnimalService} animalService Servicio para gestionar Animal.
   * @param {ActivatedRoute} route Servicio para obtener información sobre la ruta activa.
   * @memberof SolicitudesAnimalComponent
   */
  constructor(
    private animalPersonaService: AnimalPersonaServiceService,
    protected comunService: ComunService,
    protected animalService: AnimalService,
    private route: ActivatedRoute
  ) {}

  /**
   * Método de inicialización del componente.
   *
   * @memberof SolicitudesAnimalComponent
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idAnimal = params.id;
      this.getAnimalPersonas(params.id);
    });
  }

  /**
   * Obtiene la lista de AnimalPersona para el animal especificado.
   *
   * @param {number} id ID del animal.
   * @memberof SolicitudesAnimalComponent
   */
  getAnimalPersonas(id: number): void {
    this.isLoading = true;
    this.animalService.getAnimal(id).pipe(
      switchMap((animal: Animal) => {
        console.log(animal);
        this.nombreAnimal = animal.nombre;
        return this.animalPersonaService.getAnimalPersonasByAnimalId(animal.id);
      })
    ).subscribe(
      animalPersonas => {
        this.animalPersonas = animalPersonas;
        this.isLoading = false;
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
  }

  /**
   * Acepta una solicitud de AnimalPersona.
   *
   * @param {number} id ID del animal.
   * @param {number} id2 ID de la persona.
   * @memberof SolicitudesAnimalComponent
   */
  aceptarSolicitud(id: number, id2: number) {
    const animalPersona = new AnimalPersona();
    animalPersona.idAnimal = { id: id };
    animalPersona.idPersona = { id: id2 };

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
            this.getAnimalPersonas(id);
          },
          error => {
            Swal.fire('Error', 'Hubo un error al aceptar la solicitud', 'error');
          }
        );
      }
    });
  }

  /**
   * Rechaza una solicitud de AnimalPersona.
   *
   * @param {number} id ID del animal.
   * @param {number} id2 ID de la persona.
   * @memberof SolicitudesAnimalComponent
   */
  rechazarSolicitud(id: number, id2: number) {
    const animalPersona = new AnimalPersona();
    animalPersona.idAnimal = { id: id };
    animalPersona.idPersona = { id: id2 };

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
            this.getAnimalPersonas(id);
          },
          error => {
            Swal.fire('Error', 'Hubo un error al rechazar la solicitud', 'error');
          }
        );
      }
    });
  }
}
