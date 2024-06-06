import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RazaService} from '../../services/raza.service';
import {AnimalService} from '../../services/animal.service';
import {Animal} from '../../models/animal';
import {Page} from '../../models/page';
import {Raza} from '../../models/raza';
import {TipoService} from '../../services/tipo.service';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthTokenService} from '../../services/auth-token.service';
import {TokenService} from '../../services/token.service';

declare var $: any;

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  formGroupAnimal!: FormGroup;
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
   * Carga los filtros y los animales.
   */
  ngOnInit(): void {
    this.cargarFiltros();
    this.crearFormAnimal();
    this.cargarAnimales(0);
  }

  /**
   * Cambia la página actual de los animales.
   * @param {number} $event - Número de la nueva página.
   */
  cambiarDePagina($event: number) {
    this.cargarAnimales($event);
  }

  /**
   * Crea el formulario reactivo para buscar animales.
   * @private
   */
  private crearFormAnimal() {
    this.formGroupAnimal = this.formBuilder.group({
      nombre: [''],
      tipoAnimal: [''],
      raza: [''],
    });
  }

  /**
   * Carga los animales de una página específica.
   * @param {number} pagina - Número de la página a cargar.
   * @private
   */
  private cargarAnimales(pagina) {
    this.animalService.getAnimales(pagina, this.filtroPorLosQueBuscar).subscribe((animalesRecibidos: Page) => {
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
   * Recarga los animales de la página actual.
   */
  recargarAnimales() {
    this.cargarAnimales(this.paginaActual);
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
