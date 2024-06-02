import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {TokenService} from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.tokenService.getTokenData() === null) {
      return true;
    }
    const rol = this.tokenService.getTokenData().roles;
    if (rol === 'ROLE_USER') {
      this.router.navigate(['/listadoAnimales']);
    }
    if (rol === 'ROLE_ASOC') {
      this.router.navigate(['/animales-asociacion']);
    }
    if (rol === 'ROLE_ADMIN') {
      this.router.navigate(['/list-associations']);
    }
    return false;
  }

}
