import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOtppageComponent } from './user-otppage.component';

describe('UserOtppageComponent', () => {
  let component: UserOtppageComponent;
  let fixture: ComponentFixture<UserOtppageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserOtppageComponent]
    });
    fixture = TestBed.createComponent(UserOtppageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
