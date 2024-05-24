import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesAnimalComponent } from './solicitudes-animal.component';

describe('SolicitudesAnimalComponent', () => {
  let component: SolicitudesAnimalComponent;
  let fixture: ComponentFixture<SolicitudesAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesAnimalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
