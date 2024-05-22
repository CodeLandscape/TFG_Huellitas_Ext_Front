import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosAnimalComponent } from './documentos-animal.component';

describe('DocumentosAnimalComponent', () => {
  let component: DocumentosAnimalComponent;
  let fixture: ComponentFixture<DocumentosAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosAnimalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentosAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
