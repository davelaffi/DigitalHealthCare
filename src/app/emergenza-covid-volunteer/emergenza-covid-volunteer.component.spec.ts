import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergenzaCovidVolunteerComponent } from './emergenza-covid-volunteer.component';

describe('EmergenzaCovidVolunteerComponent', () => {
  let component: EmergenzaCovidVolunteerComponent;
  let fixture: ComponentFixture<EmergenzaCovidVolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergenzaCovidVolunteerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergenzaCovidVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
