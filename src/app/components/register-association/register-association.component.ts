import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProvinciaService } from '../../services/provincia.service';
import { Provincia } from '../../models/provincia';
import { AssociationRegister } from '../../interfaces/associations-register.interface';

/**
 * Componente para registrar una nueva asociación.
 */
@Component({
  selector: 'app-register-association',
  templateUrl: './register-association.component.html',
  styleUrls: ['./register-association.component.css']
})
export class RegisterAssociationComponent implements OnInit {
  /** Lista de provincias disponibles. */
  public provincias: Provincia[] = [];

  /** Datos de la asociación a registrar. */
  public association: AssociationRegister;

  /**
   * Constructor del componente RegisterAssociationComponent.
   *
   * @param fb - Servicio FormBuilder para crear grupos de formularios.
   * @param router - Servicio Router para la navegación.
   * @param authService - Servicio de autenticación.
   * @param provinciaService - Servicio para obtener datos de provincias.
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private provinciaService: ProvinciaService
  ) {
    provinciaService.getProvincias().subscribe((data) => {
      this.provincias = data;
    });
  }

  /** Formulario de registro de la asociación. */
  public registerAssociation: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, this.passwordComplexityValidator]],
    password2: ['', [Validators.required, this.passwordComplexityValidator]],
    tlf: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    direccion: ['', Validators.required],
    poblacion: ['', Validators.required],
    provincia: ['', Validators.required],
    cif: ['', [Validators.required, this.validateCIF]]
  });

  /**
   * Hook del ciclo de vida ngOnInit. Se ejecuta cuando se inicializa el componente.
   */
  ngOnInit(): void {}

  /**
   * Método que se ejecuta al enviar el formulario.
   */
  onSubmit() {
    if (this.registerAssociation.invalid || this.passwordsMismatch()) {
      this.registerAssociation.markAllAsTouched();
      return;
    }

    this.association = {
      nombre: this.registerAssociation.value.nombre,
      correo: this.registerAssociation.value.correo,
      password: this.registerAssociation.value.password,
      tlf: this.registerAssociation.value.tlf,
      direccion: this.registerAssociation.value.direccion,
      poblacion: this.registerAssociation.value.poblacion,
      cif: this.registerAssociation.value.cif,
      idProvincia: this.registerAssociation.value.provincia,
    };

    this.authService.registerAssociation(this.association).subscribe(
      () => {
        this.router.navigate(['/login']);
        Swal.fire({
          icon: 'success',
          title: 'Solicitud de registro enviada',
          text: 'El registro de su asociación será aprobado por un administrador',
        });
      },
      (error) => {
        Swal.fire('Error', error.error, 'error');
      }
    );
  }

  /**
   * Comprueba si las contraseñas introducidas coinciden.
   *
   * @returns True si las contraseñas no coinciden, False en caso contrario.
   */
  passwordsMismatch() {
    const password = this.registerAssociation.get('password').value;
    const password2 = this.registerAssociation.get('password2').value;
    return password !== password2;
  }

  /**
   * Valida el CIF introducido.
   *
   * @param control - Control del formulario que contiene el CIF.
   * @returns Un objeto de error si el CIF no es válido, null en caso contrario.
   */
  validateCIF(control) {
    const cifPattern = /^[A-Za-z\d]{9}$/;
    if (control.value && !cifPattern.test(control.value)) {
      return { invalidCIF: true };
    }
    return null;
  }

  /**
   * Validador de complejidad de la contraseña.
   *
   * @param control - Control del formulario que contiene la contraseña.
   * @returns Un objeto de error si la contraseña no cumple los requisitos, null en caso contrario.
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
