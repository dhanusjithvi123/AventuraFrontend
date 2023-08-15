import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganiserprofileComponent } from './organiserprofile.component';

describe('OrganiserprofileComponent', () => {
  let component: OrganiserprofileComponent;
  let fixture: ComponentFixture<OrganiserprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganiserprofileComponent]
    });
    fixture = TestBed.createComponent(OrganiserprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
