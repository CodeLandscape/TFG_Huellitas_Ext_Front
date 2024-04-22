import { Injectable, EventEmitter } from '@angular/core';
import { ROLES_USUARIO } from '../config/security';
import { HttpClient } from '@angular/common/http';
import { AuthTokenService } from './authToken.service';


export class Load {
  resource: string;
  loaded: boolean;
}

@Injectable()
export class ComunService {
  loadingClient = new EventEmitter<boolean>();
  private registeredLoads: Load[] = [];
  // private http: HttpClient;

  constructor(
    private http: AuthTokenService,
    private httpClient: HttpClient,
  ) {
     //this.http = httpClient;
  }

  getTokenData() {
    return this.http.getTokenData();
  }

  capitalize(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }


  formatoFecha(fecha: Date, formato: String): String {
    if (!(fecha instanceof Date)) {
      fecha = new Date(fecha);
    }

    if (fecha instanceof Date) {
      const day = fecha.getDate();
      const sDay: String = (day > 9 ? day : '0' + day).toString();
      const month = fecha.getMonth() + 1;
      const sMonth: String = (month > 9 ? month : '0' + month).toString();
      const year = fecha.getFullYear();
      const hour = fecha.getHours();
      const sHour: String = (hour > 9 ? hour : '0' + hour).toString();
      const minutes = fecha.getMinutes();
      const sMinutes: String = (minutes > 9
        ? minutes
        : '0' + minutes
      ).toString();
      const seconds = fecha.getSeconds();
      const sSeconds: String = (seconds > 9
        ? seconds
        : '0' + seconds
      ).toString();

      const formatoDefault = year + '-' + sMonth + '-' + sDay;

      switch (formato) {
        case 'd':
          return day.toString();
        case 'dd':
          return sDay;
        case 'm':
          return month.toString();
        case 'mm':
          return sMonth;
        case 'yyyy':
          return year.toString();
        case 'dd/mm/yyyy':
          return sDay + '/' + sMonth + '/' + year;
        case 'dd/mm/yyyy H:i':
          return (
            sDay + '/' + sMonth + '/' + year + ' ' + sHour + ':' + sMinutes
          );
        case 'dd/mm/yyyy H:i:s':
          return (
            sDay +
            '/' +
            sMonth +
            '/' +
            year +
            ' ' +
            sHour +
            ':' +
            sMinutes +
            ':' +
            sSeconds
          );
        case 'dd-mm-yyyy':
          return day + '-' + month + '-' + year;
        case 'dd-mm-yyyy H:i':
          return (
            sDay + '-' + sMonth + '-' + year + ' ' + sHour + ':' + sMinutes
          );
        case 'dd-mm-yyyy H:i:s':
          return (
            sDay +
            '-' +
            sMonth +
            '-' +
            year +
            ' ' +
            sHour +
            ':' +
            sMinutes +
            ':' +
            sSeconds
          );
        case 'H':
          return sHour;
        case 'i':
          return sMinutes;
        case 's':
          return sSeconds;
        case 'H:i':
          return sHour + ':' + sMinutes;
        case 'H:i:s':
          return sHour + ':' + sMinutes + ':' + sSeconds;
        case 'yyyy-mm-dd':
          return formatoDefault;
        default:
          return 'Formato no reconocido';
      }
    }

    return 'Fecha no válida';
  }

  /**
   * Permite verificar si un usuario puede acceder a una opción que tiene seguridad aplicada identificado si tiene acceso
   * o si por el contrari puede tener el acceso denegado
   * @param {Object} usuario
   * @param {String[]} securedOption
   * @returns {boolean}
   */
  canAccessSecuredOption(usuario: Object, securedOption: Object): boolean {
    let usuarioId: number;
    usuarioId = usuario['u_id'];
    const rolesUsuario = this.getRolesUsuario(usuario);

    // VERIFICACIÓN DE ACCESOS DENEGADOS
    // ...............................................................................................................
    // opción con acceso denegado para todos los usuarios
    if (
      securedOption['users'] !== undefined &&
      securedOption['users'] === '---'
    ) {
      return false;
    }

    // Si se ha denegado el acceso al usuario de forma específcia -> se deniega el acceso
    if (
      securedOption['users'] !== undefined &&
      securedOption['users'].indexOf(',-' + usuarioId + ',') !== -1
    ) {
      return false;
    }

    // Si se ha denegado el acceso a alguno de los grupos del usuario -> se deniega el acceso
    if (securedOption['groups'] !== undefined) {
      for (const rol of rolesUsuario) {
        if (securedOption['groups'].indexOf(',-' + rol + ',') !== -1) {
          return false;
        }
      }
    }

    // VERIFICACIÓN DE ACCESOS PERMITIDOS
    // ...............................................................................................................
    // opción con acceso permitido para todos los usuarios
    if (
      securedOption['users'] !== undefined &&
      securedOption['users'] === '+++'
    ) {
      return true;
    }

    // Si se ha facilitado el acceso al usuario de forma específcia -> puede acceder
    if (
      securedOption['users'] !== undefined &&
      securedOption['users'].indexOf(',+' + usuarioId + ',') !== -1
    ) {
      return true;
    }

    if (securedOption['groups'] !== undefined) {
      // Si no tiene acceso definido de forma particular por usuario -> se busca que tenga acceso por grupo
      for (const rol of rolesUsuario) {
        if (securedOption['groups'].indexOf(',+' + rol + ',') !== -1) {
          return true;
        }
      }
    }
    return false;
  }

  getRolesUsuario(usuario: Object): String[] {
    const rolesUsuario: String[] = [];
    for (const role_id of usuario['roles']) {
      if (ROLES_USUARIO[role_id] != null) {
        rolesUsuario.push(ROLES_USUARIO[role_id]);
      }
    }
    return rolesUsuario;
  }

}
