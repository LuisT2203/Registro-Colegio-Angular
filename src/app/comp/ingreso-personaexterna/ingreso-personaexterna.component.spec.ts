import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoPersonaexternaComponent } from './ingreso-personaexterna.component';

describe('IngresoPersonaexternaComponent', () => {
  let component: IngresoPersonaexternaComponent;
  let fixture: ComponentFixture<IngresoPersonaexternaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresoPersonaexternaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngresoPersonaexternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
