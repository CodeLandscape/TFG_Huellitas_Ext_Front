import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private http: HttpClient) { }

  guardarAnimal(animal: any) {
    return this.http.post('http://localhost:8080/api-backend/animal/add', animal);
  }
}
