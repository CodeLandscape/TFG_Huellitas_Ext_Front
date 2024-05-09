import {Component, OnInit} from '@angular/core';
import {AnimalService} from '../../services/animal.service';
import {Animal} from '../../models/animal';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-perfil-animal',
  templateUrl: './perfil-animal.component.html',
  styleUrls: ['./perfil-animal.component.css']
})
export class PerfilAnimalComponent implements OnInit {

  animal: Animal;

  constructor(private animalService: AnimalService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cargarAnimal(params.id);
    });
  }

  private cargarAnimal(id: any) {
    this.animalService.getAnimal(id).subscribe((animal: Animal) => {
      this.animal = animal;
      this.animalService.getImagenAnimal(animal.id).subscribe((data: any) => {
        const blob = new Blob([data], {type: 'image/jpeg'});
        const url = window.URL.createObjectURL(blob);
        this.animal.imagen = this.sanitizer.bypassSecurityTrustUrl(url);
      });
    });
  }
}
