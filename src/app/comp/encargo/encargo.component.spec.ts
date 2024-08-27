import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncargoComponent } from './encargo.component';

describe('EncargoComponent', () => {
  let component: EncargoComponent;
  let fixture: ComponentFixture<EncargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncargoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EncargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
