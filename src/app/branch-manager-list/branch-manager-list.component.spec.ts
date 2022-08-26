import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchManagerListComponent } from './branch-manager-list.component';

describe('BranchManagerListComponent', () => {
  let component: BranchManagerListComponent;
  let fixture: ComponentFixture<BranchManagerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchManagerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
