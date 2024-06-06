import { Injectable, EventEmitter } from '@angular/core';
import { ROLES_USUARIO } from '../config/security';
import { HttpClient } from '@angular/common/http';
import { AuthTokenService } from './auth-token.service';
import { CookieService } from 'ngx-cookie-service';
import { Usuario } from '../models/usuario';

export class Load {
  resource: string;
  loaded: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ComunService {
  private isUserLoggedIn = false;
  userLoggedInChanged = new EventEmitter<boolean>();
  loadingClient = new EventEmitter<boolean>();
  private registeredLoads: Load[] = [];
  private usuarioAutenticado: Usuario | undefined;

  constructor(
    private http: AuthTokenService,
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {
    this.isUserLoggedIn = this.cookieService.get('userLoggedIn') === 'true';
  }

  /**
   * Obtiene los datos del token del usuario autenticado.
   * @returns Los datos del token JWT.
   */
  getTokenData() {
    return this.http.getTokenData();
  }

  /**
   * Capitaliza el primer carácter de un texto.
   * @param texto - El texto a capitalizar.
   * @returns El texto capitalizado.
   */
  capitalize(texto: string): string {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  /**
   * Establece el estado de inicio de sesión del usuario.
   * @param value - El nuevo estado de inicio de sesión.
   */
  setUserLoggedIn(value: boolean): void {
    this.isUserLoggedIn = value;
    this.cookieService.set('userLoggedIn', value.toString());
    this.userLoggedInChanged.emit(value);
  }

  /**
   * Obtiene el estado de inicio de sesión del usuario.
   * @returns El estado de inicio de sesión del usuario.
   */
  getUserLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  /**
   * Establece el usuario autenticado.
   * @param usuario - El usuario autenticado.
   */
  setUsuarioAutenticado(usuario: Usuario): void {
    this.usuarioAutenticado = usuario;
    this.cookieService.set('usuarioAutenticado', JSON.stringify(usuario), 1 / 24); // Establece la cookie con una caducidad de 1 hora
  }

  /**
   * Obtiene el usuario autenticado.
   * @returns El usuario autenticado o undefined si no hay ningún usuario autenticado.
   */
  getUsuarioAutenticado(): Usuario | undefined {
    const usuarioAutenticadoString = this.cookieService.get('usuarioAutenticado');
    return usuarioAutenticadoString ? JSON.parse(usuarioAutenticadoString) : undefined;
  }
}
