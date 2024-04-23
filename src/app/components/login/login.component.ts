import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.value.email === 'prueba' && form.value.password === 'prueba') {
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
