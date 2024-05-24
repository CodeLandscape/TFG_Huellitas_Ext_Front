import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalesAsociacionComponent } from './animales-asociacion.component';

describe('AnimalesAsociacionComponent', () => {
  let component: AnimalesAsociacionComponent;
  let fixture: ComponentFixture<AnimalesAsociacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalesAsociacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalesAsociacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
