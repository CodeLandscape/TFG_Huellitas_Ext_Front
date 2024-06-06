import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserRegister } from '../../interfaces/user-register.interface';
import { AuthService } from '../../services/auth.service';
import { Provincia } from '../../models/provincia';
import {ProvinciaService} from '../../services/provincia.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  /**
   * Datos del usuario a registrar.
   *
   * @type {UserRegister}
   * @memberof RegisterUserComponent
   */
  public user: UserRegister;

  /**
   * Lista de provincias.
   *
   * @type {Provincia[]}
   * @memberof RegisterUserComponent
   */
  public provincias: Provincia[] = [];

  /**
   * Formulario reactivo para el registro de usuario.
   *
   * @type {FormGroup}
   * @memberof RegisterUserComponent
   */
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

  /**
   * Creates an instance of RegisterUserComponent.
   * @param {FormBuilder} fb Constructor de formularios reactivos.
   * @param {Router} router Servicio para la navegación.
   * @param {AuthService} authService Servicio de autenticación.
   * @param {ProvinciaService} provinciaService Servicio de gestión de provincias.
   * @memberof RegisterUserComponent
   */
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private provinciaService: ProvinciaService) {
    provinciaService.getProvincias().subscribe((data) => {
      this.provincias = data;
    });
  }

  /**
   * Método de inicialización del componente.
   *
   * @memberof RegisterUserComponent
   */
  ngOnInit(): void {}

  /**
   * Maneja el envío del formulario de registro.
   *
   * @memberof RegisterUserComponent
   */
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

  /**
   * Valida el formato de un DNI español.
   *
   * @param control Control del formulario que contiene el DNI.
   * @returns {Object | null} Error de validación o null si es válido.
   * @memberof RegisterUserComponent
   */
  validateDNI(control) {
    const dniPattern = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    if (control.value && !dniPattern.test(control.value)) {
      return { invalidDNI: true };
    }
    return null;
  }

  /**
   * Comprueba si las contraseñas no coinciden.
   *
   * @returns {boolean} true si las contraseñas no coinciden, de lo contrario false.
   * @memberof RegisterUserComponent
   */
  passwordsMismatch() {
    const password = this.registerUser.get('password').value;
    const password2 = this.registerUser.get('password2').value;
    return password !== password2;
  }

  /**
   * Validador de complejidad de contraseña.
   *
   * @param control Control del formulario que contiene la contraseña.
   * @returns {Object | null} Error de validación o null si es válido.
   * @memberof RegisterUserComponent
   */
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
