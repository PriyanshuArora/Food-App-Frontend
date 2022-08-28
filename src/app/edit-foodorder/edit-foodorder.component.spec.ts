import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFoodorderComponent } from './edit-foodorder.component';

describe('EditFoodorderComponent', () => {
  let component: EditFoodorderComponent;
  let fixture: ComponentFixture<EditFoodorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFoodorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFoodorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
