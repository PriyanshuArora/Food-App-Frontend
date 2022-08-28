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
      window.alert("Branch deleted successfully!");
      this.ngOnInit();
    },(err)=>{
      console.log(err);
      window.alert(err.message);
    });
  }
}
