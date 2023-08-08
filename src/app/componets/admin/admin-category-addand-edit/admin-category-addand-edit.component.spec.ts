import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryAddandEditComponent } from './admin-category-addand-edit.component';

describe('AdminCategoryAddandEditComponent', () => {
  let component: AdminCategoryAddandEditComponent;
  let fixture: ComponentFixture<AdminCategoryAddandEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCategoryAddandEditComponent]
    });
    fixture = TestBed.createComponent(AdminCategoryAddandEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
