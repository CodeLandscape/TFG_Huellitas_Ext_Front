import {Component, OnInit} from '@angular/core';
import {Asociacion} from '../../models/asociacion';
import {Provincia} from '../../models/provincia';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProvinciaService} from '../../services/provincia.service';
import {AsociacionService} from '../../services/asociacion.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-form-perfil-asociacion',
  templateUrl: './form-perfil-asociacion.component.html',
  styleUrls: ['./form-perfil-asociacion.component.css']
})
export class FormPerfilAsociacionComponent implements OnInit {

  cargado = false;
  asociacion?: Asociacion;
  form!: FormGroup;
  provincias: Provincia[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private provinciaService: ProvinciaService,
    private asociacionService: AsociacionService,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.asociacionService.getAsociacionSesion().subscribe(asociacion => {
      this.asociacion = asociacion;
      this.cargarDatosFormulario();
      this.crearFormulario(asociacion);
    });
  }

  private cargarDatosFormulario() {
    this.provinciaService.getProvincias().subscribe(provincias => {
      this.provincias = provincias;
    });
  }

  private crearFormulario(asociacion: Asociacion) {
    this.form = this.formBuilder.group({
      tlf: [asociacion.usuario.tlf, [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      direccion: [asociacion.usuario.direccion, [Validators.required, Validators.maxLength(100)]],
      poblacion: [asociacion.usuario.poblacion, [Validators.required, Validators.maxLength(100)]],
      provincia: [asociacion.usuario.provincia.id, [Validators.required]],
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
      text: '¿Quieres guardar los cambios?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.asociacion.usuario.tlf = this.form.get('tlf')?.value;
        this.asociacion.usuario.direccion = this.form.get('direccion')?.value;
        this.asociacion.usuario.poblacion = this.form.get('poblacion')?.value;
        this.asociacion.usuario.provincia.id = this.form.get('provincia')?.value;

        this.asociacionService.actualizarAsociacion(this.asociacion.usuario).subscribe(() => {
            Swal.fire('Cambios guardados', 'Los cambios se han guardado correctamente', 'success');
          }, (error) => {
            Swal.fire('Error', error.error, 'error');
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
      confirmButtonText: 'Darme de baja',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.asociacionService.darDeBajaSesion().subscribe(() => {
          Swal.fire('Baja realizada', 'Te has dado de baja correctamente', 'success');
          this.authService.logout();
        });
      }
    });
  }
}
