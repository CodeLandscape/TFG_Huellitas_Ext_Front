import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubirArchivoAsocComponent } from './form-subir-archivo-asoc.component';

describe('FormSubirArchivoAsocComponent', () => {
  let component: FormSubirArchivoAsocComponent;
  let fixture: ComponentFixture<FormSubirArchivoAsocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSubirArchivoAsocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSubirArchivoAsocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
