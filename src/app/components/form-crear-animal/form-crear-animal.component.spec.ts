import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrearAnimalComponent } from './form-crear-animal.component';

describe('FormCrearAnimalComponent', () => {
  let component: FormCrearAnimalComponent;
  let fixture: ComponentFixture<FormCrearAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCrearAnimalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCrearAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
