import {Provincia} from './provincia';

export class Usuario {
  id: number;
  correo: string;
  password: string;
  direccion: string;
  poblacion: string;
  tlf: string;
  activo: boolean;
  provincia: Provincia;
  // @ts-ignore
  rol: Rol;
  // tslint:disable-next-line:max-line-length
  // @ts-ignore
  // tslint:disable-next-line:max-line-length
  constructor(id: number, correo: string, password: string, direccion: string, poblacion: string, tlf: string, activo: boolean, provincia: Provincia, rol: Rol) {
    this.id = id;
    this.correo = correo;
    this.password = password;
    this.direccion = direccion;
    this.poblacion = poblacion;
    this.tlf = tlf;
    this.activo = activo;
    this.provincia = provincia;
    this.rol = rol;
  }
}
