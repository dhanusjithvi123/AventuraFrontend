import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganiserRequestComponent } from './organiser-request.component';

describe('OrganiserRequestComponent', () => {
  let component: OrganiserRequestComponent;
  let fixture: ComponentFixture<OrganiserRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganiserRequestComponent]
    });
    fixture = TestBed.createComponent(OrganiserRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
