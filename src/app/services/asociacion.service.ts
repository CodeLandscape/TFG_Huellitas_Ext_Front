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
    return this.http.get<Asociacion>('http://localhost:8080/api-backend/asociacion/' + 1);
  }

  getAsociaciones() {
    return this.http.get<Asociacion[]>('http://localhost:8080/api-backend/asociacion/all');
  }
  actualizarAsociacion(id: number, value: any) {
    return this.http.put('http://localhost:8080/api-backend/usuario/' + id, value);
  }

  darDeBaja(id: number) {
    return this.http.put('http://localhost:8080/api-backend/usuario/baja/' + id, null);
  }

}
