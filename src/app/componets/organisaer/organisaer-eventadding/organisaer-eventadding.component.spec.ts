import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisaerEventaddingComponent } from './organisaer-eventadding.component';

describe('OrganisaerEventaddingComponent', () => {
  let component: OrganisaerEventaddingComponent;
  let fixture: ComponentFixture<OrganisaerEventaddingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganisaerEventaddingComponent]
    });
    fixture = TestBed.createComponent(OrganisaerEventaddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
