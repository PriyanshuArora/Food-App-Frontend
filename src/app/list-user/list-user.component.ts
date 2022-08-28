import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  constructor(private user:UserService, private router:Router) { }
  tempList:any;
  list:any = { t:[] }
  role = this.user.getRole();
  value:any;
  option:any;
  checkAdmin = this.user.isAdmin();
  checkBranchManager = this.user.isBranchManager();

  ngOnInit(): void {
    if(this.role == "Staff") {
      window.alert("You are not authorised to access this page.");
      this.router.navigate(['']);
    }
    this.user.getUserList().subscribe((data)=>{
      this.tempList = data;
      if(this.role == "Branch Manager") {
        for (let u of this.tempList.t) {
          if(u.branch != null) {
            if(u.branch.id == this.user.getBranch()) {
              this.list.t.push(u);
            }
          }
        }
      }
      else {
        this.list = this.tempList;
      }
    })
  }

  getUser(form:NgForm) {
    
    if(form.value.choice == "bid" && form.value.id == '') {
      window.alert("Enter id value to be searched.");
    } else if(form.value.choice == "uid" && form.value.id == '') {
      window.alert("Enter id value to be searched.");
    } 
   
    else {
      this.value = form.value.id;
      this.option = form.value.choice;
    }
  }

  deleteUser(id:any) {
    this.user.deleteUser(id).subscribe((res)=>{
      // this.router.navigate(['products']);
      // this.user.getUserList().subscribe((res)=>{
      //     this.list = res;
      //   })
      window.alert("User deleted successfully!");
      this.ngOnInit();
    },(err)=>{
      console.log(err);
      window.alert(err.message);
    });
  }
}
