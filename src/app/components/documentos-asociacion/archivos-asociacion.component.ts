import { Component, OnInit } from '@angular/core';
import {ArchivosAsociacionService} from '../../services/archivos-asociacion.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-archivos-asociacion',
  templateUrl: './archivos-asociacion.component.html',
  styleUrls: ['./archivos-asociacion.component.css']
})
export class ArchivosAsociacionComponent implements OnInit {

  cargado = false;
  documentos: any[] = [];
  constructor(private archivosAsociacionService: ArchivosAsociacionService,
              private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    this.archivosAsociacionService.getDocumentosAsociacion().subscribe(documentos => {
      this.documentos = documentos;
      this.documentos.forEach(documento => {
        this.archivosAsociacionService.getDocumento(documento.id).subscribe(imagen => {
          const blob = new Blob([imagen], {type: 'image/jpeg'});
          const url = window.URL.createObjectURL(blob);
          documento.imagen = this.sanitizer.bypassSecurityTrustUrl(url);
        });
      });
      this.cargado = true;
    });
  }

  deleteArchivo(id) {

  }

  editarArchivo(id) {

  }

  descargarArchivo(id) {

  }
}
