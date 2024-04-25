export interface Asociacion {
  id:      number;
  nombre:  string;
  usuario: Usuario;
  cif:     string;
}

export interface Usuario {
  id:        number;
  provincia: Provincia;
  rol:       Rol;
  correo:    string;
  poblacion: string;
  password:  string;
  direccion: string;
  tlf:       string;
  activo:    boolean;
}

export interface Provincia {
  id:     number;
  nombre: string;
}

export interface Rol {
  id:   number;
  nombre: string;
}
