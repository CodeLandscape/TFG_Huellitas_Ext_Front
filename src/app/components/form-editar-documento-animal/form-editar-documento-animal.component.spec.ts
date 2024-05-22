import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditarDocumentoAnimalComponent } from './form-editar-documento-animal.component';

describe('FormEditarDocumentoAnimalComponent', () => {
  let component: FormEditarDocumentoAnimalComponent;
  let fixture: ComponentFixture<FormEditarDocumentoAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditarDocumentoAnimalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditarDocumentoAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
