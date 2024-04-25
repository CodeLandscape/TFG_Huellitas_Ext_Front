import {Usuario} from './usuario';

export class Asociacion {
  id: number;
  usuario: Usuario;
  nombre: string;
  cif: string;

  constructor(id: number, usuario: Usuario, nombre: string, cif: string) {
    this.id = id;
    this.usuario = usuario;
    this.nombre = nombre;
    this.cif = cif;
  }
}
