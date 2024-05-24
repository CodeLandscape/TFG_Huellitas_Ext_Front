import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesAsociacionComponent } from './solicitudes-asociacion.component';

describe('SolicitudesAsociacionComponent', () => {
  let component: SolicitudesAsociacionComponent;
  let fixture: ComponentFixture<SolicitudesAsociacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesAsociacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesAsociacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
