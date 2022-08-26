import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  constructor(private user:UserService, private router:Router) { }
  data:any;

  ngOnInit(): void { 
    if(this.user.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }

  logUser(form:NgForm) {
    this.user.logUser(form.value.email,form.value.password).subscribe((res)=>{
      this.data = res;
      // console.log(res);
      if(this.data.status === 200) {
        console.log(this.data.t);
        localStorage.setItem('userid',this.data.t.id);
        localStorage.setItem('userrole',this.data.t.role);
        localStorage.setItem('username',this.data.t.name);
        if(this.data.t.role != "Admin") {
          localStorage.setItem('userbranch',this.data.t.branch.id);
        }
        this.router.navigate(['']);
      }
      else {
        window.alert(this.data.message);
      }
    },(err)=>{
      console.log(err);
      window.alert(err.error.message);
    });
  }
}
