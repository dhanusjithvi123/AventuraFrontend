import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisaerAdminComponent } from './organisaer-admin.component';

describe('OrganisaerAdminComponent', () => {
  let component: OrganisaerAdminComponent;
  let fixture: ComponentFixture<OrganisaerAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganisaerAdminComponent]
    });
    fixture = TestBed.createComponent(OrganisaerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
