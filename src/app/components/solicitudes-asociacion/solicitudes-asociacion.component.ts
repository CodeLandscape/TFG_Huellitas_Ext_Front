import { Component, OnInit } from '@angular/core';
import { AnimalPersona } from '../../models/animalPersona';
import { AnimalPersonaServiceService } from '../../services/animal-persona-service.service';
import { ComunService } from '../../services/comun.service';
import { switchMap } from 'rxjs/operators';
import { AsociacionService } from '../../services/asociacion.service';
import Swal from 'sweetalert2';
import { NavbarService } from '../../services/navbar.service';
declare var $: any; // Declaración de jQuery

/**
 * Componente para gestionar las solicitudes de una asociación.
 *
 * @export
 * @class SolicitudesAsociacionComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-solicitudes-asociacion',
  templateUrl: './solicitudes-asociacion.component.html',
  styleUrls: ['./solicitudes-asociacion.component.css']
})
export class SolicitudesAsociacionComponent implements OnInit {

  /**
   * Lista de AnimalPersona.
   *
   * @type {AnimalPersona[]}
   * @memberof SolicitudesAsociacionComponent
   */
  animalPersonas: AnimalPersona[];

  /**
   * Nombre de la asociación.
   *
   * @type {string}
   * @memberof SolicitudesAsociacionComponent
   */
  nombreAsociacion: string;

  /**
   * Indicador de carga.
   *
   * @type {boolean}
   * @memberof SolicitudesAsociacionComponent
   */
  isLoading: boolean = true;

  /**
   * Crea una instancia de SolicitudesAsociacionComponent.
   *
   * @param {AnimalPersonaServiceService} animalPersonaService Servicio para gestionar AnimalPersona.
   * @param {ComunService} comunService Servicio común.
   * @param {AsociacionService} asociacionService Servicio para gestionar Asociación.
   * @param {NavbarService} navbarService Servicio para gestionar la barra de navegación.
   * @memberof SolicitudesAsociacionComponent
   */
  constructor(
    private animalPersonaService: AnimalPersonaServiceService,
    protected comunService: ComunService,
    protected asociacionService: AsociacionService,
    private navbarService: NavbarService
  ) {}

  /**
   * Método de inicialización del componente.
   *
   * @memberof SolicitudesAsociacionComponent
   */
  ngOnInit(): void {
    this.getAnimalPersonas();
  }

  /**
   * Obtiene la lista de AnimalPersona para la asociación del usuario autenticado.
   *
   * @memberof SolicitudesAsociacionComponent
   */
  getAnimalPersonas(): void {
    const usuarioAutenticado = this.comunService.getUsuarioAutenticado();
    if (usuarioAutenticado) {
      this.asociacionService.getAsociacionByUsuarioId(usuarioAutenticado.id).pipe(
        switchMap(asociacion => {
          console.log(asociacion);
          this.nombreAsociacion = asociacion.nombre;
          return this.animalPersonaService.getAnimalPersonasByAsociacionId(asociacion.id);
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
    } else {
      console.error('Usuario autenticado no encontrado');
    }
  }

  /**
   * Acepta una solicitud de AnimalPersona.
   *
   * @param {number} id Id del animal.
   * @param {number} id2 Id de la persona.
   * @memberof SolicitudesAsociacionComponent
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
            this.getAnimalPersonas();
            this.navbarService.reload();
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
   * @param {number} id Id del animal.
   * @param {number} id2 Id de la persona.
   * @memberof SolicitudesAsociacionComponent
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
            this.getAnimalPersonas();
            this.navbarService.reload();
          },
          error => {
            Swal.fire('Error', 'Hubo un error al rechazar la solicitud', 'error');
          }
        );
      }
    });
  }
}
