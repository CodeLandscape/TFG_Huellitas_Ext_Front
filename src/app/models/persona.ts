import {Usuario} from './usuario';

export class Persona {
  id: number;
  usuario: Usuario;
  nombre: string;
  apellidos: string;
  dni: string;

  constructor(id: number, usuario: Usuario, nombre: string, apellidos: string, dni: string) {
    this.id = id;
    this.usuario = usuario;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.dni = dni;
  }
}
