import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { UsuariosServicesService } from '../../services/usuarios-services.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private router: Router, private usuariosService: UsuariosServicesService) { }

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
      console.log(this.usuarios);
    });
  }

  onSubmit(form: NgForm) {
    const usuario = this.usuarios.find(u => u.correo === form.value.email && u.password === form.value.password);
    if (usuario.activo) {
      this.router.navigate(['/listadoAnimales']);
      Swal.fire({
        icon: 'success',
        title: 'Acceso exitoso',
        text: 'Has accedido correctamente',
      });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'Usuario o contraseña incorrectos',
      });
    }
  }
}
