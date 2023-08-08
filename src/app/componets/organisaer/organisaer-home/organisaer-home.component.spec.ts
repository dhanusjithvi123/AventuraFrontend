import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisaerHomeComponent } from './organisaer-home.component';

describe('OrganisaerHomeComponent', () => {
  let component: OrganisaerHomeComponent;
  let fixture: ComponentFixture<OrganisaerHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganisaerHomeComponent]
    });
    fixture = TestBed.createComponent(OrganisaerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
