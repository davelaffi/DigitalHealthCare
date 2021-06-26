import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProfileVolunteerComponent } from './patient-profile-volunteer.component';

describe('PatientProfileVolunteerComponent', () => {
  let component: PatientProfileVolunteerComponent;
  let fixture: ComponentFixture<PatientProfileVolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientProfileVolunteerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientProfileVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
