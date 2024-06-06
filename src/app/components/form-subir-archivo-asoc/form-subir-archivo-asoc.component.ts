import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ArchivosAsociacionService} from '../../services/archivos-asociacion.service';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-form-subir-archivo-asoc',
  templateUrl: './form-subir-archivo-asoc.component.html',
  styleUrls: ['./form-subir-archivo-asoc.component.css']
})
export class FormSubirArchivoAsocComponent implements OnInit {

  formGroupArchivo!: FormGroup;
  cargado = false;
  @Output() recargar = new EventEmitter<any>();

  fileName: string | undefined;
  selectedFile: File | null = null;

  /**
   * Constructor del componente.
   * @param formBuilder Constructor de FormBuilder para crear formularios reactivos
   * @param archivosAsociacionService Servicio para gestionar archivos de asociación
   */
  constructor(private formBuilder: FormBuilder,
              private archivosAsociacionService: ArchivosAsociacionService) { }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.crearFormArchivo();
  }

  /**
   * Crea el FormGroup para el formulario de carga de archivos.
   */
  private crearFormArchivo() {
    this.formGroupArchivo = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(90)]],
      descripcion: ['', [Validators.required, Validators.maxLength(255)]],
      archivo: ['', [Validators.required, this.fileExtensionValidator(['pdf', 'docx', 'doc', 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'])]]
    });
    this.cargado = true;
  }

  /**
   * Validador personalizado para la extensión del archivo.
   * @param allowedExtensions Extensiones permitidas para los archivos
   * @returns ValidatorFn
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
   * Método para manejar la selección de archivos.
   * @param event Evento de selección de archivos
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
   * Método para validar un campo del formulario.
   * @param campo Nombre del campo a validar
   * @returns true si el campo es inválido y ha sido tocado, de lo contrario false
   */
  validarCampo(campo: string) {
    return this.formGroupArchivo.get(campo)?.invalid && this.formGroupArchivo.get(campo)?.touched;
  }

  /**
   * Obtiene el mensaje de error correspondiente a un campo del formulario.
   * @param campo Nombre del campo
   * @returns Mensaje de error
   */
  getErrorCampo(campo: string) {
    if (this.formGroupArchivo.get(campo)?.hasError('required')) {
      return 'Campo obligatorio';
    }
    if (this.formGroupArchivo.get(campo)?.hasError('maxlength')) {
      return 'Máximo ' + this.formGroupArchivo.get(campo)?.errors?.maxlength.requiredLength + ' caracteres';
    }
    return '';
  }

  /**
   * Método para guardar el archivo cargado.
   */
  guardarArchivo() {
    if (this.formGroupArchivo.valid) {
      const formData = new FormData();
      formData.append('nombre', this.formGroupArchivo.get('nombre')?.value);
      formData.append('descripcion', this.formGroupArchivo.get('descripcion')?.value);
      formData.append('file', this.selectedFile);

      this.archivosAsociacionService.uploadDocumento(formData).subscribe(() => {
        $('#modalSubirArchivo').modal('hide');
        Swal.fire('Guardado', 'Archivo guardado correctamente', 'success');
        this.formGroupArchivo.reset();
        this.fileName = null;
        this.selectedFile = null;
        this.recargar.emit();
      });
    } else {
      this.formGroupArchivo.markAllAsTouched();
    }
  }
}
