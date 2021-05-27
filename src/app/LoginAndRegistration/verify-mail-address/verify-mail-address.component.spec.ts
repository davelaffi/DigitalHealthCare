import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyMailAddressComponent } from './verify-mail-address.component';

describe('VerifyMailAddressComponent', () => {
  let component: VerifyMailAddressComponent;
  let fixture: ComponentFixture<VerifyMailAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyMailAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyMailAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
