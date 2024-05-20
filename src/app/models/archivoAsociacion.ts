import {Asociacion} from './asociacion';
import {SafeUrl} from '@angular/platform-browser';

export class ArchivoAsociacion {
  id: number;
  idAsociacion: Asociacion;
  nombre: string;
  descripcion: string;
  ficheroNombre: string;
  ficheroRuta: string;
  fechaCreacion: Date;
  imagen: SafeUrl;

  constructor(id: number, idAsociacion: Asociacion, nombre: string, descripcion: string, ficheroNombre: string, ficheroRuta: string, fechaCreacion: Date) {
    this.id = id;
    this.idAsociacion = idAsociacion;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.ficheroNombre = ficheroNombre;
    this.ficheroRuta = ficheroRuta;
    this.fechaCreacion = fechaCreacion;
  }


}
