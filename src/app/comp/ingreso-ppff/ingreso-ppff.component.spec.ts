import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoPpffComponent } from './ingreso-ppff.component';

describe('IngresoPpffComponent', () => {
  let component: IngresoPpffComponent;
  let fixture: ComponentFixture<IngresoPpffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresoPpffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngresoPpffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
