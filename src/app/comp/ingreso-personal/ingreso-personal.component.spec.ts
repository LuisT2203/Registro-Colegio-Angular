import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoPersonalComponent } from './ingreso-personal.component';

describe('IngresoPersonalComponent', () => {
  let component: IngresoPersonalComponent;
  let fixture: ComponentFixture<IngresoPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresoPersonalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngresoPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
