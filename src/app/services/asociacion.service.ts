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

  asociacionEjemplo: Asociacion = new Asociacion(1, new Usuario(2, new Provincia(1, 'Badajoz'), 'usuario@gmail.com', 'Badajoz', '1234', 'Calle Falsa 123', '666666666', true), 'Asociacion Ejemplo', 'A80192727');

  constructor(
    private http: HttpClient
  ) {
  }

  getAsociacionSesion() {
    // cambiar por la id de la asociacion en sesion
    return this.http.get<Asociacion>('http://localhost:8080/comun-api/asociacion/' + 1);
  }

  actualizarAsociacion(id: number, value: any) {
    return this.http.put('http://localhost:8080/comun-api/usuario/' + id, value);
  }

  darDeBaja(id: number) {
    console.log(id);
    return of(true);
  }

}
