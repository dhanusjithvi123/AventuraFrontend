import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisaerLoginComponent } from './organisaer-login.component';

describe('OrganisaerLoginComponent', () => {
  let component: OrganisaerLoginComponent;
  let fixture: ComponentFixture<OrganisaerLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganisaerLoginComponent]
    });
    fixture = TestBed.createComponent(OrganisaerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
