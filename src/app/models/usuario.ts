import {Provincia} from './provincia';

export class Usuario {
  id: number;
  provincia: Provincia;
  correo: string;
  poblacion: string;
  password: string;
  direccion: string;
  tlf: string;
  activo: boolean;

  constructor(id: number, provincia: Provincia, correo: string, poblacion: string, password: string, direccion: string, tlf: string, activo: boolean) {
    this.id = id;
    this.provincia = provincia;
    this.correo = correo;
    this.poblacion = poblacion;
    this.password = password;
    this.direccion = direccion;
    this.tlf = tlf;
    this.activo = activo;
  }
}
