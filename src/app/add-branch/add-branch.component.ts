import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BranchService } from '../Services/branch.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css'],
})
export class AddBranchComponent implements OnInit, OnDestroy {
  constructor(
    private branchService: BranchService,
    private userService: UserService,
    private router: Router
  ) {}

  userRole = this.userService.getRole();
  Subscription: Subscription | undefined;

  ngOnInit(): void {
    if (this.userRole != 'Admin') {
      window.alert('You are not authorised to access this page.');
      this.router.navigate(['']);
    }
  }

  addBranch(form: NgForm) {
    this.Subscription = this.branchService.addBranch(form.value).subscribe(
      (res) => {
        window.alert('Branch added successfully!');
        this.router.navigate(['']);
      },
      (err) => {
        console.log(err);
        window.alert(err.error.message);
      }
    );
  }

  ngOnDestroy(): void {
    this.Subscription?.unsubscribe();
  }
}
