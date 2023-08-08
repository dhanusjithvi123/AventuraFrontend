import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganiserbookinglistComponent } from './organiserbookinglist.component';

describe('OrganiserbookinglistComponent', () => {
  let component: OrganiserbookinglistComponent;
  let fixture: ComponentFixture<OrganiserbookinglistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganiserbookinglistComponent]
    });
    fixture = TestBed.createComponent(OrganiserbookinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
