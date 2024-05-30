import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private idAEditar = new BehaviorSubject<number | null>(null);

  private apiUrl = environment.api.url;


  constructor(private http: HttpClient) {
  }

  guardarAnimal(animal: any) {
    return this.http.post(`${this.apiUrl}/animal/add`, animal);
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

    return this.http.get(`${this.apiUrl}/animal/all`, {params: params});
  }

  getAnimalesAsociacion(pagina: number, filtro: any[]) {
    let params = new HttpParams().set('page', pagina.toString());

    params = params.set('filtrarPorAsociacion', true);

    if (filtro && filtro.length > 0) {
      filtro.forEach((param) => {
        for (let key in param) {
          params = params.set(key, param[key]);
        }
      });
    }

    return this.http.get(`${this.apiUrl}/animal/all`, {params: params});
  }

  deleteAnimal(id: number) {
    return this.http.delete(`${this.apiUrl}/animal/delete/${id}`);
  }

  getAnimal(id: number) {
    return this.http.get(`${this.apiUrl}/animal/findById/${id}`);
  }

  setIdAEditar(id: number) {
    this.idAEditar.next(id);
  }

  getIdAEditar() {
    return this.idAEditar.asObservable();
  }

  actualizarAnimal(id: number, animal: any) {
    return this.http.put(`${this.apiUrl}/animal/update/${id}`, animal);
  }

  guardarImagenAnimal(formData: FormData) {
    return this.http.post(`${this.apiUrl}/imagen-animal/upload`, formData);
  }

  getImagenAnimal(idAnimal: number) {
    return this.http.get(`${this.apiUrl}/imagen-animal/animal/${idAnimal}`, {responseType: 'blob'});
  }

  getInfoImagenAnimal(idAnimal: number) {
    return this.http.get(`${this.apiUrl}/imagen-animal/info/${idAnimal}`);
  }
}
