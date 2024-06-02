import { Component, OnInit } from '@angular/core';
import {ArchivosAsociacionService} from '../../services/archivos-asociacion.service';
import {DomSanitizer} from '@angular/platform-browser';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-archivos-asociacion',
  templateUrl: './archivos-asociacion.component.html',
  styleUrls: ['./archivos-asociacion.component.css']
})
export class ArchivosAsociacionComponent implements OnInit {

  cargado = false;
  documentos: any[] = [];
  imageLoaded: boolean;
  constructor(private archivosAsociacionService: ArchivosAsociacionService,
              private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    this.cargarDocumentos();
  }

  cargarDocumentos() {
    this.archivosAsociacionService.getDocumentosAsociacion().subscribe(documentos => {
      this.documentos = documentos;
      this.documentos.forEach(documento => {
        const extension = documento.ficheroNombre.split('.').pop();
        if (this.isImage(extension)) {
          this.archivosAsociacionService.getDocumento(documento.id).subscribe(imagen => {
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
        this.archivosAsociacionService.deleteDocumento(id).subscribe(() => {
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

  editarArchivo(id) {
    this.archivosAsociacionService.setIdAEditar(id);
    $('#modalEditarArchivo').modal('show');
  }

  descargarArchivo(id) {
    this.archivosAsociacionService.getDocumento(id).subscribe(data => {
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

  isImage(extension: string): boolean {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
    return imageExtensions.includes(extension.toLowerCase());
  }
}
