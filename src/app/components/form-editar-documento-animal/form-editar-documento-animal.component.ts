import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ArchivosAsociacionService} from '../../services/archivos-asociacion.service';
import Swal from 'sweetalert2';
import {ArchivoAsociacion} from '../../models/archivoAsociacion';
import {ArchivosAnimalService} from '../../services/archivos-animal.service';
import {ArchivoAnimal} from '../../models/archivoAnimal';

declare var $: any;
@Component({
  selector: 'app-form-editar-documento-animal',
  templateUrl: './form-editar-documento-animal.component.html',
  styleUrls: ['./form-editar-documento-animal.component.css']
})
export class FormEditarDocumentoAnimalComponent implements OnInit {

  formGroupArchivo!: FormGroup;
  cargado = false;
  @Output() recargar = new EventEmitter<any>();
  idArchivo!: number;

  fileName: string | undefined;
  selectedFile: File | null = null;

  constructor(private formBuilder: FormBuilder,
              private archivosAnimalService: ArchivosAnimalService) {
  }

  ngOnInit(): void {
    this.crearFormArchivo();
    this.archivosAnimalService.getIdAEditar().subscribe(id => {
      if (id !== null) {
        this.cargado = false;
        this.idArchivo = id;
        this.cargarDatosArchivo();
      }
    });

  }

  private crearFormArchivo() {
    this.formGroupArchivo = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(90)]],
      descripcion: ['', [Validators.required, Validators.maxLength(255)]],
      archivo: ['', [this.fileExtensionValidator(['pdf', 'docx', 'doc', 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'])]]
    });
    this.cargado = true;
  }

  // Validador personalizado para la extensión del archivo
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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
    } else {
      this.fileName = undefined;
    }
  }

  validarCampo(campo: string) {
    return this.formGroupArchivo.get(campo)?.invalid && this.formGroupArchivo.get(campo)?.touched;
  }

  getErrorCampo(campo: string) {
    if (this.formGroupArchivo.get(campo)?.hasError('required')) {
      return 'Campo obligatorio';
    }
    if (this.formGroupArchivo.get(campo)?.hasError('maxlength')) {
      return 'Máximo ' + this.formGroupArchivo.get(campo)?.errors?.maxlength.requiredLength + ' caracteres';
    }
    return '';
  }

  guardarArchivo() {
    if (this.formGroupArchivo.valid) {
      const formData = new FormData();
      formData.append('id', this.idArchivo.toString());
      formData.append('nombre', this.formGroupArchivo.get('nombre')?.value);
      formData.append('descripcion', this.formGroupArchivo.get('descripcion')?.value);
      formData.append('file', this.selectedFile);

      this.archivosAnimalService.editDocumento(formData).subscribe(() => {
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

  private cargarDatosArchivo() {
    this.archivosAnimalService.getInfoArchivo(this.idArchivo).subscribe((archivo: ArchivoAnimal) => {
      this.formGroupArchivo.patchValue({
        nombre: archivo.nombre,
        descripcion: archivo.descripcion
      });
      this.fileName = archivo.ficheroNombre;
      this.cargado = true;
    });
  }

}
