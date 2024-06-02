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

  constructor(private animalService: AnimalService,
              private razaService: RazaService,
              private tipoService: TipoService,
              private formBuilder: FormBuilder,
              private sanitizer: DomSanitizer,
              private authTokenService: TokenService) {
  }

  ngOnInit(): void {
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
  recargarAnimales() {
    this.cargarAnimales(this.paginaActual);
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
