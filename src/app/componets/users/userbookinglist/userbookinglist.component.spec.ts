import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbookinglistComponent } from './userbookinglist.component';

describe('UserbookinglistComponent', () => {
  let component: UserbookinglistComponent;
  let fixture: ComponentFixture<UserbookinglistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserbookinglistComponent]
    });
    fixture = TestBed.createComponent(UserbookinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
