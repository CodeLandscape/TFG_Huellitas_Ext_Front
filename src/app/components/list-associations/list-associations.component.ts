import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AsociacionService} from '../../services/asociacion.service';
import {Asociacion} from '../../interfaces/associations.interface';
import {map} from 'rxjs/operators';
declare var $: any; // Declaración de jQuery

@Component({
  selector: 'app-list-associations',
  templateUrl: './list-associations.component.html',
  styleUrls: ['./list-associations.component.css']
})
export class ListAssociationsComponent implements AfterViewInit {
  public asociaciones: Asociacion[] = [];
  columns = [
    { name: 'nombre', title: 'Nombre' },
    { name: 'poblacion', title: 'Población' },
    { name: 'provincia', title: 'Provincia' },
    { name: 'estado', title: 'Estado' },
    { name: 'opciones', title: 'Opciones' }
  ];

  constructor(private asociacionService: AsociacionService) {
    this.asociacionService.getAsociaciones().pipe(
      map((data: any[]) =>
        data.map(item => ({
          id: item.id,
          nombre: item.nombre,
          usuario: {
            id: item.usuario.id,
            provincia: item.usuario.provincia,
            rol: item.usuario.rol,
            correo: item.usuario.correo,
            poblacion: item.usuario.poblacion,
            password: item.usuario.password,
            direccion: item.usuario.direccion,
            tlf: item.usuario.tlf,
            activo: item.usuario.activo
          },
          cif: item.cif
        }))
      )
    ).subscribe((asociaciones: Asociacion[]) => {
      this.asociaciones = asociaciones;
      console.log(asociaciones);
      this.initializeDataTable();
    });
  }

  ngAfterViewInit(): void {
  }

  initializeDataTable(): void {
    $(document).ready(function() {
      $('#datatable').DataTable({
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,
      });
    });
  }
}
