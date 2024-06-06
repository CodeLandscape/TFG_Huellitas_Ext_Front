import { Component, OnInit } from '@angular/core';
import { TipoAnimalServiceService } from '../../services/tipo-animal-service.service';
import { TipoAnimal } from '../../models/tipoAnimal';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-tipo-animal',
  templateUrl: './tipo-animal.component.html',
  styleUrls: ['./tipo-animal.component.css']
})
export class TipoAnimalComponent implements OnInit {
  tiposAnimal: TipoAnimal[] = [];
  newTipoAnimal = '';
  isAdmin = false;
  cargado = false;

  constructor(private tipoAnimalServ: TipoAnimalServiceService, private router: Router, private tokenService: TokenService) { }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se encarga de obtener la lista de tipos de animales y verificar si el usuario es administrador.
   */
  ngOnInit(): void {
    this.getTiposAnimal();
    this.isAdmin = this.tokenService.getTokenData().roles === 'ROLE_ADMIN';
  }

  /**
   * Obtiene la lista de tipos de animales desde el servicio.
   */
  getTiposAnimal(): void {
    this.tipoAnimalServ.getTipoAnimales().subscribe(tiposAnimal => {
      this.tiposAnimal = tiposAnimal;
      this.cargado = true;
    });
  }

  /**
   * Agrega un nuevo tipo de animal.
   * @param nombre - El nombre del nuevo tipo de animal.
   */
  addTipoAnimal(nombre: string): void {
    const tipoAnimal = new TipoAnimal(nombre);
    this.tipoAnimalServ.addTipoAnimal(tipoAnimal).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Tipo de animal añadido',
        text: 'El tipo de animal ha sido añadido con éxito',
      });
      this.getTiposAnimal(); // Actualizar la lista de tipos de animales
    });
  }

  /**
   * Elimina un tipo de animal.
   * @param id - El ID del tipo de animal a eliminar.
   */
  deleteTipoAnimal(id: number): void {
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
        this.tipoAnimalServ.deleteTipoAnimal(id).subscribe(() => {
          this.tiposAnimal = this.tiposAnimal.filter(tipoAnimal => tipoAnimal.id !== id);
          Swal.fire(
            'Borrado',
            'El tipo de animal ha sido borrado.',
            'success'
          );
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Existen razas asociadas a este tipo de animal. Borra las razas antes de borrar el tipo de animal.',
          });
        });
      }
    });
  }

  /**
   * Navega a la página de razas para un tipo de animal específico.
   * @param id - El ID del tipo de animal.
   */
  verRaza(id: number): void {
    this.router.navigate(['/raza', id]);
  }
}
