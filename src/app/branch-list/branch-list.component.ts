import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BranchService } from '../Services/branch.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.css']
})
export class BranchListComponent implements OnInit {

  constructor(private branch:BranchService, private user:UserService, private router:Router) { }
  result:any;

  ngOnInit(): void {
    if(!this.user.isLoggedIn()) {
      window.alert("You are not authorised to access this page, please log in.");
      this.router.navigate(['loginuser']);
    }
    this.branch.getBranchList().subscribe((data)=>{
      this.result = data;
      console.log(this.result.t);
    })
  }

}
