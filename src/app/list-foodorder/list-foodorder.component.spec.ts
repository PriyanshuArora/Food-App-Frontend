import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFoodorderComponent } from './list-foodorder.component';

describe('ListFoodorderComponent', () => {
  let component: ListFoodorderComponent;
  let fixture: ComponentFixture<ListFoodorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFoodorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFoodorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
