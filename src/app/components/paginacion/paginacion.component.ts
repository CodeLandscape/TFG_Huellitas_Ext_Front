import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent implements OnInit, OnChanges {
  @Input() actual = 0;
  @Input() total = 0;

  @Output() goTo: EventEmitter<number> = new EventEmitter<number>();

  pages: number[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  goToPage(page: number): void {
    this.goTo.emit(page);
    window.scrollTo(0, 0);
  }

  getPages(current: number, total: number): number[] {
    if (total <= 9) {
      return [...Array(total).keys()].map(x => ++x);
    }

    let pages = [];
    if (current <= 5) {
      pages = [1, 2, 3, 4, 5, 6, 7,  -1, total];
    } else if (current > 5 && current <= total - 5) {
      pages = [1, -1, current - 2 , current - 1, current, current + 1, current + 2,  -1, total];
    } else if (current > total - 5) {
      pages = [1, -1, total - 6, total - 5, total - 4, total - 3, total - 2, total - 1, total];
    }

    return pages;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.actual && changes.actual.currentValue !== undefined) ||
      (changes.total && changes.total.currentValue !== undefined)) {
      this.pages = this.getPages(this.actual + 1, this.total);
    }
  }


}
