import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BranchService } from '../Services/branch.service';
import { UserService } from '../Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit, OnDestroy {
  constructor(
    private userService: UserService,
    private branchService: BranchService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  
  // local variables
  branchlist: any;
  userList: any;
  selectedUser: any;
  branch = { id: '' };
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

    let id = this.route.snapshot.params['id'];
    this.Subscription = this.userService.getUserList().subscribe(
      (data) => {
        this.userList = data;
        for (let r of this.userList.t) {
          if (r.id == id) {
            this.selectedUser = r;
          }
        }
      },
      (err) => {
        console.log(err);
        window.alert(err.error.message);
      }
    );
  }

  // Method to update user
  updateUser(form: NgForm) {
    if (this.userRole == 'Branch Manager') {
      form.value.role = 'Staff';
      this.branch.id = this.branchId;
      form.value.branch = this.branch;
    } else {
      this.branch.id = form.value.branch;
      form.value.branch = this.branch;
    }

    this.Subscription = this.userService.editUser(this.selectedUser.id, form.value).subscribe(
      (res) => {
        window.alert("User updated successfully!");
        this.router.navigate(['userlist']);
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
