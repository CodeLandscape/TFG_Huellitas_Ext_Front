import {Component, OnInit} from '@angular/core';
import {Asociacion} from '../../models/asociacion';
import {Provincia} from '../../models/provincia';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProvinciaService} from '../../services/provincia.service';
import {AsociacionService} from '../../services/asociacion.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

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
    private router: Router
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
      tlf: [asociacion.usuario.tlf],
      direccion: [asociacion.usuario.direccion],
      poblacion: [asociacion.usuario.poblacion],
      provincia: [asociacion.usuario.provincia.id],
    });
    this.cargado = true;
  }

  validarCampo(campo: string) {
    return this.form.get(campo)?.invalid && this.form.get(campo)?.touched;
  }

  getErrorCampo(campo: string) {
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

        this.asociacionService.actualizarAsociacion(this.asociacion.usuario.id, this.asociacion.usuario).subscribe(() => {
          Swal.fire('Cambios guardados', 'Los cambios se han guardado correctamente', 'success');
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
        this.asociacionService.darDeBaja(this.asociacion.usuario.id).subscribe(() => {
          Swal.fire('Baja realizada', 'Te has dado de baja correctamente', 'success');
          //Cerrar sesión pero no tenemos sesión todavía XD
          this.router.navigate(['/']);
        });
      }
    });
  }
}
