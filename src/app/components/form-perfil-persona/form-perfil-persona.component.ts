import {Component, OnInit} from '@angular/core';
import {Persona} from '../../models/persona';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Provincia} from '../../models/provincia';
import {ProvinciaService} from '../../services/provincia.service';
import {PersonaService} from '../../services/persona.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form-perfil-persona',
  templateUrl: './form-perfil-persona.component.html',
  styleUrls: ['./form-perfil-persona.component.css']
})
export class FormPerfilPersonaComponent implements OnInit {

  cargado = false; // Propiedad que indica si la página se ha cargado correctamente
  persona?: Persona; // Objeto que almacena la información de la persona

  form!: FormGroup; // Formulario de edición del perfil
  provincias: Provincia[] = [];


  constructor(
    private provinciaService: ProvinciaService,
    private usuarioService: PersonaService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.usuarioService.getPersonaSesion().subscribe(persona => {
      this.persona = persona;
      console.log(this.persona);
      this.cargarDatosFormulario();
      this.crearFormulario(persona);
    });
  }

  private cargarDatosFormulario() {
    this.provinciaService.getProvincias().subscribe(provincias => {
      this.provincias = provincias;
    });
  }

  private crearFormulario(persona: Persona) {
    this.form = this.formBuilder.group({
      tlf: [persona.usuario.tlf, [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      direccion: [persona.usuario.direccion, [Validators.required, Validators.maxLength(100)]],
      poblacion: [persona.usuario.poblacion, [Validators.required, Validators.maxLength(100)]],
      provincia: [persona.usuario.provincia.id, [Validators.required]],
    });
    this.cargado = true;
  }

  validarCampo(campo: string) {
    return this.form.get(campo)?.invalid && this.form.get(campo)?.touched;
  }

  getErrorCampo(campo: string) {
    if (this.form.get(campo)?.hasError('required')) {
      return 'Campo obligatorio';
    }
    if (this.form.get(campo)?.hasError('pattern')) {
      return 'Formato incorrecto';
    }
    if (this.form.get(campo)?.hasError('maxlength')) {
      return 'Máximo ' + this.form.get(campo)?.errors?.maxlength.requiredLength + ' caracteres';
    }
    return '';
  }

  guardar() {
    if (this.form.invalid) { // Validar el formulario
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres guardar los cambios realizados?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {

        this.persona.usuario.tlf = this.form.get('tlf')?.value;
        this.persona.usuario.direccion = this.form.get('direccion')?.value;
        this.persona.usuario.poblacion = this.form.get('poblacion')?.value;
        this.persona.usuario.provincia.id = this.form.get('provincia')?.value;

        this.usuarioService.actualizarPersona(this.persona.usuario.id, this.persona.usuario).subscribe(() => {
          Swal.fire({
            title: '¡Guardado!',
            text: 'Los cambios se han guardado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
        });
      }
    });
  }


  darDeBaja() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres darte de baja?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.darDeBaja(this.persona.usuario.id).subscribe(() => {
          Swal.fire({
            title: '¡Dado de baja!',
            text: 'Tu cuenta ha sido dada de baja',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.router.navigate(['/']);
        });
      }
    });
  }

}