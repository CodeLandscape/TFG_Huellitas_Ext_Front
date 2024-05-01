import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RazaService} from '../../services/raza.service';
import {Raza} from '../../models/raza';
import {AnimalService} from '../../services/animal.service';
import {Animal} from '../../models/animal';
import {AsociacionService} from '../../services/asociacion.service';
import {Asociacion} from '../../models/asociacion';
import {Usuario} from '../../models/usuario';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-form-crear-animal',
  templateUrl: './form-crear-animal.component.html',
  styleUrls: ['./form-crear-animal.component.css']
})
export class FormCrearAnimalComponent implements OnInit {

  razas: any[] = [];
  formGroupAnimal!: FormGroup;
  cargado = false;

  constructor(private razaService: RazaService,
              private animalService: AnimalService,
              private formBuilder: FormBuilder,
              private asociacionService: AsociacionService) {
  }

  ngOnInit(): void {
    this.razaService.getRazas().subscribe(razasRecibidas => {
      razasRecibidas.forEach((raza: Raza) => {
        this.razas.push({id: raza.id, nombre: raza.nombre, tipo: raza.idTipoAnimal.nombre});
      });
      this.cargado = true;
    });
    this.crearFormAnimal();
  }

  private crearFormAnimal() {
    this.formGroupAnimal = this.formBuilder.group({
      nombre: [''],
      fechaNac: [''],
      fechaLlegadaAsoc: [''],
      observaciones: [''],
      raza: [''],
    });
  }

  guardarAnimal() {
    if (this.formGroupAnimal.invalid) { // Validar el formulario
      return Object.values(this.formGroupAnimal.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    // Esto se va a sacar del token en el futuro ahora está a lo cutre
    this.formGroupAnimal.value.asociacion = { id : 1 };


    this.animalService.guardarAnimal(this.formGroupAnimal.value).subscribe(() => {
      this.formGroupAnimal.reset();
      $('#modalAnadir').modal('hide');
      Swal.fire('Guardado', 'Animal guardado correctamente', 'success');
    });

  }
}
