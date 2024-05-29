import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AsociacionService} from '../../services/asociacion.service';
import {Asociacion} from '../../interfaces/associations.interface';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';

declare var $: any; // Declaración de jQuery

@Component({
  selector: 'app-list-associations',
  templateUrl: './list-associations.component.html',
  styleUrls: ['./list-associations.component.css']
})
export class ListAssociationsComponent implements AfterViewInit {
  public asociaciones: Asociacion[] = [];
  columns = [
    {name: 'nombre', title: 'Nombre'},
    {name: 'poblacion', title: 'Población'},
    {name: 'provincia', title: 'Provincia'},
    {name: 'estado', title: 'Estado'},
    {name: 'opciones', title: 'Opciones'}
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
        responsive: {
          details: {
            type: 'inline',
            target: 0
          }
        },
        language: {
          url: 'https://cdn.datatables.net/plug-ins/2.0.8/i18n/es-ES.json'
        }
      });
    });
  }

  desactivar(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'La asociación será desactivada y no podrá realizar acciones en la plataforma.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, desactivar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.asociacionService.darDeBaja(id).subscribe(
          response => {
            this.reloadDataTable();
          }
        );
        Swal.fire(
          'Desactivado',
          'La asociación ha sido desactivada.',
          'success'
        );
      }
    });

  }

  reloadDataTable(): void {
    $('#datatable').DataTable().destroy();
    this.initializeDataTable();
  }

  activar(id: number) {
    Swal.fire({
      title: '¿Quiere activar la asociación?',
      text: 'Esto permitirá que la asociación pueda realizar acciones en la plataforma.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, activar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.asociacionService.activarAsociacion(id).subscribe();
        Swal.fire(
          'Activada',
          'La asociación ha sido activada.',
          'success'
        );
        this.reloadDataTable();
      }
    });
  }
}
