import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergenzaCovidComponent } from './emergenza-covid.component';

describe('EmergenzaCovidComponent', () => {
  let component: EmergenzaCovidComponent;
  let fixture: ComponentFixture<EmergenzaCovidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergenzaCovidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergenzaCovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
