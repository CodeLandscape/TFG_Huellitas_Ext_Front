import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';

/**
 * Componente para el perfil de usuario.
 *
 * @@Component
 */
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  /** Indica si el usuario es una persona o no */
  isPerson: boolean;

  /**
   * Constructor del componente de perfil.
   *
   * @param {TokenService} tokenService - Servicio para manejar tokens.
   */
  constructor(private tokenService: TokenService) {}

  /**
   * Método de inicialización del componente.
   * Obtiene el tipo de usuario basado en el token y establece la bandera `isPerson` en consecuencia.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.isPerson = this.tokenService.getTokenData().roles === 'ROLE_USER';
  }
}
