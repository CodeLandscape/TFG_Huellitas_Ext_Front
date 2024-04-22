import { Component, OnInit } from '@angular/core';
import { CONFIG } from '../../config/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  appStyle: string = null;

  constructor() { }

  ngOnInit() {
    // Aplicamos estilo en Barra Navegación
    this.appStyle = CONFIG.appStyle;
    // Añadimos el body para que todos los enlaces cojan el color
    const bodyStyle = document.getElementsByTagName('body')[0];
    bodyStyle.classList.add(CONFIG.appStyle);
  }

}
