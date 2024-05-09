import {TipoAnimal} from './tipoAnimal';

export class Raza {
  id?: number;
  nombre: string;
  tipoAnimal: TipoAnimal;
  idTipoAnimal?: number;

  constructor(nombre: string, id?: number) {
    this.id = id;
    this.nombre = nombre;
  }
}
