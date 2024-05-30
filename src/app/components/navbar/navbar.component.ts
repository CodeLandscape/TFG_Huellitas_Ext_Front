import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AnimalPersonaServiceService} from '../../services/animal-persona-service.service';
import {TokenService} from '../../services/token.service';
import {PersonaService} from '../../services/persona.service';
import {AsociacionService} from '../../services/asociacion.service';
import {NavbarService} from '../../services/navbar.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  solicitudesPendientesAsociacion: number;
  rol: string;
  id: number;
  nombre: string;
  private subscription: Subscription;

  constructor(private authService: AuthService,
              private asociacionService: AsociacionService,
              private personaService: PersonaService,
              private animalPersonaService: AnimalPersonaServiceService,
              private tokenService: TokenService,
              private navbarService: NavbarService) {
  }

  ngOnInit(): void {
    this.rol = this.tokenService.getTokenData().roles;
    this.id = this.tokenService.getTokenData().id;

    if (this.rol === 'ROLE_ASOC') {
      this.asociacionService.getAsociacionByUsuarioId(this.id).subscribe(asociacion => {
        this.nombre = asociacion.nombre;
      });
    }
    if (this.rol === 'ROLE_USER') {
      this.personaService.getPersonaByUsuarioId(this.id).subscribe(persona => {
        this.nombre = persona.nombre;
      });
    }
    if (this.rol === 'ROLE_ADMIN') {
      this.nombre = 'Admin';
    }

    this.loadSolicitudesPendientesAsociacion();

    this.subscription = this.navbarService.reloadObservable.subscribe(() => {
      this.loadSolicitudesPendientesAsociacion();
    });

  }

  loadSolicitudesPendientesAsociacion() {
    if (this.rol === 'ROLE_ASOC') {
      this.asociacionService.getAsociacionByUsuarioId(this.id).subscribe(asociacion => {
        this.animalPersonaService.getAnimalPersonasByAsociacionId(asociacion.id).subscribe(animalPersonas => {
          this.solicitudesPendientesAsociacion = animalPersonas.filter(animalPersona => !animalPersona.estado).length;
        });
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}
