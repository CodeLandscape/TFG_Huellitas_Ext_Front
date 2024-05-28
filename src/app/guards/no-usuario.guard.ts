import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenService} from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class NoUsuarioGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const rol = this.tokenService.getTokenData().roles;
    if (rol === 'ROLE_USER') {
      this.router.navigate(['/listadoAnimales']);
      return false;
    } else {
      return true;
    }
  }

}
