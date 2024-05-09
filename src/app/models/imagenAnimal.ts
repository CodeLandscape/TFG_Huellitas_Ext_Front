export class imagenAnimal{
  id:            number;
  idAnimal:      number;
  ficheroNombre: string;
  ficheroRuta:   string;
  fechaCreacion: Date;

  constructor(id: number, idAnimal: number, ficheroNombre: string, ficheroRuta: string, fechaCreacion: Date) {
    this.id = id;
    this.idAnimal = idAnimal;
    this.ficheroNombre = ficheroNombre;
    this.ficheroRuta = ficheroRuta;
    this.fechaCreacion = fechaCreacion;
  }
}
