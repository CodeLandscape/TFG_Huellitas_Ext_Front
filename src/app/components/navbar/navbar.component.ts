import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AnimalPersonaServiceService } from '../../services/animal-persona-service.service';
import { TokenService } from '../../services/token.service';
import { PersonaService } from '../../services/persona.service';
import { AsociacionService } from '../../services/asociacion.service';
import { NavbarService } from '../../services/navbar.service';
import { Subscription } from 'rxjs';

declare var $: any;

/**
 * Componente para la barra de navegación.
 *
 * @@Component
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  /** Número de solicitudes pendientes de la asociación */
  solicitudesPendientesAsociacion: number;
  /** Rol del usuario */
  rol: string;
  /** ID del usuario */
  id: number;
  /** Nombre del usuario */
  nombre: string;
  /** Suscripción al observable para recargar la barra de navegación */
  private subscription: Subscription;

  /**
   * Constructor que inyecta los servicios y dependencias necesarios.
   *
   * @param {AuthService} authService - Servicio de autenticación.
   * @param {AsociacionService} asociacionService - Servicio para manejar asociaciones.
   * @param {PersonaService} personaService - Servicio para manejar personas.
   * @param {AnimalPersonaServiceService} animalPersonaService - Servicio para manejar animales y personas.
   * @param {TokenService} tokenService - Servicio para manejar tokens.
   * @param {NavbarService} navbarService - Servicio para manejar la barra de navegación.
   */
  constructor(
    private authService: AuthService,
    private asociacionService: AsociacionService,
    private personaService: PersonaService,
    private animalPersonaService: AnimalPersonaServiceService,
    private tokenService: TokenService,
    private navbarService: NavbarService
  ) {}

  /**
   * Método de ciclo de vida de Angular que se llama después de que Angular ha inicializado todas las propiedades del componente.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    // Obtener el rol y el ID del usuario desde el token
    this.rol = this.tokenService.getTokenData().roles;
    this.id = this.tokenService.getTokenData().id;

    // Determinar el nombre del usuario según su rol
    if (this.rol === 'ROLE_ASOC') {
      this.asociacionService.getAsociacionByUsuarioId(this.id).subscribe(asociacion => {
        this.nombre = asociacion.nombre;
      });
    } else if (this.rol === 'ROLE_USER') {
      this.personaService.getPersonaByUsuarioId(this.id).subscribe(persona => {
        this.nombre = persona.nombre;
      });
    } else if (this.rol === 'ROLE_ADMIN') {
      this.nombre = 'Admin';
    }

    // Cargar el número de solicitudes pendientes de la asociación
    this.loadSolicitudesPendientesAsociacion();

    // Suscribirse al observable para recargar la barra de navegación
    this.subscription = this.navbarService.reloadObservable.subscribe(() => {
      this.loadSolicitudesPendientesAsociacion();
    });

    // Configurar el comportamiento del menú desplegable de la barra de navegación
    const dropdownNavbar = $('#navbarTogglerDemo01');
    const dropdownMenu = $('#dropdownMenu');

    dropdownNavbar.on('show.bs.collapse', () => {
      dropdownMenu.removeClass('dropdown-menu-end').addClass('dropend');
    });

    dropdownNavbar.on('hide.bs.collapse', () => {
      dropdownMenu.removeClass('dropend').addClass('dropdown-menu-end');
    });
  }

  /**
   * Carga el número de solicitudes pendientes de la asociación.
   *
   * @returns {void}
   */
  loadSolicitudesPendientesAsociacion(): void {
    if (this.rol === 'ROLE_ASOC') {
      this.asociacionService.getAsociacionByUsuarioId(this.id).subscribe(asociacion => {
        this.animalPersonaService.getAnimalPersonasByAsociacionId(asociacion.id).subscribe(animalPersonas => {
          this.solicitudesPendientesAsociacion = animalPersonas.filter(animalPersona => !animalPersona.estado).length;
        });
      });
    }
  }

  /**
   * Cierra la sesión del usuario.
   *
   * @returns {void}
   */
  logout(): void {
    this.authService.logout();
  }
}
