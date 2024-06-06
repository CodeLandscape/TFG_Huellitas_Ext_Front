import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthTokenService } from './auth-token.service';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';

/**
 * Servicio para manejar tokens de autenticación.
 *
 * @@Injectable
 */
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  /** Clave del token en las cookies */
  private readonly TOKEN_KEY = environment.TOKEN_KEY;
  /** Clave del nombre de usuario en las cookies */
  private readonly USERNAME_KEY = environment.USERNAME_KEY;
  /** Clave de las autoridades en las cookies */
  private readonly AUTHORITIES_KEY = environment.AUTHORITIES_KEY;

  roles: Array<string> = [];

  /**
   * Constructor que inyecta los servicios necesarios.
   *
   * @param {AuthTokenService} auth - Servicio de autenticación.
   * @param {CookieService} cookieService - Servicio para manejar cookies.
   */
  constructor(private auth: AuthTokenService, private cookieService: CookieService) { }

  /**
   * Almacena el token en las cookies.
   *
   * @param {string} token - El token JWT.
   * @returns {void}
   */
  setToken(token: string): void {
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(token);

    if (!decodedToken.exp) {
      console.error('Token does not have exp claim');
      return;
    }

    // Crear un nuevo objeto Date directamente desde exp
    const expirationDate = new Date(decodedToken.exp * 1000);

    this.cookieService.set(this.TOKEN_KEY, token, expirationDate);
  }

  /**
   * Obtiene el token almacenado en las cookies.
   *
   * @returns {string} El token JWT.
   */
  public getToken(): string {
    return this.cookieService.get(this.TOKEN_KEY);
  }

  /**
   * Obtiene los datos decodificados del token.
   *
   * @returns {any} Datos decodificados del token o null si el token ha expirado.
   */
  getTokenData() {
    const jwtHelper = new JwtHelperService();
    if (!jwtHelper.isTokenExpired(this.getToken())) {
      return jwtHelper.decodeToken(this.getToken());
    } else {
      this.cookieService.delete(this.TOKEN_KEY);
      return null;
    }
  }

  /**
   * Obtiene el nombre de usuario del token.
   *
   * @returns {string} El nombre de usuario.
   */
  public getUserName(): string {
    if (this.cookieService.get(this.TOKEN_KEY)) {
      return this.auth.getTokenData().sub;
    }
  }

  /**
   * Almacena las autoridades en las cookies.
   *
   * @param {string[]} authorities - Lista de autoridades.
   * @returns {void}
   */
  public setAuthorities(authorities: string[]): void {
    this.cookieService.delete(this.AUTHORITIES_KEY);
    this.cookieService.set(this.AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  /**
   * Obtiene las autoridades almacenadas en las cookies.
   *
   * @returns {string[]} Lista de autoridades.
   */
  public getAuthorities(): string[] {
    this.roles = [];
    if (this.cookieService.get(this.AUTHORITIES_KEY)) {
      JSON.parse(this.cookieService.get(this.AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }

  /**
   * Elimina todas las cookies para cerrar la sesión.
   *
   * @returns {void}
   */
  public logOut(): void {
    this.cookieService.deleteAll();
  }
}
