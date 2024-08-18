import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaexternaComponent } from './personaexterna.component';

describe('PersonaexternaComponent', () => {
  let component: PersonaexternaComponent;
  let fixture: ComponentFixture<PersonaexternaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonaexternaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonaexternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
