import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisaerPayformComponent } from './organisaer-payform.component';

describe('OrganisaerPayformComponent', () => {
  let component: OrganisaerPayformComponent;
  let fixture: ComponentFixture<OrganisaerPayformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganisaerPayformComponent]
    });
    fixture = TestBed.createComponent(OrganisaerPayformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
