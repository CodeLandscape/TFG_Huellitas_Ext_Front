import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {TipoAnimalServiceService} from '../../services/tipo-animal-service.service';
import {TipoAnimal} from '../../models/tipoAnimal';
import Swal from 'sweetalert2';
import {Raza} from '../../models/raza';
import {ActivatedRoute} from '@angular/router';
import {RazaService} from '../../services/raza.service';

declare var $: any;

/**
 * Componente que gestiona la lista de razas de animales y sus operaciones relacionadas.
 */
@Component({
  selector: 'app-raza',
  templateUrl: './raza.component.html',
  styleUrls: ['./raza.component.css']
})
export class RazaComponent implements OnInit {
  /** Lista de razas. */
  razas: Raza[] = [];

  /** Indica si los datos han sido cargados. */
  cargado = false;

  /** El tipo de animal asociado a las razas. */
  tipoAnimal: TipoAnimal;

  /** El ID de la raza que se está editando. */
  editRazaId: number;

  /** El nombre de la raza que se está editando. */
  editRazaName: string;

  /** Grupo de formularios para añadir una nueva raza. */
  addRazaForm = this.fb.group({
    newRaza: ['', Validators.required]
  });

  /** Grupo de formularios para editar una raza existente. */
  editRazaForm = this.fb.group({
    editRazaName: ['', Validators.required]
  });

  /**
   * Constructor del componente RazaComponent.
   *
   * @param fb - Servicio FormBuilder para crear grupos de formularios.
   * @param tipoAnimalServ - Servicio para obtener datos del tipo de animal.
   * @param route - Servicio ActivatedRoute para acceder a los parámetros de la ruta.
   * @param razaService - Servicio para obtener y manipular datos de las razas.
   */
  constructor(private fb: FormBuilder, private tipoAnimalServ: TipoAnimalServiceService, private route: ActivatedRoute, private razaService: RazaService) {}

  /**
   * Hook del ciclo de vida ngOnInit. Obtiene el tipo de animal y las razas asociadas al inicializar el componente.
   */
  ngOnInit(): void {
    this.getTipoAnimal();
    this.getRazaByTipoAnimal();
  }

  /**
   * Obtiene el tipo de animal basado en el parámetro de la ruta.
   */
  getTipoAnimal(): void {
    const idTipoAnimal = +this.route.snapshot.params['id'];

    this.tipoAnimalServ.getTipoAnimalById(idTipoAnimal).subscribe(tipoAnimal => {
      this.tipoAnimal = tipoAnimal;
    });
  }

  /**
   * Obtiene las razas asociadas al tipo de animal.
   */
  getRazaByTipoAnimal(): void {
    const idTipoAnimal = +this.route.snapshot.params['id'];

    this.razaService.getRazasByTipoAnimal(idTipoAnimal).subscribe(raza => {
      this.razas = raza;
      this.cargado = true;
    });
  }

  /**
   * Añade una nueva raza a la lista.
   */
  addRaza(): void {
    const nombre = this.addRazaForm.get('newRaza').value;
    if (this.razas.some(raza => raza.nombre.toLowerCase() === nombre.toLowerCase())) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La raza ya existe',
      });
      return;
    }
    const raza = new Raza(nombre);
    raza.idTipoAnimal = +this.route.snapshot.params['id'];
    this.razaService.addRaza(raza).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Raza añadida',
        text: 'La raza ha sido añadida con éxito',
      });
      $('#addRazaModal').modal('hide');
      this.getRazaByTipoAnimal(); // Actualizar la lista de razas
    });
  }

  /**
   * Elimina una raza de la lista.
   *
   * @param id - El ID de la raza a eliminar.
   */
  deleteRaza(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, borrar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.razaService.deleteRaza(id).subscribe(() => {
            this.razas = this.razas.filter(tipoAnimal => tipoAnimal.id !== id);
            Swal.fire(
              'Borrado',
              'La raza ha sido borrada.',
              'success'
            );
          }, error => {
            Swal.fire(
              'Error',
              'Existen animales asociados a esta raza, no se puede borrar.',
              'error'
            );
          }
        );
      }
    });
  }

  /**
   * Edita una raza existente.
   */
  editRaza(): void {
    this.razaService.getRazaById(this.editRazaId).subscribe(raza => {
      raza.nombre = this.editRazaForm.get('editRazaName').value;
      raza.idTipoAnimal = raza.tipoAnimal.id;
      this.razaService.updateRaza(raza).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Raza actualizada',
          text: 'La raza ha sido actualizada con éxito',
        });
        $('#editRazaModal').modal('hide');
        this.getRazaByTipoAnimal(); // Actualizar la lista de razas
      });
    });
  }

  /**
   * Abre el modal para editar una raza y establece los valores de la raza a editar.
   *
   * @param raza - La raza a editar.
   */
  openEditModal(raza: Raza): void {
    this.editRazaId = raza.id;
    this.editRazaName = raza.nombre;

    this.editRazaForm.patchValue({editRazaName: this.editRazaName});
  }

}
