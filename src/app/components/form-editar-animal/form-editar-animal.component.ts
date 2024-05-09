import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RazaService} from '../../services/raza.service';
import {AnimalService} from '../../services/animal.service';
import {Raza} from '../../models/raza';
import Swal from 'sweetalert2';
import {Animal} from '../../models/animal';
import {imagenAnimal} from '../../models/imagenAnimal';

declare var $: any;

@Component({
  selector: 'app-form-editar-animal',
  templateUrl: './form-editar-animal.component.html',
  styleUrls: ['./form-editar-animal.component.css']
})
export class FormEditarAnimalComponent implements OnInit {

  razas: any[] = [];
  formGroupAnimal!: FormGroup;
  imgAnimal!: imagenAnimal;
  cargado = false;
  fileName: string | undefined;
  selectedFile: File | null = null;
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
        this.razas.push({id: raza.id, nombre: raza.nombre, tipo: raza.tipoAnimal.nombre});
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
      imagen: ['', [this.fileExtensionValidator(['jpeg', 'jpg', 'png'])]]
    });
  }

  // Validador personalizado para la extensión del archivo
  fileExtensionValidator(allowedExtensions: string[]) {
    // El validador recibe un arreglo con las extensiones permitidas
    return (control: { value: any }) => {
      if (!control.value) {
        return null;
      }
      console.log(control.value);
      const fileExtension = control.value.split('.').pop().toLowerCase();
      return allowedExtensions.includes(fileExtension) ? null : {invalidFileType: true};
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


  actualizarAnimal() {
    if (this.formGroupAnimal.invalid) { // Validar el formulario
      return Object.values(this.formGroupAnimal.controls).forEach(control => {
        control.markAsTouched();
      });
    }


    this.animalService.actualizarAnimal(this.idAEditar, this.formGroupAnimal.value).subscribe(() => {
      this.formGroupAnimal.reset();
      if (this.selectedFile != null) {
        this.guardarImagenAnimal(this.idAEditar, this.selectedFile);
      }
      this.recargar.emit();
      $('#modalEditar').modal('hide');
      Swal.fire('Guardado', 'Animal modificado correctamente', 'success');
    });

  }

  private cargarDatosAnimal() {
    this.animalService.getAnimal(this.idAEditar).subscribe((animal: Animal) => {
      const fechaNac: Date = new Date(animal.fechaNac);
      fechaNac.setMinutes(fechaNac.getMinutes() - fechaNac.getTimezoneOffset());
      const fechaLlegadaAsoc: Date = new Date(animal.fechaLlegadaAsoc);
      fechaLlegadaAsoc.setMinutes(fechaLlegadaAsoc.getMinutes() - fechaLlegadaAsoc.getTimezoneOffset());

      const fechaNacString = fechaNac.toISOString().split('T')[0];
      const fechaLlegadaAsocString = fechaLlegadaAsoc.toISOString().split('T')[0];

      this.animalService.getInfoImagenAnimal(this.idAEditar).subscribe((imagen: imagenAnimal) => {
        this.imgAnimal = imagen;
        this.fileName = this.imgAnimal.ficheroNombre;
        this.cargado = true;
      });

      this.formGroupAnimal.patchValue({
        nombre: animal.nombre,
        fechaNac: fechaNacString,
        fechaLlegadaAsoc: fechaLlegadaAsocString,
        observaciones: animal.observaciones,
        raza: animal.raza,
        imagen: this.imgAnimal
      });
    });
  }

  private guardarImagenAnimal(idAnimal: number, selectedFile: File) {
    const formData = new FormData();
    if (selectedFile) {
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

  validarCampo(campo: string) {
    return this.formGroupAnimal.get(campo)?.invalid && this.formGroupAnimal.get(campo)?.touched;
  }

  getErrorCampo(campo: string) {
    if (this.formGroupAnimal.get(campo)?.hasError('required')) {
      return 'Campo obligatorio';
    }
    if (this.formGroupAnimal.get(campo)?.hasError('maxlength')) {
      return 'Máximo ' + this.formGroupAnimal.get(campo)?.errors?.maxlength.requiredLength + ' caracteres';
    }
    return '';
  }
}
