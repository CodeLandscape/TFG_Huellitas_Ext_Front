import {SafeUrl} from '@angular/platform-browser';
import {Animal} from './animal';

export class ArchivoAnimal {
  id: number;
  idAnimal: Animal;
  nombre: string;
  descripcion: string;
  ficheroNombre: string;
  ficheroRuta: string;
  fechaCreacion: Date;
  imagen: SafeUrl;

  constructor(id: number, idAnimal: Animal, nombre: string, descripcion: string, ficheroNombre: string, ficheroRuta: string, fechaCreacion: Date) {
    this.id = id;
    this.idAnimal = idAnimal;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.ficheroNombre = ficheroNombre;
    this.ficheroRuta = ficheroRuta;
    this.fechaCreacion = fechaCreacion;
  }

}
