import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchService } from '../Services/branch.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {

  constructor(private branch:BranchService, private user:UserService, private router:Router) { }

  ngOnInit(): void {
    if(this.user.getRole() != "Admin") {
      window.alert("You are not authorised to access this page.");
      this.router.navigate(['']);
    }
  }

  addBranch(form:NgForm) {
    console.log(form.value);
    this.branch.addBranch(form.value).subscribe((res)=>{
      window.alert("Branch added successfully!");
      this.router.navigate(['']);
    },(err)=>{
      console.log(err);
      window.alert(err.error.message);
    });
  }
}
