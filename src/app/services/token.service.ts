import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {AuthTokenService} from './auth-token.service';
import {CookieService} from 'ngx-cookie-service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = environment.TOKEN_KEY;
  private readonly USERNAME_KEY = environment.USERNAME_KEY;
  private readonly AUTHORITIES_KEY = environment.AUTHORITIES_KEY;

  roles: Array<string> = [];

  constructor(private auth: AuthTokenService, private cookieService: CookieService) { }

  public setToken(token: string): void {
    this.cookieService.delete(this.TOKEN_KEY);
    this.cookieService.set(this.TOKEN_KEY, token);
  }

  public getToken(): string {
    return this.cookieService.get(this.TOKEN_KEY);
  }

  public getTokenData(): any {
    const jwtHelper = new JwtHelperService();
    if (!jwtHelper.isTokenExpired(this.getToken())) {
      return jwtHelper.decodeToken(this.getToken());
    } else {
      return null;
    }
  }

  public getUserName(): string {
    if (this.cookieService.get(this.TOKEN_KEY)) {
      return this.auth.getTokenData().sub;
    }
  }

  public setAuthorities(authorities: string[]): void {
    this.cookieService.delete(this.AUTHORITIES_KEY);
    this.cookieService.set(this.AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (this.cookieService.get(this.AUTHORITIES_KEY)) {
      JSON.parse(this.cookieService.get(this.AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }

  public logOut(): void {
    this.cookieService.deleteAll();
  }
}
