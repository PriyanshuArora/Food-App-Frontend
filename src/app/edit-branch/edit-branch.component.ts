import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BranchService } from '../Services/branch.service';
import { UserService } from '../Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.css'],
})
export class EditBranchComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private branchService: BranchService,
    private router: Router
  ) {}

  // local variables
  branchList: any;
  selectedBranch: any;
  userRole = this.userService.getRole();
  Subscription: Subscription | undefined;

  ngOnInit(): void {
    if (this.userRole != 'Admin') {
      window.alert('You are not authorised to access this page.');
      this.router.navigate(['']);
    }

    let id = this.route.snapshot.params['id'];
    this.Subscription = this.branchService.getBranchList().subscribe(
      (data) => {
        this.branchList = data;
        for (let r of this.branchList.t) {
          if (r.id == id) {
            this.selectedBranch = r;
          }
        }
      },
      (err) => {
        console.log(err);
        window.alert(err.error.message);
      }
    );
  }

  // Method to update branch
  updateBranch(form: NgForm) {
    this.Subscription = this.branchService.editBranch(this.selectedBranch.id, form.value).subscribe(
      (res) => {
        window.alert("Branch updated successfully!");
        this.router.navigate(['branchlist']);
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
