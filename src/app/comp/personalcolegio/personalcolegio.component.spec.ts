import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalcolegioComponent } from './personalcolegio.component';

describe('PersonalcolegioComponent', () => {
  let component: PersonalcolegioComponent;
  let fixture: ComponentFixture<PersonalcolegioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalcolegioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalcolegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
