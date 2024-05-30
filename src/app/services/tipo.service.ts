import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  private apiUrl = environment.api.url;

  constructor(private http: HttpClient) { }

  getTipos() {
    return this.http.get('${this.apiUrl}/tipoAnimal/all');
  }
}
