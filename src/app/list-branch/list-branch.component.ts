import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BranchService } from '../Services/branch.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-list-branch',
  templateUrl: './list-branch.component.html',
  styleUrls: ['./list-branch.component.css']
})
export class ListBranchComponent implements OnInit {

  constructor(private branch:BranchService, private user:UserService, private router:Router) { }
  result:any;

  ngOnInit(): void {
    if(!this.user.isLoggedIn()) {
      window.alert("You are not authorised to access this page, please log in.");
      this.router.navigate(['loginuser']);
    }
    if(this.user.getRole() != "Admin") {
      window.alert("You are not authorised to access this page.");
      this.router.navigate(['']);
    }
    this.branch.getBranchList().subscribe((data)=>{
      this.result = data;
      console.log(this.result.t);
    })
  }

  deleteBranch(id:any) {
    this.branch.deleteBranch(id).subscribe((res)=>{
      console.log(res);
      // this.router.navigate(['products']);
      this.branch.getBranchList().subscribe((data)=>{
        this.result = data;
        console.log(this.result.t);
      })
    },(err)=>{
      console.log(err);
      window.alert(err.message);
    });
  }
}
