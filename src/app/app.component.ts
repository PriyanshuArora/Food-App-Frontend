import { Component } from '@angular/core';
import { UserService } from './Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Food-App';

  constructor(private service:UserService) {}

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
    this.service.logOut();
  }
}
