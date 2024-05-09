import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private idAEditar = new BehaviorSubject<number | null>(null);


  constructor(private http: HttpClient) {
  }

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

    return this.http.get('http://localhost:8080/api-backend/animal/all', {params: params});
  }

  deleteAnimal(id: number) {
    return this.http.delete(`http://localhost:8080/api-backend/animal/delete/${id}`);
  }

  getAnimal(id: number) {
    return this.http.get(`http://localhost:8080/api-backend/animal/findById/${id}`);
  }

  setIdAEditar(id: number) {
    this.idAEditar.next(id);
  }

  getIdAEditar() {
    return this.idAEditar.asObservable();
  }

  actualizarAnimal(id: number, animal: any) {
    return this.http.put(`http://localhost:8080/api-backend/animal/update/${id}`, animal);
  }

  guardarImagenAnimal(formData: FormData) {
    return this.http.post('http://localhost:8080/api-backend/imagen-animal/upload', formData);
  }

  getImagenAnimal(idAnimal: number) {
    return this.http.get(`http://localhost:8080/api-backend/imagen-animal/animal/${idAnimal}`, {responseType: 'blob'});
  }

  getInfoImagenAnimal(idAnimal: number) {
    return this.http.get(`http://localhost:8080/api-backend/imagen-animal/info/${idAnimal}`);
  }
}
