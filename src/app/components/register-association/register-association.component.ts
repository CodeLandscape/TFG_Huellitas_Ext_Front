import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProvinciaService } from '../../services/provincia.service';
import { Provincia } from '../../models/provincia';
import { AssociationRegister } from '../../interfaces/associations-register.interface';

@Component({
  selector: 'app-register-association',
  templateUrl: './register-association.component.html',
  styleUrls: ['./register-association.component.css']
})
export class RegisterAssociationComponent implements OnInit {
  public provincias: Provincia[] = [];
  public association: AssociationRegister;

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

  public registerAssociation: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    tlf: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    direccion: ['', Validators.required],
    poblacion: ['', Validators.required],
    provincia: ['', Validators.required],
    cif: ['', [Validators.required, this.validateCIF]]
  });

  ngOnInit(): void {
  }

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

  passwordsMismatch() {
    const password = this.registerAssociation.get('password').value;
    const password2 = this.registerAssociation.get('password2').value;
    return password !== password2;
  }

  validateCIF(control) {
    const cifPattern = /^[A-Za-z\d]{9}$/;
    if (control.value && !cifPattern.test(control.value)) {
      return { invalidCIF: true };
    }
    return null;
  }
}
