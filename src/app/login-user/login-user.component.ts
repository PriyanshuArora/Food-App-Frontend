import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
})
export class LoginUserComponent implements OnInit, OnDestroy {
  constructor(
    private userService: UserService, 
    private router: Router
  ) {}

  // local variable
  data: any;
  Subscription: Subscription | undefined;

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }

  // method to login user
  logUser(form: NgForm) {
    this.Subscription = this.userService.logUser(form.value.email, form.value.password).subscribe(
      (res) => {
        this.data = res;
        if (this.data.status === 200) {
          localStorage.setItem('userid', this.data.t.id);
          localStorage.setItem('userrole', this.data.t.role);
          localStorage.setItem('username', this.data.t.name);
          if (this.data.t.role != 'Admin') {
            localStorage.setItem('userbranch', this.data.t.branch.id);
          }
          this.router.navigate(['']);
        } else {
          window.alert(this.data.message);
        }
      },
      (err) => {
        console.log(err);
        window.alert(err.error.message);
      }
    );
  }
  
  ngOnDestroy(): void {
    this.Subscription?.unsubscribe();
  }
}
