import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubirDocumentoAnimalComponent } from './form-subir-documento-animal.component';

describe('FormSubirArchivoAnimalComponent', () => {
  let component: FormSubirDocumentoAnimalComponent;
  let fixture: ComponentFixture<FormSubirDocumentoAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSubirDocumentoAnimalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSubirDocumentoAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
