import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisaerEventeditingComponent } from './organisaer-eventediting.component';

describe('OrganisaerEventeditingComponent', () => {
  let component: OrganisaerEventeditingComponent;
  let fixture: ComponentFixture<OrganisaerEventeditingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganisaerEventeditingComponent]
    });
    fixture = TestBed.createComponent(OrganisaerEventeditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
