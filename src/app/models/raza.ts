import {TipoAnimal} from './tipoAnimal';

export class Raza {
  id: number;
  nombre: string;
  idTipoAnimal: TipoAnimal;

  constructor(id: number, nombre: string, tipoAnimal: TipoAnimal) {
    this.id = id;
    this.nombre = nombre;
    this.idTipoAnimal = tipoAnimal;
  }
}
