import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMenuShowcaseComponent } from './list-menu-showcase.component';

describe('ListMenuShowcaseComponent', () => {
  let component: ListMenuShowcaseComponent;
  let fixture: ComponentFixture<ListMenuShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMenuShowcaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMenuShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
