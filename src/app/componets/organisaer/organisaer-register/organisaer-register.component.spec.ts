import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisaerRegisterComponent } from './organisaer-register.component';

describe('OrganisaerRegisterComponent', () => {
  let component: OrganisaerRegisterComponent;
  let fixture: ComponentFixture<OrganisaerRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganisaerRegisterComponent]
    });
    fixture = TestBed.createComponent(OrganisaerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
