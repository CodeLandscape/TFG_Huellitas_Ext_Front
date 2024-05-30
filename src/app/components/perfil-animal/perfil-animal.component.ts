import {Component, OnInit} from '@angular/core';
import {AnimalService} from '../../services/animal.service';
import {Animal} from '../../models/animal';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import Swal from 'sweetalert2';
import {AnimalPersona} from '../../models/animalPersona';
import {ComunService} from '../../services/comun.service';
import {AnimalPersonaServiceService} from '../../services/animal-persona-service.service';
import {PersonaService} from '../../services/persona.service';
import {switchMap} from 'rxjs/operators';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-perfil-animal',
  templateUrl: './perfil-animal.component.html',
  styleUrls: ['./perfil-animal.component.css']
})
export class PerfilAnimalComponent implements OnInit {

  animal: Animal;
  animalPersona: AnimalPersona;
  isUser = false;
  isAsociacion = false;
  idUsuario: number;
  yaSolicitado = true;

  constructor(private animalService: AnimalService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private comunService: ComunService,
              private animalPersonaService: AnimalPersonaServiceService,
              private personaService: PersonaService,
              private tokenService: TokenService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cargarAnimal(params.id);
    });
    this.animalPersona = new AnimalPersona(); // Initialize animalPersona
    this.isUser = this.tokenService.getTokenData().roles === 'ROLE_USER';
    this.isAsociacion = this.tokenService.getTokenData().roles === 'ROLE_ASOC';
    this.idUsuario = this.tokenService.getTokenData().id;
    if (this.isUser) {
      this.personaService.getPersonaByUsuarioId(this.idUsuario).pipe(
        switchMap(persona => {
          this.animalPersona.idPersona = {id: persona.id}; // Initialize idPersona before using it
          return this.animalPersonaService.getAnimalPersonasByPersonaId(persona.id);
        })
      ).subscribe(
        animalPersonas => {
          this.yaSolicitado = animalPersonas.some(animalPersona => animalPersona.idAnimal.id == this.route.snapshot.params.id);
        }
      );
    }
  }

  private cargarAnimal(id: any) {
    this.animalService.getAnimal(id).subscribe((animal: Animal) => {
      this.animal = animal;
      this.animalService.getImagenAnimal(animal.id).subscribe((data: any) => {
        const blob = new Blob([data], {type: 'image/jpeg'});
        const url = window.URL.createObjectURL(blob);
        this.animal.imagen = this.sanitizer.bypassSecurityTrustUrl(url);
      });
    }, error => {
      console.log(error);
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

  solicitarAdopcion() {
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
        this.animalPersona = this.animalPersona || new AnimalPersona(); // Initialize animalPersona if it's not already
        this.animalPersona.idAnimal = {id: this.route.snapshot.params.id}; // Initialize idAnimal before using it
        const usuarioAutenticado = this.comunService.getUsuarioAutenticado();
        console.log(usuarioAutenticado);
        this.personaService.getPersonaByUsuarioId(usuarioAutenticado.id).pipe(
          switchMap(persona => {
            this.animalPersona.idPersona = {id: persona.id}; // Initialize idPersona inside switchMap
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
