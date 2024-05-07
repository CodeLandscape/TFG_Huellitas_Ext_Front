import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RazaService} from '../../services/raza.service';
import {AnimalService} from '../../services/animal.service';
import {Raza} from '../../models/raza';
import Swal from 'sweetalert2';
import {Animal} from '../../models/animal';

declare var $: any;

@Component({
  selector: 'app-form-editar-animal',
  templateUrl: './form-editar-animal.component.html',
  styleUrls: ['./form-editar-animal.component.css']
})
export class FormEditarAnimalComponent implements OnInit {

  razas: any[] = [];
  formGroupAnimal!: FormGroup;
  cargado = false;
  idAEditar!: number;
  @Output() recargar = new EventEmitter<any>();

  constructor(private razaService: RazaService,
              private animalService: AnimalService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.animalService.getIdAEditar().subscribe(id => {
      if (id !== null) {
        this.cargado = false;
        this.idAEditar = id;
        this.cargarDatosAnimal();
      }
    });
    this.razaService.getRazas().subscribe(razasRecibidas => {
      razasRecibidas.forEach((raza: Raza) => {
        this.razas.push({id: raza.id, nombre: raza.nombre, tipo: raza.idTipoAnimal.nombre});
      });
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

  actualizarAnimal() {
    if (this.formGroupAnimal.invalid) { // Validar el formulario
      return Object.values(this.formGroupAnimal.controls).forEach(control => {
        control.markAsTouched();
      });
    }


    this.animalService.actualizarAnimal(this.idAEditar, this.formGroupAnimal.value).subscribe(() => {
      this.formGroupAnimal.reset();
      this.recargar.emit();
      $('#modalEditar').modal('hide');
      Swal.fire('Guardado', 'Animal modificado correctamente', 'success');
    });

  }

  private cargarDatosAnimal() {
    this.animalService.getAnimal(this.idAEditar).subscribe((animal: Animal) => {
      animal.fechaNac = new Date(animal.fechaNac);
      animal.fechaLlegadaAsoc = new Date(animal.fechaLlegadaAsoc);

      const fechaNacString = animal.fechaNac.toISOString().split('T')[0];
      const fechaLlegadaAsocString = animal.fechaLlegadaAsoc.toISOString().split('T')[0];

      this.formGroupAnimal.setValue({
        nombre: animal.nombre,
        fechaNac: fechaNacString,
        fechaLlegadaAsoc: fechaLlegadaAsocString,
        observaciones: animal.observaciones,
        raza: animal.raza
      });
      this.cargado = true;
    });
  }
}
