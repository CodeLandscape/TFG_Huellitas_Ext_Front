import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAnimalComponent } from './perfil-animal.component';

describe('PerfilAnimalComponent', () => {
  let component: PerfilAnimalComponent;
  let fixture: ComponentFixture<PerfilAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilAnimalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
