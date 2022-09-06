import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BranchService } from '../Services/branch.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit, OnDestroy {
  constructor(
    private userService: UserService,
    private branchService: BranchService,
    private router: Router
  ) {}

  // Local Variables
  branch = { id: '' };
  branchlist: any;
  checkAdmin = this.userService.isAdmin();
  checkBranchManager = this.userService.isBranchManager();
  userRole = this.userService.getRole();
  branchId = this.userService.getBranch();
  Subscription: Subscription | undefined;

  ngOnInit(): void {
    if (this.userRole == 'Staff') {
      window.alert('You are not authorised to access this page.');
      this.router.navigate(['']);
    }
    this.Subscription = this.branchService.getBranchList().subscribe((data) => {
      this.branchlist = data;
    });
  }

  // Method to save user
  addUser(form: NgForm) {
    if (this.userRole == 'Branch Manager') {
      form.value.role = 'Staff';
      this.branch.id = this.branchId;
      form.value.branch = this.branch;
    } else {
      this.branch.id = form.value.branch;
      form.value.branch = this.branch;
    }

    this.Subscription = this.userService.addUser(form.value).subscribe(
      (res) => {
        if (this.userRole == 'Branch Manager') {
          window.alert('Staff added successfully!');
        } else {
          window.alert('User added successfully!');
        }
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
