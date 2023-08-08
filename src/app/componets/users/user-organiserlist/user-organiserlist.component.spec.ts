import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrganiserlistComponent } from './user-organiserlist.component';

describe('UserOrganiserlistComponent', () => {
  let component: UserOrganiserlistComponent;
  let fixture: ComponentFixture<UserOrganiserlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserOrganiserlistComponent]
    });
    fixture = TestBed.createComponent(UserOrganiserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
