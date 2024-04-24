import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPerfilPersonaComponent } from './form-perfil-persona.component';

describe('FormPerfilPersonaComponent', () => {
  let component: FormPerfilPersonaComponent;
  let fixture: ComponentFixture<FormPerfilPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPerfilPersonaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPerfilPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
