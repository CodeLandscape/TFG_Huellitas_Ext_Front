import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditarAnimalComponent } from './form-editar-animal.component';

describe('FormEditarAnimalComponent', () => {
  let component: FormEditarAnimalComponent;
  let fixture: ComponentFixture<FormEditarAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditarAnimalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditarAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
