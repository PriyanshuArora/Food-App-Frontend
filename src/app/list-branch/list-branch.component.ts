import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BranchService } from '../Services/branch.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-list-branch',
  templateUrl: './list-branch.component.html',
  styleUrls: ['./list-branch.component.css'],
})
export class ListBranchComponent implements OnInit, OnDestroy {
  constructor(
    private branchService: BranchService,
    private userService: UserService,
    private router: Router
  ) {}

  // local variables
  branchList: any;
  branchId: any;
  Subscription: Subscription | undefined;
  userRole = this.userService.getRole();

  ngOnInit(): void {
    if (this.userRole != 'Admin') {
      window.alert('You are not authorised to access this page.');
      this.router.navigate(['']);
    }
    this.Subscription = this.branchService.getBranchList().subscribe((data) => {
      this.branchList = data;
    });
  }

  // method to delete branch
  deleteBranch(id: any) {
    this.Subscription = this.branchService.deleteBranch(id).subscribe(
      (res) => {
        window.alert('Branch deleted successfully!');
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
        window.alert(err.message);
      }
    );
  }

  ngOnDestroy(): void {
    this.Subscription?.unsubscribe();
  }
}
