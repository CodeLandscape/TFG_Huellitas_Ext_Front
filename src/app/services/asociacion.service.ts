import {Injectable} from '@angular/core';
import {Asociacion} from '../models/asociacion';
import {Usuario} from '../models/usuario';
import {Provincia} from '../models/provincia';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsociacionService {

  constructor(
    private http: HttpClient
  ) {
  }
  private apiUrl = environment.api.url;


  getAsociacionSesion() {
    // cambiar por la id de la asociacion en sesion
    return this.http.get<Asociacion>(`${this.apiUrl}/asociacion/sesion`);
  }

  getAsociaciones() {
    return this.http.get<Asociacion[]>(`${this.apiUrl}/asociacion/all`);
  }
  actualizarAsociacion(value: any) {
    return this.http.put(`${this.apiUrl}/usuario/update`, value);
  }

  darDeBaja(id: number) {
    return this.http.put(`${this.apiUrl}/usuario/baja/` + id, null);
  }

  darDeBajaSesion() {
    return this.http.put(`${this.apiUrl}/usuario/baja-sesion/`, null);
  }

  activarAsociacion(id: number) {
    return this.http.put(`${this.apiUrl}/usuario/alta/` + id, null);
  }

  getAsociacionByUsuarioId(id: number) {
    return this.http.get<Asociacion>(`${this.apiUrl}/asociacion/usuario/` + id);
  }
}
