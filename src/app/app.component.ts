import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from './Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title = 'Food-App';
  Subscription: Subscription | undefined;

  constructor(
    private service:UserService,
    private router:Router
  ) {}

  getUserName() {
    return this.service.getName();
  }

  isLoggedIn() {
    return this.service.isLoggedIn();
  }

  isAdmin() {
    return this.service.isAdmin();
  }

  isBranchManager() {
    return this.service.isBranchManager();
  }

  isStaff() {
    return this.service.isStaff();
  }

  logOut() {
    this.Subscription = this.service.logOut().subscribe(val=>{
      this.router.navigate(['']);
    })
  }

  ngOnDestroy(): void {
    this.Subscription?.unsubscribe();
  }
}
