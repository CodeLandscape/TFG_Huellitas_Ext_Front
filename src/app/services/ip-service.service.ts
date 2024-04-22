import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IpServiceService {

  constructor(private http: HttpClient) { }
  public getIPAddress() {
    // TODO - Descomentar en producción (HTTP o HTTPS)
    // return this.http.get('http://api.ipify.org/?format=json');
    // return this.http.get('https://api.ipify.org/?format=json');

    // Para evitar problemas con CORS en desarrollo
    return this.http.get('https://cors-anywhere.herokuapp.com/http://api.ipify.org/?format=json');
  }
}
