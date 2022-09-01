import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private router:Router) { }

  id: any;
  role:any;
  name:any;

  // method to check if user is logged-in
  isLoggedIn() {
    this.id = this.getId();
    this.role = this.getRole();
    this.name = this.getName();
    
    if (this.id == undefined || this.role == undefined || this.name == undefined) {
      return false;
    } else {
      return true;
    }
  }

  // method to check if logged-in user is admin
  isAdmin() {
    this.role = this.getRole();
    if(this.role == "Admin") {
      return true;
    }
    else {
      return false;
    }
  }

  // method to check if logged-in user is branch manager
  isBranchManager() {
    this.role = this.getRole();
    if(this.role == "Branch Manager") {
      return true;
    }
    else {
      return false;
    }
  }

  // method to check if logged-in user is staff
  isStaff() {
    this.role = this.getRole();
    if(this.role == "Staff") {
      return true;
    }
    else {
      return false;
    }
  }

  // Logging out user
  logOut() {
    localStorage.removeItem('userid');
    localStorage.removeItem('userrole');
    localStorage.removeItem('username');
    localStorage.removeItem('userbranch');
    return this.router.navigate(['']);
  }

  // Getting id from local storage.
  getId() {
    return localStorage.getItem('userid');
  }

  // Getting role from local storage.
  getRole() {
    return localStorage.getItem('userrole');
  }

  // Getting name from local storage.
  getName() {
    return localStorage.getItem('username');
  }

  // Getting branch from local storage.
  getBranch():any{
    return localStorage.getItem('userbranch');
  }

  // Saving user to the server using http post method
  addUser(user:any) {
    return this.http.post("http://localhost:8080/saveuser",user);
  }

  // Logging user from server using http post method
  logUser(email:any, password:any) {
    let queryParams = {"email":email,"password":password};
    return this.http.get("http://localhost:8080/login",{params:queryParams});
  }

  // Getting user list from the server using http get method
  getUserList() {
    return this.http.get("http://localhost:8080/alluser");
  }

  // Deleting user from the server using http delete method
  deleteUser(id: any) {
    return this.http.delete(`http://localhost:8080/deleteuser/${id}`);
  }

  // Updating user from the server using http put method
  editUser(id: any, user: any) {
    return this.http.put(`http://localhost:8080/updateuser/${id}`, user);
  }
}
