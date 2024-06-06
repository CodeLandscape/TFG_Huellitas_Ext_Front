import {Component, OnInit} from '@angular/core';
import {ArchivosAsociacionService} from '../../services/archivos-asociacion.service';
import {DomSanitizer} from '@angular/platform-browser';
import Swal from 'sweetalert2';
import {ArchivosAnimalService} from '../../services/archivos-animal.service';
import {ActivatedRoute} from '@angular/router';
import {AuthTokenService} from '../../services/auth-token.service';
import {AnimalService} from '../../services/animal.service';
import {Animal} from '../../models/animal';
import {AuthService} from '../../services/auth.service';
import {TokenService} from '../../services/token.service';

declare var $: any;

@Component({
  selector: 'app-documentos-animal',
  templateUrl: './documentos-animal.component.html',
  styleUrls: ['./documentos-animal.component.css']
})
export class DocumentosAnimalComponent implements OnInit {

  cargado = false;
  documentos: any[] = [];
  idAnimal: number;
  idAsociacionAnimal: number;
  isAsoc: boolean;
  idUsuario: number;
  nombreAnimal: string;
  imageLoaded: boolean;

  /**
   * @constructor
   * @param {AnimalService} animalesService - Servicio para manejar las operaciones de animales.
   * @param {ArchivosAnimalService} archivosAnimalService - Servicio para manejar los archivos de animales.
   * @param {DomSanitizer} sanitizer - Servicio para manejar y sanitizar URLs.
   * @param {ActivatedRoute} route - Servicio para manejar las rutas activadas.
   * @param {TokenService} tokenService - Servicio para manejar tokens de autenticación.
   */
  constructor(private animalesService: AnimalService,
              private archivosAnimalService: ArchivosAnimalService,
              private sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private tokenService: TokenService) {
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Carga los documentos del animal y la información del animal.
   */
  ngOnInit(): void {
    this.idAnimal = this.route.snapshot.params.id;
    this.cargarDocumentos();
    this.isAsoc = this.tokenService.getTokenData().roles === 'ROLE_ASOC';
    this.idUsuario = this.tokenService.getTokenData().id;
    this.animalesService.getAnimal(this.idAnimal).subscribe((animal: Animal) => {
      this.nombreAnimal = animal.nombre;
      this.idAsociacionAnimal = animal.asociacion.usuario.id;
    });
  }

  /**
   * Carga los documentos del animal.
   */
  cargarDocumentos() {
    this.archivosAnimalService.getDocumentosAnimal(this.idAnimal).subscribe(documentos => {
      this.documentos = documentos;
      this.documentos.forEach(documento => {
        const extension = documento.ficheroNombre.split('.').pop();
        if (this.isImage(extension)) {
          this.archivosAnimalService.getDocumento(documento.id).subscribe(imagen => {
            const blob = new Blob([imagen], {type: 'image/jpeg'});
            const url = window.URL.createObjectURL(blob);
            documento.imagen = this.sanitizer.bypassSecurityTrustUrl(url);
            this.imageLoaded = true;
          });
        } else {
          documento.imagen = '../assets/imgs/docs.png';
          this.imageLoaded = true;
        }
      });
      this.cargado = true;
    });
  }

  /**
   * Elimina un archivo después de confirmar la acción.
   * @param {number} id - ID del archivo a eliminar.
   */
  deleteArchivo(id) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás recuperar este archivo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.archivosAnimalService.deleteDocumento(id).subscribe(() => {
          this.cargarDocumentos();
          Swal.fire(
            '¡Borrado!',
            'El archivo ha sido borrado',
            'success'
          );
        });
      }
    });
  }

  /**
   * Edita un archivo mostrando un modal con el formulario de edición.
   * @param {number} id - ID del archivo a editar.
   */
  editarArchivo(id) {
    this.archivosAnimalService.setIdAEditar(id);
    $('#modalEditarArchivo').modal('show');
  }

  /**
   * Descarga un archivo del servidor.
   * @param {number} id - ID del archivo a descargar.
   */
  descargarArchivo(id) {
    this.archivosAnimalService.getDocumento(id).subscribe(data => {
      const blob = new Blob([data], {type: 'application/octet-stream'});
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      // tslint:disable-next-line:no-shadowed-variable
      const documento = this.documentos.find(documento => documento.id === id);
      const extensionArchivo = documento.ficheroNombre.split('.').pop();
      a.download = `${documento.nombre}.${extensionArchivo}`; // Añade la extensión al nombre del archivo
      a.click();
    });
  }

  /**
   * Verifica si una extensión de archivo corresponde a una imagen.
   * @param {string} extension - La extensión del archivo.
   * @returns {boolean} - True si la extensión corresponde a una imagen, false de lo contrario.
   */
  isImage(extension: string): boolean {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
    return imageExtensions.includes(extension.toLowerCase());
  }

}
