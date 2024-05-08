import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  fileName: string | undefined;
  selectedFile: File | null = null;
  idAnimal!: number;
  constructor(private razaService: RazaService,
              private animalService: AnimalService,
              private formBuilder: FormBuilder,
              private asociacionService: AsociacionService) {
  }

  ngOnInit(): void {
    this.razaService.getRazas().subscribe(razasRecibidas => {
      razasRecibidas.forEach((raza: Raza) => {
        console.log(raza);
        this.razas.push({id: raza.id, nombre: raza.nombre, tipo: raza.tipoAnimal.nombre});
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
      imagen: ['', [Validators.required, this.fileExtensionValidator(['jpeg', 'jpg', 'png'])]]
    });
  }

  // Validador personalizado para la extensión del archivo
  fileExtensionValidator(allowedExtensions: string[]) {
    // El validador recibe un arreglo con las extensiones permitidas
    return (control: { value: any }) => {
      if (!control.value) {
        return null;
      }
      const fileExtension = control.value.split('.').pop().toLowerCase();
      return allowedExtensions.includes(fileExtension) ? null : { invalidFileType: true };
    };
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
    } else {
      this.fileName = undefined;
    }
  }


  guardarAnimal() {
    if (this.formGroupAnimal.invalid) { // Validar el formulario
      return Object.values(this.formGroupAnimal.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    // Esto se va a sacar del token en el futuro ahora está a lo cutre
    this.formGroupAnimal.value.asociacion = { id : 1 };


    this.animalService.guardarAnimal(this.formGroupAnimal.value).subscribe((data:Animal) => {
      this.idAnimal = data.id;
      this.guardarImagenAnimal(this.idAnimal, this.selectedFile);
      this.formGroupAnimal.reset();
      $('#modalAnadir').modal('hide');
      Swal.fire('Guardado', 'Animal guardado correctamente', 'success');
    });

  }

  private guardarImagenAnimal(idAnimal: number, selectedFile: File) {
    const formData = new FormData();
    if (selectedFile){
      formData.append('file', selectedFile);
    }
    formData.append('idAnimal', idAnimal.toString());
    console.log(formData);
    this.animalService.guardarImagenAnimal(formData).subscribe((data: any) => {
      console.log(data);
      this.fileName = undefined;
      this.selectedFile = null;  // Reiniciar el archivo seleccionado
    });
  }
}
