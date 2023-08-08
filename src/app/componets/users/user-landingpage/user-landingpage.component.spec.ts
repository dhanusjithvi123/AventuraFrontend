import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLandingpageComponent } from './user-landingpage.component';

describe('UserLandingpageComponent', () => {
  let component: UserLandingpageComponent;
  let fixture: ComponentFixture<UserLandingpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLandingpageComponent]
    });
    fixture = TestBed.createComponent(UserLandingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
