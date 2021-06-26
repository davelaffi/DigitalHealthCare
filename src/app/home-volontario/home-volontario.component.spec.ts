import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeVolontarioComponent } from './home-volontario.component';

describe('HomeVolontarioComponent', () => {
  let component: HomeVolontarioComponent;
  let fixture: ComponentFixture<HomeVolontarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeVolontarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeVolontarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
