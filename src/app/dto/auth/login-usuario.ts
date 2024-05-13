export class LoginUsuario {
  correo: string;
  password: string;

  constructor(correo: string, password: string) {
    this.correo = correo;
    this.password = password;
  }
}
