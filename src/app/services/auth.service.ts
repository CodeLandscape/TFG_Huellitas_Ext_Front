import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegister } from '../interfaces/user-register.interface';
import { AssociationRegister } from '../interfaces/associations-register.interface';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { JwtDTO } from '../dto/auth/jwt-dto';
import { Observable, of, throwError } from 'rxjs';
import { LoginUsuario } from '../dto/auth/login-usuario';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.api.url;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) { }

  /**
   * Registra una nueva asociación.
   * @param association - Datos de la asociación a registrar.
   * @returns Observable que indica el éxito o fracaso del registro.
   */
  registerAssociation(association: AssociationRegister) {
    return this.http.post<void>(`${this.apiUrl}/auth/register-association`, association).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  /**
   * Registra un nuevo usuario.
   * @param user - Datos del usuario a registrar.
   * @returns Observable que indica el éxito o fracaso del registro.
   */
  registerUser(user: UserRegister) {
    return this.http.post<void>(`${this.apiUrl}/auth/register-user`, user).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  /**
   * Inicia sesión con las credenciales proporcionadas.
   * @param loginUsuario - Credenciales del usuario.
   * @returns Observable con el JWT si el inicio de sesión es exitoso.
   */
  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.http.post<JwtDTO>(`${this.apiUrl}/auth/login`, loginUsuario);
  }

  /**
   * Cierra la sesión del usuario actual.
   */
  logout(): void {
    this.cookieService.delete(environment.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  /**
   * Verifica si el usuario está autenticado.
   * @returns Observable que indica si el usuario está autenticado.
   */
  isAuthenticated(): Observable<boolean> {
    return this.http.get(`${this.apiUrl}/usuario/authenticate`).pipe(
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
