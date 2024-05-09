import {Raza} from './raza';
import {Asociacion} from './asociacion';
import {SafeUrl} from '@angular/platform-browser';

export class Animal {
  id: number;
  nombre: string;
  fechaNac: Date;
  fechaLlegadaAsoc: Date;
  observaciones: string;
  raza: Raza;
  asociacion: Asociacion;
  activo: boolean;
  fechaAdopcion: Date;
  imagen: SafeUrl;
  constructor(id: number, nombre: string, fechaNac: Date, fechaLlegadaAsoc: Date, observaciones: string, raza: Raza, asociacion: Asociacion, activo: boolean, fechaAdopcion: Date) {
    this.id = id;
    this.nombre = nombre;
    this.fechaNac = fechaNac;
    this.fechaLlegadaAsoc = fechaLlegadaAsoc;
    this.observaciones = observaciones;
    this.raza = raza;
    this.asociacion = asociacion;
    this.activo = activo;
    this.fechaAdopcion = fechaAdopcion;
  }

}
