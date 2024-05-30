import {Injectable} from '@angular/core';
import {Provincia} from '../models/provincia';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  provincias: Provincia[] = [
    new Provincia(1, 'Badajoz'),
    new Provincia(2, 'Albacete'),
    new Provincia(3, 'Alicante')
  ];

  constructor(
    private http: HttpClient
  ) {
  }
  private apiUrl = environment.api.url;

  getProvincias() {
    return this.http.get<Provincia[]>(`${this.apiUrl}/provincia/all`);
  }
}
