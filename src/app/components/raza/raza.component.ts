import { Component, OnInit } from '@angular/core';
import {TipoAnimalServiceService} from '../../services/tipo-animal-service.service';
import {TipoAnimal} from '../../models/tipoAnimal';
import Swal from 'sweetalert2';
import {Raza} from '../../models/raza';
import {ActivatedRoute} from '@angular/router';
import {RazaService} from '../../services/raza.service';

@Component({
  selector: 'app-raza',
  templateUrl: './raza.component.html',
  styleUrls: ['./raza.component.css']
})
export class RazaComponent implements OnInit {
  razas: Raza[] = [];

  tipoAnimal: TipoAnimal;
  editRazaId: number;
  editRazaName: string;
  constructor(private tipoAnimalServ: TipoAnimalServiceService, private route: ActivatedRoute, private razaService: RazaService) { }

  ngOnInit(): void {
    this.getTipoAnimal();
    this.getRazaByTipoAnimal();
  }

  getTipoAnimal(): void {
    const idTipoAnimal = +this.route.snapshot.params['id'];

    this.tipoAnimalServ.getTipoAnimalById(idTipoAnimal).subscribe(tipoAnimal => {
      this.tipoAnimal = tipoAnimal;
    });
  }
  getRazaByTipoAnimal(): void {
    const idTipoAnimal = +this.route.snapshot.params['id'];

    this.razaService.getRazasByTipoAnimal(idTipoAnimal).subscribe(raza => {
      this.razas = raza;
    });
  }

  addRaza(nombre: string): void {
    const raza = new Raza(nombre);
    raza.idTipoAnimal = +this.route.snapshot.params['id'];
    this.razaService.addRaza(raza).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Raza añadida',
        text: 'La raza ha sido añadida con éxito',
      });
      this.getRazaByTipoAnimal(); // Actualizar la lista de razas
    });
  }

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
        });
      }
    });
  }
  editRaza(nombre: string): void {
    this.razaService.getRazaById(this.editRazaId).subscribe(raza => {
      raza.nombre = nombre;
      this.razaService.updateRaza(raza).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Raza actualizada',
          text: 'La raza ha sido actualizada con éxito',
        });
        this.getRazaByTipoAnimal(); // Actualizar la lista de razas
      });
    });
  }

  openEditModal(raza: Raza): void {
    // Set the values of the raza to be edited
    this.editRazaId = raza.id;
    this.editRazaName = raza.nombre;

  }

}
