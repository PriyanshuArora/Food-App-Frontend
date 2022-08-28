import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchService } from '../Services/branch.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-branch-manager-list',
  templateUrl: './branch-manager-list.component.html',
  styleUrls: ['./branch-manager-list.component.css']
})
export class BranchManagerListComponent implements OnInit {

  constructor(private branchService:BranchService, private user:UserService, private router:Router) { }
  branchlist:any;

  ngOnInit(): void {
    if(this.user.getRole() != "Admin") {
      window.alert("You are not authorised to access this page.");
      this.router.navigate(['']);
    }
    this.branchService.getBranchList().subscribe((data)=>{
      console.log(data);
      this.branchlist = data;
    })
  }

  result:any;
  getBranchManager(form:NgForm) {
    if(form.value.id == '') {
      window.alert("PLease select some value first.");
    } else {
    this.user.getBranchManager(form.value.id).subscribe((res)=>{
      console.log(res);
      this.result = res;
      this.result = this.result.t;
    },(err)=>{
      console.log(err);
      window.alert(err.error.message);
    });
  }
}
}
