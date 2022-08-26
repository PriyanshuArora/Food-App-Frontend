import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoodorderComponent } from './add-foodorder.component';

describe('AddFoodorderComponent', () => {
  let component: AddFoodorderComponent;
  let fixture: ComponentFixture<AddFoodorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFoodorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFoodorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
