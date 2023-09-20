import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerchatComponent } from './organizerchat.component';

describe('OrganizerchatComponent', () => {
  let component: OrganizerchatComponent;
  let fixture: ComponentFixture<OrganizerchatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizerchatComponent]
    });
    fixture = TestBed.createComponent(OrganizerchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
