import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPerfilAsociacionComponent } from './form-perfil-asociacion.component';

describe('FormPerfilAsociacionComponent', () => {
  let component: FormPerfilAsociacionComponent;
  let fixture: ComponentFixture<FormPerfilAsociacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPerfilAsociacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPerfilAsociacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
