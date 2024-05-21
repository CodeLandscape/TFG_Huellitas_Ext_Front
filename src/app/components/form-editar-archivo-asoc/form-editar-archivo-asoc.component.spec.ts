import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditarArchivoAsocComponent } from './form-editar-archivo-asoc.component';

describe('FormEditarArchivoAsocComponent', () => {
  let component: FormEditarArchivoAsocComponent;
  let fixture: ComponentFixture<FormEditarArchivoAsocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditarArchivoAsocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditarArchivoAsocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
