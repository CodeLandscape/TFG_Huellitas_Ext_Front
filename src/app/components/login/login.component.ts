// @ts-ignore
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { UsuariosServicesService } from '../../services/usuarios-services.service';
import { Usuario } from 'src/app/models/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LoginUsuario} from '../../dto/auth/login-usuario';
import {TokenService} from '../../services/token.service';
import {AuthService} from '../../services/auth.service';
import {ComunService} from '../../services/comun.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarios: Usuario[] = [];
  loginForm: FormGroup;
  showPassword = false;
  loginUsuario: LoginUsuario;
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private comunService: ComunService, private usuariosService: UsuariosServicesService, private formBuilder: FormBuilder, private tokenService: TokenService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
      console.log(this.usuarios);
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.loginForm.get('email').markAsTouched();
    this.loginForm.get('password').markAsTouched();

    this.loginUsuario = new LoginUsuario(email, password);

    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        this.router.navigate(['/listadoAnimales']);
      },
      err => {
        this.loginForm.setErrors({ invalidCredentials: true });
      }
    );


  // onSubmit() {
  //   const usuario = this.usuarios.find(u => u.correo === this.loginForm.value.email && u.password === this.loginForm.value.password);
  //   if (usuario) {
  //     if (usuario.activo) {
  //       this.router.navigate(['/listadoAnimales']);
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Acceso exitoso',
  //         text: 'Has accedido correctamente',
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Acceso denegado',
  //         text: 'Usuario inactivo',
  //       });
  //     }
  //   } else {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Acceso denegado',
  //       text: 'Usuario o contraseña incorrectos',
  //     });
  //   }
  // }
}
}
