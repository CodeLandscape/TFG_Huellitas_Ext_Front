import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserRegister } from '../../interfaces/user-register.interface';
import { AuthService } from "../../services/auth.service";
import { ProvinciaService } from "../../services/provincia.service";
import { Provincia } from "../../models/provincia";

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
    });
  }

  public registerUser: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, this.passwordComplexityValidator]],
    password2: ['', [Validators.required, this.passwordComplexityValidator]],
    tlf: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]], // Validación de longitud
    direccion: ['', Validators.required],
    poblacion: ['', Validators.required],
    provincia: ['', Validators.required],
    dni: ['', [Validators.required, this.validateDNI]] // Validación de DNI español
  });

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.registerUser.invalid) {
      this.registerUser.markAllAsTouched();
      return;
    }

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
    this.authService.registerUser(this.user).subscribe(
      () => {
        this.router.navigate(['/login']);
        Swal.fire({
          icon: 'success',
          title: 'Usuario registrado',
          text: 'Su usuario ha sido registrado correctamente. Inicie sesión para acceder. ',
        });
      },
      (error) => {
        Swal.fire('Error', error.error, 'error');
      }
    );
  }

  // Función para validar el formato de un DNI español
  validateDNI(control) {
    const dniPattern = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    if (control.value && !dniPattern.test(control.value)) {
      return { invalidDNI: true };
    }
    return null;
  }
  passwordsMismatch() {
    const password = this.registerUser.get('password').value;
    const password2 = this.registerUser.get('password2').value;
    return password !== password2;
  }

   passwordComplexityValidator(control) {
    const value = control.value;
    const hasUpperCase = /[A-Z]+/.test(value);
    const hasNumber = /[0-9]+/.test(value);
    const hasLength = value && value.length >= 9;

    const passwordValid = hasUpperCase && hasNumber && hasLength;
    if (!passwordValid) {
      return { passwordComplexity: true };
    }
    return null;
  }
}
