import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEventlistingComponent } from './user-eventlisting.component';

describe('UserEventlistingComponent', () => {
  let component: UserEventlistingComponent;
  let fixture: ComponentFixture<UserEventlistingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEventlistingComponent]
    });
    fixture = TestBed.createComponent(UserEventlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
