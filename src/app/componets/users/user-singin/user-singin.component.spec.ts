import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSinginComponent } from './user-singin.component';

describe('UserSinginComponent', () => {
  let component: UserSinginComponent;
  let fixture: ComponentFixture<UserSinginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSinginComponent]
    });
    fixture = TestBed.createComponent(UserSinginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
