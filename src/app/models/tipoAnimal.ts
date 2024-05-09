export class TipoAnimal {
  id?: number;
  nombre: string;

  constructor(nombre: string, id?: number) {
    this.id = id;
    this.nombre = nombre;
  }
}
