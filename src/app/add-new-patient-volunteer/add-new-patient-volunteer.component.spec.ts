import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPatientVolunteerComponent } from './add-new-patient-volunteer.component';

describe('AddNewPatientVolunteerComponent', () => {
  let component: AddNewPatientVolunteerComponent;
  let fixture: ComponentFixture<AddNewPatientVolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewPatientVolunteerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPatientVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
