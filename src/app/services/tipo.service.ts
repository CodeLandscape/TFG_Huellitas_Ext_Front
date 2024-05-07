import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  constructor(private http: HttpClient) { }

  getTipos() {
    return this.http.get('http://localhost:8080/api-backend/tipoAnimal/all');
  }
}
