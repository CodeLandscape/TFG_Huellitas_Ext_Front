import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivosAsociacionComponent } from './archivos-asociacion.component';

describe('DocumentosAsociacionComponent', () => {
  let component: ArchivosAsociacionComponent;
  let fixture: ComponentFixture<ArchivosAsociacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivosAsociacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivosAsociacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
