import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BranchService } from '../Services/branch.service';
import { UserService } from '../Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.css']
})
export class EditBranchComponent implements OnInit {

  constructor(private route:ActivatedRoute,private user:UserService, private branch:BranchService, private router:Router) { }
  result:any;
  selectedBranch:any;

  ngOnInit(): void {
    if(!this.user.isLoggedIn()) {
      window.alert("You are not authorised to access this page, please log in.");
      this.router.navigate(['loginuser']);
    }
    if(this.user.getRole() != "Admin") {
      window.alert("You are not authorised to access this page.");
      this.router.navigate(['']);
    }

    let id=this.route.snapshot.params['id'];
    this.branch.getBranchList().subscribe((data)=>{
      this.result = data;
      for(let r of this.result.t) {
        if(r.id == id) {
          this.selectedBranch = r;
        }
      }
    },(err)=>{
      console.log(err);
      window.alert(err.error.message);
    });
  }

  updateBranch(form:NgForm) {
    console.log(form.value);
    this.branch.editBranch(this.selectedBranch.id,form.value).subscribe((res)=>{
      console.log(res);
      this.router.navigate(['branchlist']);
    },(err)=>{
      console.log(err);
      window.alert(err.error.message);
    });
  }
}
