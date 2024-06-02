import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserRegister} from '../interfaces/user-register.interface';
import {AssociationRegister} from '../interfaces/associations-register.interface';
import {environment} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {JwtDTO} from '../dto/auth/jwt-dto';
import {Observable, of, throwError} from 'rxjs';
import {LoginUsuario} from '../dto/auth/login-usuario';
import {catchError, map} from 'rxjs/operators';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://tfg-huellitas-ext-back.onrender.com/api-backend/api-backend/auth';
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  registerAssociation(association: AssociationRegister) {
    return this.http.post<void>(`${this.apiUrl}/register-association` , association).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  registerUser(user: UserRegister) {
    return this.http.post<void>(`${this.apiUrl}/register-user` , user).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  public login(loginUsuario: LoginUsuario): Observable<JwtDTO>{
    console.log(loginUsuario);


    return this.http.post<JwtDTO>(environment.api.url + '/auth/login', loginUsuario);
  }

  logout(): void {
    this.cookieService.delete(environment.TOKEN_KEY);

    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.http.get(environment.api.url + '/usuario/authenticate').pipe(
      map(response => {
        return true;
      }),
      catchError(error => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }


}
