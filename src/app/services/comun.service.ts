import { Injectable, EventEmitter } from '@angular/core';
import { ROLES_USUARIO } from '../config/security';
import { HttpClient } from '@angular/common/http';
import { AuthTokenService } from './auth-token.service';
import { CookieService } from 'ngx-cookie-service';

import {Usuario} from '../models/usuario';


export class Load {
  resource: string;
  loaded: boolean;
}

@Injectable()
export class ComunService {
  private isUserLoggedIn = false;
  userLoggedInChanged = new EventEmitter<boolean>();
  loadingClient = new EventEmitter<boolean>();
  private registeredLoads: Load[] = [];
  // private http: HttpClient;
  private usuarioAutenticado: Usuario | undefined;
  constructor(
    private http: AuthTokenService,
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {
    // this.http = httpClient;
    this.isUserLoggedIn = this.cookieService.get('userLoggedIn') === 'true';

  }

  getTokenData() {
    return this.http.getTokenData();
  }

  capitalize(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  setUserLoggedIn(value: boolean): void {
    // Esta función se encarga de cambiar el valor de la variable isUserLoggedIn
    // y de emitir un evento para que los componentes que estén escuchando este evento se enteren de que el valor ha cambiado.
    this.isUserLoggedIn = value;
    this.cookieService.set('userLoggedIn', value.toString());
    this.userLoggedInChanged.emit(value);
  }

  getUserLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  setUsuarioAutenticado(usuario: Usuario): void {
    this.usuarioAutenticado = usuario;
    this.cookieService.set('usuarioAutenticado', JSON.stringify(usuario), 1 / 24); // Establece la cookie con una caducidad de 1 hora
  }

  getUsuarioAutenticado(): Usuario | undefined {
    const usuarioAutenticadoString = this.cookieService.get('usuarioAutenticado');
    return usuarioAutenticadoString ? JSON.parse(usuarioAutenticadoString) : undefined;
  }
}
