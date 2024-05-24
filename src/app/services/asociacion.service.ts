import {Injectable} from '@angular/core';
import {Asociacion} from '../models/asociacion';
import {Usuario} from '../models/usuario';
import {Provincia} from '../models/provincia';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsociacionService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAsociacionSesion() {
    // cambiar por la id de la asociacion en sesion
    return this.http.get<Asociacion>('http://localhost:8080/api-backend/asociacion/sesion');
  }

  getAsociaciones() {
    return this.http.get<Asociacion[]>('http://localhost:8080/api-backend/asociacion/all');
  }
  actualizarAsociacion(value: any) {
    return this.http.put('http://localhost:8080/api-backend/usuario/update', value);
  }

  darDeBaja(id: number) {
    return this.http.put('http://localhost:8080/api-backend/usuario/baja/' + id, null);
  }

  darDeBajaSesion() {
    return this.http.put('http://localhost:8080/api-backend/usuario/baja-sesion/', null);
  }

  activarAsociacion(id: number) {
    return this.http.put('http://localhost:8080/api-backend/usuario/alta/' + id, null);
  }

  getAsociacionByUsuarioId(id: number) {
    return this.http.get<Asociacion>('http://localhost:8080/api-backend/asociacion/usuario/' + id);
  }
}
