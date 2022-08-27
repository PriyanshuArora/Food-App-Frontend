import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BranchService } from '../Services/branch.service';
import { UserService } from '../Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private route:ActivatedRoute,private user:UserService, private branchService:BranchService, private router:Router) { }
  checkAdmin = this.user.isAdmin();
  checkBranchManager = this.user.isBranchManager();
  branchlist:any;
  result:any;
  selectedUser:any;
  branch = { id:'' }

  ngOnInit(): void {
    if(!this.user.isLoggedIn()) {
      window.alert("You are not authorised to access this page, please log in.");
      this.router.navigate(['loginuser']);
    }
    if(this.user.getRole() == "Staff") {
      window.alert("You are not authorised to access this page.");
      this.router.navigate(['']);
    }
    this.branchService.getBranchList().subscribe((data)=>{
      this.branchlist = data;
    })

    let id=this.route.snapshot.params['id'];
    this.user.getUserList().subscribe((data)=>{
      this.result = data;
      for(let r of this.result.t) {
        if(r.id == id) {
          this.selectedUser = r;
        }
      }
    },(err)=>{
      console.log(err);
      window.alert(err.error.message);
    });
  }

  updateUser(form:NgForm) {
    if(this.user.getRole() == "Branch Manager") {
      form.value.role = "Staff";
      this.branch.id = this.user.getBranch();
      form.value.branch = this.branch;
    } else {
      this.branch.id = form.value.branch;
      form.value.branch = this.branch;
    }

    console.log(form.value);
    this.user.editUser(this.selectedUser.id,form.value).subscribe((res)=>{
      console.log(res);
      this.router.navigate(['userlist']);
    },(err)=>{
      console.log(err);
      window.alert(err.error.message);
    });
  }

}
