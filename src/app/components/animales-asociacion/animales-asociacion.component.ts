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
  imageLoaded: boolean;

  /**
   * @constructor
   * @param {AnimalService} animalService - Servicio para manejar las operaciones de animales.
   * @param {RazaService} razaService - Servicio para manejar las operaciones de razas.
   * @param {TipoService} tipoService - Servicio para manejar las operaciones de tipos de animales.
   * @param {FormBuilder} formBuilder - Servicio para construir formularios reactivos.
   * @param {DomSanitizer} sanitizer - Servicio para manejar y sanitizar URLs.
   * @param {TokenService} authTokenService - Servicio para manejar tokens de autenticación.
   */
  constructor(private animalService: AnimalService,
              private razaService: RazaService,
              private tipoService: TipoService,
              private formBuilder: FormBuilder,
              private sanitizer: DomSanitizer,
              private authTokenService: TokenService) {
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Carga los filtros y los animales asociados al usuario.
   */
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

  /**
   * Cambia la página actual de los animales.
   * @param {number} $event - Número de la nueva página.
   */
  private crearFormAnimal() {
    this.formGroupAnimal = this.formBuilder.group({
      nombre: [''],
      tipoAnimal: [''],
      raza: [''],
    });
  }

  /**
   * Crea el formulario reactivo para buscar animales.
   * @private
   */
  private cargarAnimales(pagina) {
    this.animalService.getAnimalesAsociacion(pagina, this.filtroPorLosQueBuscar).subscribe((animalesRecibidos: Page) => {
      this.animales = animalesRecibidos.content;
      this.animales.forEach((animal: Animal) => {
        this.animalService.getImagenAnimal(animal.id).subscribe((data: any) => {
          const blob = new Blob([data], {type: 'image/jpeg'});
          const url = window.URL.createObjectURL(blob);
          animal.imagen = this.sanitizer.bypassSecurityTrustUrl(url);
          this.imageLoaded = true;
        });
      });
      this.totalPaginas = animalesRecibidos.totalPages;
      this.paginaActual = animalesRecibidos.number;
      this.cargado = true;
    });
  }

  /**
   * Carga los animales de una página específica asociados al usuario.
   * @param {number} pagina - Número de la página a cargar.
   * @private
   */
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

  /**
   * Recarga los animales de la página actual.
   */
  recargarAnimales() {
    this.cargarAnimales(this.paginaActual);
  }
  /**
   * Edita un animal mostrando un modal con el formulario de edición.
   * @param {number} id - ID del animal a editar.
   */
  editarAnimal(id: number) {
    this.animalService.setIdAEditar(id);
    $('#modalEditar').modal('show');
  }

  /**
   * Carga los filtros de razas y tipos de animales.
   * @private
   */
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

  /**
   * Busca animales según los filtros aplicados.
   */
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

  /**
   * Limpia el formulario de búsqueda y recarga los animales.
   */
  limpiarForm() {
    this.formGroupAnimal.reset();
    this.filtroPorLosQueBuscar = [];
    this.cargarAnimales(0);
  }
}
