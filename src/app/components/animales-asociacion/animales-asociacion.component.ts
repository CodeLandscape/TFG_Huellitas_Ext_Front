import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Animal} from '../../models/animal';
import {AnimalService} from '../../services/animal.service';
import {RazaService} from '../../services/raza.service';
import {TipoService} from '../../services/tipo.service';
import {DomSanitizer} from '@angular/platform-browser';
import {TokenService} from '../../services/token.service';
import {Page} from '../../models/page';
import Swal from 'sweetalert2';
import {Raza} from '../../models/raza';

declare var $: any;
@Component({
  selector: 'app-animales-asociacion',
  templateUrl: './animales-asociacion.component.html',
  styleUrls: ['./animales-asociacion.component.css']
})
export class AnimalesAsociacionComponent implements OnInit {

  formGroupAnimal!: FormGroup;
  isAsoc: boolean;
  idUsuario: number;
  animales: Animal[] = [];
  razasFilter: any[] = [];
  tiposFilter: any[] = [];
  filtroPorLosQueBuscar: any[] = [];
  totalPaginas = 0;
  paginaActual = 0;
  cargado = false;

  constructor(private animalService: AnimalService,
              private razaService: RazaService,
              private tipoService: TipoService,
              private formBuilder: FormBuilder,
              private sanitizer: DomSanitizer,
              private authTokenService: TokenService) {
  }

  ngOnInit(): void {
    this.isAsoc = this.authTokenService.getTokenData().roles === 'ROLE_ASOC';
    this.idUsuario = this.authTokenService.getTokenData().id;
    this.cargarFiltros();
    this.crearFormAnimal();
    this.cargarAnimales(0);
  }

  cambiarDePagina($event: number) {
    this.cargarAnimales($event);
  }

  private crearFormAnimal() {
    this.formGroupAnimal = this.formBuilder.group({
      nombre: [''],
      tipoAnimal: [''],
      raza: [''],
    });
  }

  private cargarAnimales(pagina) {
    this.animalService.getAnimalesAsociacion(pagina, this.filtroPorLosQueBuscar).subscribe((animalesRecibidos: Page) => {
      this.animales = animalesRecibidos.content;
      this.animales.forEach((animal: Animal) => {
        this.animalService.getImagenAnimal(animal.id).subscribe((data: any) => {
          const blob = new Blob([data], {type: 'image/jpeg'});
          const url = window.URL.createObjectURL(blob);
          animal.imagen = this.sanitizer.bypassSecurityTrustUrl(url);
        });
      });
      this.totalPaginas = animalesRecibidos.totalPages;
      this.paginaActual = animalesRecibidos.number;
      this.cargado = true;
    });
  }

  deleteAnimal(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás recuperar el animal!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.animalService.deleteAnimal(id).subscribe(() => {
          Swal.fire(
            '¡Borrado!',
            'El animal ha sido borrado.',
            'success'
          );
          if (this.animales.length === 1 && this.paginaActual > 0) {
            this.paginaActual--;
          }
          this.cargarAnimales(this.paginaActual);
        });
      }
    });
  }

  recargarAnimales() {
    this.cargarAnimales(this.paginaActual);
  }

  editarAnimal(id: number) {
    this.animalService.setIdAEditar(id);
    $('#modalEditar').modal('show');
  }

  private cargarFiltros() {
    this.razaService.getRazas().subscribe((razas: any) => {
      razas.forEach((raza: Raza) => {
        this.razasFilter.push({id: raza.id, nombre: raza.nombre, tipo: raza.tipoAnimal.nombre});
      });
    });
    this.tipoService.getTipos().subscribe((tipos: any) => {
      tipos.forEach((tipo: any) => {
        this.tiposFilter.push({id: tipo.id, nombre: tipo.nombre});
      });
    });
  }

  buscarAnimal() {
    if (this.formGroupAnimal.invalid) { // Validar el formulario
      return Object.values(this.formGroupAnimal.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    console.log(this.formGroupAnimal.value);

    this.filtroPorLosQueBuscar = [];
    if (this.formGroupAnimal.value.nombre) {
      this.filtroPorLosQueBuscar.push({strSearch: this.formGroupAnimal.value.nombre});
    }

    if (this.formGroupAnimal.value.tipoAnimal) {
      this.filtroPorLosQueBuscar.push({idTipoAnimal: this.formGroupAnimal.value.tipoAnimal});
    }

    if (this.formGroupAnimal.value.raza) {
      this.filtroPorLosQueBuscar.push({idRaza: this.formGroupAnimal.value.raza});
    }

    this.cargarAnimales(0);

  }

  limpiarForm() {
    this.formGroupAnimal.reset();
    this.filtroPorLosQueBuscar = [];
    this.cargarAnimales(0);
  }
}
