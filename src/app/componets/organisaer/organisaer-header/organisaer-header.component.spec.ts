import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisaerHeaderComponent } from './organisaer-header.component';

describe('OrganisaerHeaderComponent', () => {
  let component: OrganisaerHeaderComponent;
  let fixture: ComponentFixture<OrganisaerHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganisaerHeaderComponent]
    });
    fixture = TestBed.createComponent(OrganisaerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
