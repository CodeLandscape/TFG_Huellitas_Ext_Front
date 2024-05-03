import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private http: HttpClient) { }

  guardarAnimal(animal: any) {
    return this.http.post('http://localhost:8080/api-backend/animal/add', animal);
  }

  getAnimales(pagina: number, filtro: any[]) {
    let params = new HttpParams().set('page', pagina.toString());

    if (filtro && filtro.length > 0) {
      filtro.forEach((param) => {
        for (let key in param) {
          params = params.set(key, param[key]);
        }
      });
    }

    return this.http.get('http://localhost:8080/api-backend/animal/all', { params: params });
  }

  deleteAnimal(id: number) {
    return this.http.delete(`http://localhost:8080/api-backend/animal/delete/${id}`);
  }
}
