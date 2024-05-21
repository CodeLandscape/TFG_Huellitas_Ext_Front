export class Id {
  idPersona?: number;
  idAnimal?: number;
}

export class Rol {
  id?: number;
  nombre?: string;
}

export class Provincia {
  id?: number;
  nombre?: string;
}

export class Usuario {
  id?: number;
  provincia?: Provincia;
  rol?: Rol;
  correo?: string;
  poblacion?: string;
  password?: string;
  direccion?: string;
  tlf?: string;
  activo?: boolean;
}

export class Asociacion {
  id?: number;
  nombre?: string;
  usuario?: Usuario;
  cif?: string;
}

export class Raza {
  id?: number;
  nombre?: string;
  idTipoAnimal?: number;
}

export class Animal {
  id?: number;
  nombre?: string;
  fechaNac?: string;
  fechaLlegadaAsoc?: string;
  observaciones?: string;
  raza?: Raza;
  asociacion?: Asociacion;
  activo?: boolean;
  fechaAdopcion?: string;
}

export class Persona {
  id?: number;
  nombre?: string;
  correo?: string;
  tlf?: string;
}

export class AnimalPersona {
  id?: Id;
  idPersona?: Persona;
  idAnimal?: Animal;
  fecha?: string;
  estado?: boolean;
}
