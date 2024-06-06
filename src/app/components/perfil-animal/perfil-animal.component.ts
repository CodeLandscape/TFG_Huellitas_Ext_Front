import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../../services/animal.service';
import { Animal } from '../../models/animal';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { AnimalPersona } from '../../models/animalPersona';
import { ComunService } from '../../services/comun.service';
import { AnimalPersonaServiceService } from '../../services/animal-persona-service.service';
import { PersonaService } from '../../services/persona.service';
import { switchMap } from 'rxjs/operators';
import { TokenService } from '../../services/token.service';

/**
 * Componente para mostrar el perfil de un animal.
 *
 * @@Component
 */
@Component({
  selector: 'app-perfil-animal',
  templateUrl: './perfil-animal.component.html',
  styleUrls: ['./perfil-animal.component.css']
})
export class PerfilAnimalComponent implements OnInit {
  /** Información del animal */
  animal: Animal;
  /** Información de la relación entre el animal y la persona */
  animalPersona: AnimalPersona;
  /** Indica si el usuario actual es un usuario normal */
  isUser = false;
  /** Indica si el usuario actual es una asociación */
  isAsociacion = false;
  /** ID del usuario actual */
  idUsuario: number;
  /** Indica si el usuario ya ha solicitado la adopción de este animal */
  yaSolicitado = true;
  /** Indica si la imagen del animal ha sido cargada */
  imageLoaded: boolean;

  /**
   * Constructor del componente del perfil del animal.
   *
   * @param {AnimalService} animalService - Servicio para manejar la información de los animales.
   * @param {ActivatedRoute} route - Servicio para acceder a los parámetros de la ruta.
   * @param {DomSanitizer} sanitizer - Servicio para sanitizar URLs.
   * @param {ComunService} comunService - Servicio común compartido entre componentes.
   * @param {AnimalPersonaServiceService} animalPersonaService - Servicio para manejar la información de la relación entre animales y personas.
   * @param {PersonaService} personaService - Servicio para manejar la información de las personas.
   * @param {TokenService} tokenService - Servicio para manejar los tokens de autenticación.
   * @param {Router} router - Servicio para navegar entre componentes.
   */
  constructor(
    private animalService: AnimalService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private comunService: ComunService,
    private animalPersonaService: AnimalPersonaServiceService,
    private personaService: PersonaService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  /**
   * Método de inicialización del componente.
   * Carga la información del animal y establece las variables de usuario y asociación.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cargarAnimal(params.id);
    });
    this.animalPersona = new AnimalPersona(); // Inicializar animalPersona
    this.isUser = this.tokenService.getTokenData().roles === 'ROLE_USER';
    this.isAsociacion = this.tokenService.getTokenData().roles === 'ROLE_ASOC';
    this.idUsuario = this.tokenService.getTokenData().id;
    if (this.isUser) {
      this.personaService.getPersonaByUsuarioId(this.idUsuario).pipe(
        switchMap(persona => {
          this.animalPersona.idPersona = { id: persona.id }; // Inicializar idPersona antes de usarlo
          return this.animalPersonaService.getAnimalPersonasByPersonaId(persona.id);
        })
      ).subscribe(
        animalPersonas => {
          this.yaSolicitado = animalPersonas.some(animalPersona => animalPersona.idAnimal.id == this.route.snapshot.params.id);
        }
      );
    }
  }

  /**
   * Carga la información del animal.
   *
   * @param {any} id - ID del animal.
   * @returns {void}
   */
  private cargarAnimal(id: any) {
    this.animalService.getAnimal(id).subscribe((animal: Animal) => {
      this.animal = animal;
      this.animalService.getImagenAnimal(animal.id).subscribe((data: any) => {
        const blob = new Blob([data], { type: 'image/jpeg' });
        const url = window.URL.createObjectURL(blob);
        this.animal.imagen = this.sanitizer.bypassSecurityTrustUrl(url);
        this.imageLoaded = true;
      });
    }, error => {
      Swal.fire({
        title: 'Error',
        text: 'No se ha podido cargar el animal',
        icon: 'error'
      });
      if (this.tokenService.getTokenData().roles === 'ROLE_ASOC') {
        this.router.navigate(['animales-asociacion']);
      } else {
        this.router.navigate(['listadoAnimales']);
      }
    });
  }

  /**
   * Envía una solicitud de adopción para el animal actual.
   *
   * @returns {void}
   */
  solicitarAdopcion(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres solicitar la adopción de este animal?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, solicitar adopción!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.animalPersona = this.animalPersona || new AnimalPersona(); // Inicializar animalPersona si aún no lo está
        this.animalPersona.idAnimal = { id: this.route.snapshot.params.id }; // Inicializar idAnimal antes de usarlo
        const usuarioAutenticado = this.comunService.getUsuarioAutenticado();
        this.personaService.getPersonaByUsuarioId(usuarioAutenticado.id).pipe(
          switchMap(persona => {
            this.animalPersona.idPersona = { id: persona.id }; // Inicializar idPersona dentro de switchMap
            return this.animalPersonaService.solicitarAdopcion(this.animalPersona);
          })
        ).subscribe(
          res => {
            console.log(res);
            Swal.fire(
              '¡Solicitud enviada!',
              'Tu solicitud de adopción ha sido enviada. Se te notificará en los próximos días si la asociación acepta o rechaza la solicitud. Si es aceptada, la asociación contactará contigo a través de tu correo o de tu móvil. ¡Gracias por tu interés!',
              'success'
            );
            this.yaSolicitado = true;
          }
        );
      }
    });
  }
}
