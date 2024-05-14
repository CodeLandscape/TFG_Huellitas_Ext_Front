import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserRegister} from '../interfaces/user-register.interface';
import {AssociationRegister} from '../interfaces/associations-register.interface';
import {environment} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {JwtDTO} from '../dto/auth/jwt-dto';
import {Observable, of} from 'rxjs';
import {LoginUsuario} from '../dto/auth/login-usuario';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api-backend/auth';
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  registerAssociation(association: AssociationRegister) {
    return this.http.post<void>(`${this.apiUrl}/register-association` , association).subscribe(
      () => {
        console.log('Asociación registrado correctamente.');
      },
      (error) => {
        console.error('Error al registrar asociación:', error);
      }
    );
  }
  registerUser(user: UserRegister) {
    return this.http.post<void>(`${this.apiUrl}/register-user` , user).subscribe(
      () => {
        console.log('Usuario registrado correctamente.');
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
      }
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
