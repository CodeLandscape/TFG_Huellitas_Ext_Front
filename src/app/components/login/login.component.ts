// @ts-ignore
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuariosServicesService } from '../../services/usuarios-services.service';
import { Usuario } from 'src/app/models/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginUsuario } from '../../dto/auth/login-usuario';
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/auth.service';
import { ComunService } from '../../services/comun.service';
import { CookieService } from 'ngx-cookie-service';

/**
 * Componente para la página de inicio de sesión.
 *
 * @@Component
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /** Lista de usuarios */
  usuarios: Usuario[] = [];
  /** Formulario de inicio de sesión */
  loginForm: FormGroup;
  /** Indica si se debe mostrar la contraseña */
  showPassword = false;
  /** Usuario de inicio de sesión */
  loginUsuario: LoginUsuario;

  /**
   * Constructor que inyecta los servicios y dependencias necesarios.
   *
   * @param {Router} router - Router para la navegación entre componentes.
   * @param {ComunService} comunService - Servicio común para datos compartidos.
   * @param {UsuariosServicesService} usuariosService - Servicio para manejar usuarios.
   * @param {FormBuilder} formBuilder - Constructor de formularios reactivos.
   * @param {TokenService} tokenService - Servicio para manejar tokens.
   * @param {AuthService} authService - Servicio de autenticación.
   * @param {CookieService} cookieService - Servicio para manejar cookies.
   */
  constructor(
    private router: Router,
    private comunService: ComunService,
    private usuariosService: UsuariosServicesService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  /**
   * Método de ciclo de vida de Angular que se llama después de que Angular ha inicializado todas las propiedades del componente.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * Realiza el proceso de inicio de sesión.
   *
   * @returns {void}
   */
  login(): void {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.loginForm.get('email').markAsTouched();
    this.loginForm.get('password').markAsTouched();

    this.loginUsuario = new LoginUsuario(email, password);

    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        this.usuariosService.getUsuarioById(data.id).subscribe(usuario => {
          this.comunService.setUsuarioAutenticado(usuario);
          if (usuario.rol.nombre === 'ROLE_USER') {
            this.router.navigate(['/listadoAnimales']);
          }
          if (usuario.rol.nombre === 'ROLE_ASOC') {
            this.router.navigate(['/animales-asociacion']);
          }
          if (usuario.rol.nombre === 'ROLE_ADMIN') {
            this.router.navigate(['/list-associations']);
          }
        });
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Acceso denegado',
          text: err.error.code.value === 1010 ? 'Usuario inactivo' : 'Usuario o contraseña incorrectos',
        });
        this.loginForm.setErrors({ invalidCredentials: true });
      }
    );
  }
}
