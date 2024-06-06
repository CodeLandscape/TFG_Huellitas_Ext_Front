import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {

  /**
   * @constructor
   * @param {Location} location - Servicio de Angular para interactuar con la URL del navegador.
   */
  constructor(private location: Location) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
  }

  /**
   * Navega a la página anterior en el historial del navegador.
   */
  goBack() {
    this.location.back();
  }

}
