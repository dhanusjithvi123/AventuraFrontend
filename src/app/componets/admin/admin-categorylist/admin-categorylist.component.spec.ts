import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategorylistComponent } from './admin-categorylist.component';

describe('AdminCategorylistComponent', () => {
  let component: AdminCategorylistComponent;
  let fixture: ComponentFixture<AdminCategorylistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCategorylistComponent]
    });
    fixture = TestBed.createComponent(AdminCategorylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
