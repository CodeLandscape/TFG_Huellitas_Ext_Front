class Usuario {
  id: number;
  correo: string;
  password: string;
  direccion: string;
  poblacion: string;
  idProvincia: Provincia;

  constructor(id: number, correo: string, password: string, direccion: string, poblacion: string, idProvincia: Provincia) {
    this.id = id;
    this.correo = correo;
    this.password = password;
    this.direccion = direccion;
    this.poblacion = poblacion;
    this.idProvincia = idProvincia;
  }
}
