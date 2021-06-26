import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileVolunteerComponent } from './my-profile-volunteer.component';

describe('MyProfileVolunteerComponent', () => {
  let component: MyProfileVolunteerComponent;
  let fixture: ComponentFixture<MyProfileVolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyProfileVolunteerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
