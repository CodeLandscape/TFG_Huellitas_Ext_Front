import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

/**
 * Componente para la paginación de datos.
 *
 * @@Component
 */
@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent implements OnInit, OnChanges {
  /** Página actual */
  @Input() actual = 0;
  /** Total de páginas */
  @Input() total = 0;

  /** Evento emitido al cambiar de página */
  @Output() goTo: EventEmitter<number> = new EventEmitter<number>();

  /** Páginas a mostrar en la paginación */
  pages: number[] = [];

  /**
   * Constructor del componente de paginación.
   */
  constructor() {}

  /**
   * Método de inicialización del componente.
   *
   * @returns {void}
   */
  ngOnInit(): void {}

  /**
   * Navega a una página específica.
   *
   * @param {number} page - Número de página a la que se desea navegar.
   * @returns {void}
   */
  goToPage(page: number): void {
    this.goTo.emit(page);
    window.scrollTo(0, 0);
  }

  /**
   * Obtiene las páginas a mostrar en la paginación.
   *
   * @param {number} current - Página actual.
   * @param {number} total - Total de páginas.
   * @returns {number[]} - Array con las páginas a mostrar.
   */
  getPages(current: number, total: number): number[] {
    if (total <= 9) {
      return [...Array(total).keys()].map(x => ++x);
    }

    let pages = [];
    if (current <= 5) {
      pages = [1, 2, 3, 4, 5, 6, 7, -1, total];
    } else if (current > 5 && current <= total - 5) {
      pages = [1, -1, current - 2, current - 1, current, current + 1, current + 2, -1, total];
    } else if (current > total - 5) {
      pages = [1, -1, total - 6, total - 5, total - 4, total - 3, total - 2, total - 1, total];
    }

    return pages;
  }

  /**
   * Método que se ejecuta cuando hay cambios en las propiedades de entrada.
   * Actualiza las páginas a mostrar cuando cambia la página actual o el total de páginas.
   *
   * @param {SimpleChanges} changes - Cambios detectados en las propiedades de entrada.
   * @returns {void}
   */
  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.actual && changes.actual.currentValue !== undefined) ||
      (changes.total && changes.total.currentValue !== undefined)) {
      this.pages = this.getPages(this.actual + 1, this.total);
    }
  }
}
