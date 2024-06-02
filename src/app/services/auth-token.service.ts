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

  createAuthorizationHeader(headers: HttpHeaders) {
    const headerJson = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiToken}`
    };
    this.h = new HttpHeaders(headerJson);
  }

  getApiBaseUrl() {
    return this.apiComunUrl;
  }



  get(url) {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    // tslint:disable-next-line: ban-types
    return this.ht.get<Object>(url, {
      headers: this.h
    });
  }

  getTokenData() {
    const jwtHelper = new JwtHelperService();
    if (!jwtHelper.isTokenExpired(this.apiToken)) {
      return jwtHelper.decodeToken(this.apiToken);
    } else {
      this.cookieService.delete(environment.TOKEN_KEY);
      return null;
    }
  }

  post(url, data) {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.ht.post(url, data, { headers: this.h });
  }

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

  put(url, data) {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.ht.put(url, data, { headers: this.h });
  }

  delete(url, responseType = 'json') {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.ht.delete(url, {
      headers: this.h,
      responseType: responseType as 'json'
    });
  }

  postFile(url, formData: FormData) {
    const headertoken = {
      Authorization: `Bearer ${this.apiToken}`
    };
    const headers = new HttpHeaders(headertoken);
    return this.ht.post(
      url,
      formData,
      { headers }
    );
  }


  updateFile(url, formData: FormData) {
    const headertoken = {
      Authorization: `Bearer ${this.apiToken}`
    };
    const headers = new HttpHeaders(headertoken);
    return this.ht.put(
      url,
      formData,
      { headers });
  }

  setToken(token: string): void {
    this.cookieService.delete(environment.TOKEN_KEY);
    this.cookieService.set(environment.TOKEN_KEY, token);
  }
}
