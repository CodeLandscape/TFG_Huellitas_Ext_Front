import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { UsuariosServicesService } from '../../services/usuarios-services.service';
import { Usuario } from 'src/app/models/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarios: Usuario[] = [];
  loginForm: FormGroup;

  constructor(private router: Router, private usuariosService: UsuariosServicesService, private formBuilder: FormBuilder) { }

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

  onSubmit() {
    const usuario = this.usuarios.find(u => u.correo === this.loginForm.value.email && u.password === this.loginForm.value.password);
    if (usuario) {
      if (usuario.activo) {
        this.router.navigate(['/listadoAnimales']);
        Swal.fire({
          icon: 'success',
          title: 'Acceso exitoso',
          text: 'Has accedido correctamente',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Acceso denegado',
          text: 'Usuario inactivo',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'Usuario o contraseña incorrectos',
      });
    }
  }
}
