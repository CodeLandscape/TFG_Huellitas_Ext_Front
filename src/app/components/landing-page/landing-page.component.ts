import { Component, ElementRef, OnInit } from '@angular/core';

/**
 * Componente para la página de inicio.
 *
 * @@Component
 */
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  /**
   * Constructor que inyecta ElementRef para manipulación del DOM.
   *
   * @param {ElementRef} elementRef - Referencia al elemento del DOM del componente.
   */
  constructor(private elementRef: ElementRef) { }

  /**
   * Método de ciclo de vida de Angular que se llama después de que Angular ha inicializado todas las propiedades del componente.
   *
   * @returns {void}
   */
  ngOnInit(): void {
  }

  /**
   * Desplaza suavemente la vista al contenido principal de la página.
   *
   * @returns {void}
   */
  scrollToContent(): void {
    const contentElement = this.elementRef.nativeElement.querySelector('#content');
    contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

}
