import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { CookieService } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  apiComunUrl = environment.api.url;
  private apiToken = environment.api.token;

  private h = new HttpHeaders();

  constructor(private ht: HttpClient, public cookieService: CookieService) {
    if (this.cookieService.check(environment.TOKEN_KEY)) {
      this.apiToken = this.cookieService.get(environment.TOKEN_KEY);
    }
  }

  /**
   * Crea el encabezado de autorización con el token JWT.
   * @param headers - Los encabezados HTTP a los que se agregará la autorización.
   */
  createAuthorizationHeader(headers: HttpHeaders) {
    const headerJson = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiToken}`
    };
    this.h = new HttpHeaders(headerJson);
  }

  /**
   * Obtiene la URL base de la API.
   * @returns La URL base de la API.
   */
  getApiBaseUrl() {
    return this.apiComunUrl;
  }

  /**
   * Realiza una solicitud GET a la URL especificada.
   * @param url - La URL a la que se realizará la solicitud.
   * @returns Observable con la respuesta de la solicitud.
   */
  get(url) {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.ht.get<Object>(url, { headers: this.h });
  }

  /**
   * Obtiene los datos del token JWT.
   * @returns Los datos decodificados del token JWT o null si el token ha expirado.
   */
  getTokenData() {
    const jwtHelper = new JwtHelperService();
    if (!jwtHelper.isTokenExpired(this.apiToken)) {
      return jwtHelper.decodeToken(this.apiToken);
    } else {
      this.cookieService.delete(environment.TOKEN_KEY);
      return null;
    }
  }

  /**
   * Realiza una solicitud POST a la URL especificada.
   * @param url - La URL a la que se realizará la solicitud.
   * @param data - Los datos a enviar en la solicitud.
   * @returns Observable con la respuesta de la solicitud.
   */
  post(url, data) {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.ht.post(url, data, { headers: this.h });
  }

  /**
   * Realiza una solicitud GET para obtener un archivo en formato Blob.
   * @param url - La URL a la que se realizará la solicitud.
   * @returns Observable con la respuesta de la solicitud en formato Blob.
   */
  blob(url) {
    const options: any = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiToken}`,
        Accept: `application/pdf`
      },
      responseType: 'blob'
    };
    return this.ht.get(url, options);
  }

  /**
   * Realiza una solicitud GET para obtener un archivo en formato ODT.
   * @param url - La URL a la que se realizará la solicitud.
   * @returns Observable con la respuesta de la solicitud en formato ODT.
   */
  odt(url) {
    const options: any = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiToken}`,
        Accept: `application/vnd.oasis.opendocument.text`
      },
      responseType: 'blob'
    };
    return this.ht.get(url, options);
  }

  /**
   * Realiza una solicitud PUT a la URL especificada.
   * @param url - La URL a la que se realizará la solicitud.
   * @param data - Los datos a enviar en la solicitud.
   * @returns Observable con la respuesta de la solicitud.
   */
  put(url, data) {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.ht.put(url, data, { headers: this.h });
  }

  /**
   * Realiza una solicitud DELETE a la URL especificada.
   * @param url - La URL a la que se realizará la solicitud.
   * @param responseType - El tipo de respuesta esperado (opcional, por defecto es 'json').
   * @returns Observable con la respuesta de la solicitud.
   */
  delete(url, responseType = 'json') {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.ht.delete(url, {
      headers: this.h,
      responseType: responseType as 'json'
    });
  }

  /**
   * Realiza una solicitud POST para subir un archivo.
   * @param url - La URL a la que se realizará la solicitud.
   * @param formData - Los datos del formulario que contienen el archivo a subir.
   * @returns Observable con la respuesta de la solicitud.
   */
  postFile(url, formData: FormData) {
    const headertoken = {
      Authorization: `Bearer ${this.apiToken}`
    };
    const headers = new HttpHeaders(headertoken);
    return this.ht.post(url, formData, { headers });
  }

  /**
   * Realiza una solicitud PUT para actualizar un archivo.
   * @param url - La URL a la que se realizará la solicitud.
   * @param formData - Los datos del formulario que contienen el archivo a actualizar.
   * @returns Observable con la respuesta de la solicitud.
   */
  updateFile(url, formData: FormData) {
    const headertoken = {
      Authorization: `Bearer ${this.apiToken}`
    };
    const headers = new HttpHeaders(headertoken);
    return this.ht.put(url, formData, { headers });
  }

  /**
   * Establece el token JWT en las cookies.
   * @param token - El token JWT a establecer.
   */
  setToken(token: string): void {
    this.cookieService.delete(environment.TOKEN_KEY);
    this.cookieService.set(environment.TOKEN_KEY, token);
  }
}
