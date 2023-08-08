import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlistAdminComponent } from './userlist-admin.component';

describe('UserlistAdminComponent', () => {
  let component: UserlistAdminComponent;
  let fixture: ComponentFixture<UserlistAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserlistAdminComponent]
    });
    fixture = TestBed.createComponent(UserlistAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
