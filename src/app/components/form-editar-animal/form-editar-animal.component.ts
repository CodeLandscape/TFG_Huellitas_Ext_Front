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

  /**
   * Constructor para inicializar los servicios necesarios.
   * @param {RazaService} razaService - Servicio para manejar las razas.
   * @param {AnimalService} animalService - Servicio para manejar los animales.
   * @param {FormBuilder} formBuilder - Constructor de formularios.
   */
  constructor(private razaService: RazaService,
              private animalService: AnimalService,
              private formBuilder: FormBuilder) {
  }

  /** Método que se ejecuta al inicializar el componente. */
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

  /** Método para crear el FormGroup del formulario de animal. */
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

  /**
   * Validador personalizado para la extensión del archivo.
   * @param {string[]} allowedExtensions - Extensiones permitidas.
   * @returns {Function} - Función de validación.
   */
  fileExtensionValidator(allowedExtensions: string[]) {
    // El validador recibe un arreglo con las extensiones permitidas
    return (control: { value: any }) => {
      if (!control.value) {
        return null;
      }
      const fileExtension = control.value.split('.').pop().toLowerCase();
      return allowedExtensions.includes(fileExtension) ? null : {invalidFileType: true};
    };
  }

  /** Método que se ejecuta al seleccionar un archivo. */
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
    } else {
      this.fileName = undefined;
    }
  }

  /** Método para actualizar un animal. */
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
      $('#modalEditar').modal('hide');
      Swal.fire('Guardado', 'Animal modificado correctamente', 'success');
      this.recargar.emit();
    });

  }

  /** Método privado para cargar los datos del animal. */
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

  /** Método privado para guardar la imagen de un animal. */
  private guardarImagenAnimal(idAnimal: number, selectedFile: File) {
    const formData = new FormData();
    if (selectedFile) {
      formData.append('file', selectedFile);
    }
    formData.append('idAnimal', idAnimal.toString());
    this.animalService.guardarImagenAnimal(formData).subscribe((data: any) => {
      this.fileName = undefined;
      this.selectedFile = null;  // Reiniciar el archivo seleccionado
      this.recargar.emit();
    });
  }

  /**
   * Método para validar un campo del formulario.
   * @param {string} campo - Nombre del campo.
   * @returns {boolean} - Indicador de validez.
   */
  validarCampo(campo: string) {
    return this.formGroupAnimal.get(campo)?.invalid && this.formGroupAnimal.get(campo)?.touched;
  }

  /**
   * Método para obtener el mensaje de error de un campo del formulario.
   * @param {string} campo - Nombre del campo.
   * @returns {string} - Mensaje de error.
   */
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
