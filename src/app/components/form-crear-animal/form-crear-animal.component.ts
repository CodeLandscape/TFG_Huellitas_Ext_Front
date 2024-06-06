import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
  @Output() recargar = new EventEmitter<any>();

  fileName: string | undefined;
  selectedFile: File | null = null;
  idAnimal!: number;

  /**
   * Constructor para inicializar los servicios necesarios.
   * @param razaService Servicio para manejar las razas.
   * @param animalService Servicio para manejar los animales.
   * @param formBuilder Constructor de formularios.
   * @param asociacionService Servicio para manejar asociaciones.
   */
  constructor(private razaService: RazaService,
              private animalService: AnimalService,
              private formBuilder: FormBuilder,
              private asociacionService: AsociacionService) {
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.razaService.getRazas().subscribe(razasRecibidas => {
      razasRecibidas.forEach((raza: Raza) => {
        this.razas.push({id: raza.id, nombre: raza.nombre, tipo: raza.tipoAnimal.nombre});
      });
      this.cargado = true;
    });
    this.crearFormAnimal();
  }

  /**
   * Crea el formulario para el animal.
   */
  private crearFormAnimal() {
    this.formGroupAnimal = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(255)]],
      fechaNac: ['', [Validators.required]],
      fechaLlegadaAsoc: ['', [Validators.required]],
      observaciones: ['', [Validators.required, Validators.maxLength(255)]],
      raza: ['', [Validators.required]],
      imagen: ['', [Validators.required, this.fileExtensionValidator(['jpeg', 'jpg', 'png'])]]
    });
  }

  /**
   * Validador personalizado para la extensión del archivo.
   * @param {string[]} allowedExtensions - Extensiones permitidas.
   * @returns Validador de extensiones de archivo.
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

  /**
   * Maneja la selección de archivos.
   * @param {Event} event - Evento de selección de archivo.
   */
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
    } else {
      this.fileName = undefined;
    }
  }

  /**
   * Guarda un nuevo animal.
   */
  guardarAnimal() {
    if (this.formGroupAnimal.invalid) { // Validar el formulario
      return Object.values(this.formGroupAnimal.controls).forEach(control => {
        control.markAsTouched();
      });
    }


    this.animalService.guardarAnimal(this.formGroupAnimal.value).subscribe((data: Animal) => {
      this.idAnimal = data.id;
      this.guardarImagenAnimal(this.idAnimal, this.selectedFile);
      this.formGroupAnimal.reset();
      $('#modalAnadir').modal('hide');
      Swal.fire('Guardado', 'Animal guardado correctamente', 'success');
    });

  }

  /**
   * Guarda la imagen del animal.
   * @param {number} idAnimal - ID del animal.
   * @param {File} selectedFile - Archivo de imagen seleccionado.
   */
  private guardarImagenAnimal(idAnimal: number, selectedFile: File) {
    const formData = new FormData();
    if (selectedFile) {
      formData.append('file', selectedFile);
    }
    formData.append('idAnimal', idAnimal.toString());
    this.animalService.guardarImagenAnimal(formData).subscribe((data: any) => {
      console.log(data);
      this.fileName = undefined;
      this.selectedFile = null;  // Reiniciar el archivo seleccionado
      this.recargar.emit();
    });
  }

  /**
   * Valida un campo del formulario.
   * @param {string} campo - Nombre del campo.
   * @returns {boolean} `true` si el campo es inválido y ha sido tocado.
   */
  validarCampo(campo: string) {
    return this.formGroupAnimal.get(campo)?.invalid && this.formGroupAnimal.get(campo)?.touched;
  }

  /**
   * Obtiene el mensaje de error para un campo del formulario.
   * @param {string} campo - Nombre del campo.
   * @returns {string} Mensaje de error.
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
