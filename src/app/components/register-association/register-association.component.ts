import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ProvinciaService} from "../../services/provincia.service";
import {Provincia} from "../../models/provincia";
import {AssociationRegister} from "../../interfaces/associations-register.interface";

@Component({
  selector: 'app-register-association',
  templateUrl: './register-association.component.html',
  styleUrls: ['./register-association.component.css']
})
export class RegisterAssociationComponent implements OnInit {
  public provincias: Provincia[] = [];
  public association: AssociationRegister;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private provinciaService: ProvinciaService) {
    provinciaService.getProvincias().subscribe((data) => {
      this.provincias = data;
      console.log(data);
    });
  }
  public registerAssociation: FormGroup= this.fb.group({
    nombre: [''],
    apellidos: [''],
    correo: [''],
    password: [''],
    password2: [''],
    tlf: [''],
    direccion: [''],
    poblacion: [''],
    provincia: [''],
    cif: [''],
  });

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.registerAssociation.value);
    if (this.registerAssociation.value.password !== this.registerAssociation.value.password2) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden',
      });
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
    this.authService.registerAssociation(this.association);
    this.router.navigate(['/login']);

    Swal.fire({
      icon: 'success',
      title: 'Solicitud de registro enviada',
      text: 'El registro de su asociación será aprobado por un administrador',
    });
  }
}
