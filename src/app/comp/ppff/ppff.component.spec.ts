import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpffComponent } from './ppff.component';

describe('PpffComponent', () => {
  let component: PpffComponent;
  let fixture: ComponentFixture<PpffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PpffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PpffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
