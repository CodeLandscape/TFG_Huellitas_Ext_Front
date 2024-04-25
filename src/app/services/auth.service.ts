import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserRegister} from '../interfaces/user-register.interface';
import {AssociationRegister} from '../interfaces/associations-register.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api-backend/auth';
  constructor(private http: HttpClient) { }

  registerAssociation(association: AssociationRegister) {
    return this.http.post<void>(`${this.apiUrl}/register-association` , association).subscribe(
      () => {
        console.log('Asociación registrado correctamente.');
      },
      (error) => {
        console.error('Error al registrar asociación:', error);
      }
    );
  }
  registerUser(user: UserRegister) {
    return this.http.post<void>(`${this.apiUrl}/register-user` , user).subscribe(
      () => {
        console.log('Usuario registrado correctamente.');
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
      }
    );
  }
}
