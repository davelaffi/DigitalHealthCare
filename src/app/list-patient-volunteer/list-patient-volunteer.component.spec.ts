import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPatientVolunteerComponent } from './list-patient-volunteer.component';

describe('ListPatientVolunteerComponent', () => {
  let component: ListPatientVolunteerComponent;
  let fixture: ComponentFixture<ListPatientVolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPatientVolunteerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPatientVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
