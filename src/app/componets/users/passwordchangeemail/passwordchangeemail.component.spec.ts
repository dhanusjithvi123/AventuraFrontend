import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordchangeemailComponent } from './passwordchangeemail.component';

describe('PasswordchangeemailComponent', () => {
  let component: PasswordchangeemailComponent;
  let fixture: ComponentFixture<PasswordchangeemailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordchangeemailComponent]
    });
    fixture = TestBed.createComponent(PasswordchangeemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
