import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ArchivosAsociacionService} from '../../services/archivos-asociacion.service';
import Swal from 'sweetalert2';
import {ArchivoAsociacion} from '../../models/archivoAsociacion';

declare var $: any;

@Component({
  selector: 'app-form-editar-archivo-asoc',
  templateUrl: './form-editar-archivo-asoc.component.html',
  styleUrls: ['./form-editar-archivo-asoc.component.css']
})
export class FormEditarArchivoAsocComponent implements OnInit {

  formGroupArchivo!: FormGroup;
  cargado = false;
  @Output() recargar = new EventEmitter<any>();
  idArchivo!: number;

  fileName: string | undefined;
  selectedFile: File | null = null;

  /**
   * Constructor para inicializar los servicios necesarios.
   * @param {FormBuilder} formBuilder - Constructor de formularios.
   * @param {ArchivosAsociacionService} archivosAsociacionService - Servicio para manejar los archivos asociados.
   */
  constructor(private formBuilder: FormBuilder,
              private archivosAsociacionService: ArchivosAsociacionService) {
  }

  /** Método que se ejecuta al inicializar el componente. */
  ngOnInit(): void {
    this.crearFormArchivo();
    this.archivosAsociacionService.getIdAEditar().subscribe(id => {
      if (id !== null) {
        this.cargado = false;
        this.idArchivo = id;
        this.cargarDatosArchivo();
      }
    });

  }

  /** Método para crear el FormGroup del formulario de archivo. */
  private crearFormArchivo() {
    this.formGroupArchivo = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(90)]],
      descripcion: ['', [Validators.required, Validators.maxLength(255)]],
      archivo: ['', [this.fileExtensionValidator(['pdf', 'docx', 'doc', 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'])]]
    });
    this.cargado = true;
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

  /**
   * Método para validar un campo del formulario.
   * @param {string} campo - Nombre del campo.
   * @returns {boolean} - Indicador de validez.
   */
  validarCampo(campo: string) {
    return this.formGroupArchivo.get(campo)?.invalid && this.formGroupArchivo.get(campo)?.touched;
  }

  /**
   * Método para obtener el mensaje de error de un campo del formulario.
   * @param {string} campo - Nombre del campo.
   * @returns {string} - Mensaje de error.
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

  /** Método para guardar un archivo. */
  guardarArchivo() {
    if (this.formGroupArchivo.valid) {
      const formData = new FormData();
      formData.append('id', this.idArchivo.toString());
      formData.append('nombre', this.formGroupArchivo.get('nombre')?.value);
      formData.append('descripcion', this.formGroupArchivo.get('descripcion')?.value);
      formData.append('file', this.selectedFile);

      this.archivosAsociacionService.editDocumento(formData).subscribe(() => {
        $('#modalEditarArchivo').modal('hide');
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

  /** Método privado para cargar los datos del archivo. */
  private cargarDatosArchivo() {
    this.archivosAsociacionService.getInfoArchivo(this.idArchivo).subscribe((archivo: ArchivoAsociacion) => {
      this.formGroupArchivo.patchValue({
        nombre: archivo.nombre,
        descripcion: archivo.descripcion
      });
      this.fileName = archivo.ficheroNombre;
      this.cargado = true;
    });
  }
}
