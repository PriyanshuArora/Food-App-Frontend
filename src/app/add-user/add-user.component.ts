import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchService } from '../Services/branch.service';
import { UserService } from '../Services/user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private user:UserService, private branchService:BranchService, private router:Router) { }

  // Local Variables
  branch = { id:'' }
  checkAdmin = this.user.isAdmin();
  checkBranchManager = this.user.isBranchManager();
  branchlist:any;

  ngOnInit(): void {
    if(this.user.getRole() == "Staff") {
      window.alert("You are not authorised to access this page.");
      this.router.navigate(['']);
    }
    this.branchService.getBranchList().subscribe((data)=>{
      this.branchlist = data;
    })
  }

  // Methods
  addUser(form:NgForm) {

    if(this.user.getRole() == "Branch Manager") {
      form.value.role = "Staff";
      this.branch.id = this.user.getBranch();
      form.value.branch = this.branch;
    } else {
      this.branch.id = form.value.branch;
      form.value.branch = this.branch;
    }

    this.user.addUser(form.value).subscribe((res)=>{
      if(this.user.getRole() == "Branch Manager") {
        window.alert("Staff added successfully!");
      }
      else {
        window.alert("User added successfully!");
      }
      this.router.navigate(['']);
    },(err)=>{
      console.log(err);
      window.alert(err.error.message);
    });
  }
}
