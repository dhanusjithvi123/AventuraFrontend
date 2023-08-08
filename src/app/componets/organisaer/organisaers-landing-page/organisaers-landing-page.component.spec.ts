import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisaersLandingPageComponent } from './organisaers-landing-page.component';

describe('OrganisaersLandingPageComponent', () => {
  let component: OrganisaersLandingPageComponent;
  let fixture: ComponentFixture<OrganisaersLandingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganisaersLandingPageComponent]
    });
    fixture = TestBed.createComponent(OrganisaersLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
