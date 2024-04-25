import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {UserRegister} from '../../interfaces/user-register.interface';
import {AuthService} from "../../services/auth.service";
import {ProvinciaService} from "../../services/provincia.service";
import {Provincia} from "../../models/provincia";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  public user: UserRegister;
  public provincias: Provincia[] = [];
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private provinciaService: ProvinciaService) {
    provinciaService.getProvincias().subscribe((data) => {
      this.provincias = data;
      console.log(data);
    });
  }
  public registerUser: FormGroup = this.fb.group({
    nombre: [''],
    apellidos: [''],
    correo: [''],
    password: [''],
    password2: [''],
    tlf: [''],
    direccion: [''],
    poblacion: [''],
    provincia: [''],
    dni: [''],
  });

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.registerUser.value);
    if (this.registerUser.value.password !== this.registerUser.value.password2) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden',
      });
      return;
    }

    this.user = {
      nombre: this.registerUser.value.nombre,
      apellidos: this.registerUser.value.apellidos,
      correo: this.registerUser.value.correo,
      password: this.registerUser.value.password,
      tlf: this.registerUser.value.tlf,
      direccion: this.registerUser.value.direccion,
      poblacion: this.registerUser.value.poblacion,
      idProvincia: this.registerUser.value.provincia,
      dni: this.registerUser.value.dni,
    };

    console.log(this.user);
    this.authService.registerUser(this.user);
    this.router.navigate(['/login']);
    Swal.fire({
      icon: 'success',
      title: 'Usuario registrado',
      text: 'Se ha registrado correctamente',
    });
  }
}
