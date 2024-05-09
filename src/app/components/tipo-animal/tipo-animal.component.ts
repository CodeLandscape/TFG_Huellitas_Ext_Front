import { Component, OnInit } from '@angular/core';
import {TipoAnimalServiceService} from '../../services/tipo-animal-service.service';
import {TipoAnimal} from '../../models/tipoAnimal';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tipo-animal',
  templateUrl: './tipo-animal.component.html',
  styleUrls: ['./tipo-animal.component.css']
})
export class TipoAnimalComponent implements OnInit {
  tiposAnimal: TipoAnimal[] = [];

  constructor(private tipoAnimalServ: TipoAnimalServiceService, private router:Router) { }

  ngOnInit(): void {
    this.getTiposAnimal();
  }

  getTiposAnimal(): void {
    this.tipoAnimalServ.getTipoAnimales().subscribe(tiposAnimal => {
      this.tiposAnimal = tiposAnimal;
    });
  }

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
        });
      }
    });
  }

  verRaza(id: number) {
    this.router.navigate(['/raza', id]);
  }
}
