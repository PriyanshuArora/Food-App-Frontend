import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
  constructor(
    private userService: UserService, 
    private router: Router
  ) {}

  // local variables
  tempList: any;
  list: any = { t: [] };
  value: any;
  option: any;
  checkAdmin = this.userService.isAdmin();
  checkBranchManager = this.userService.isBranchManager();
  userRole = this.userService.getRole();
  branchId = this.userService.getBranch();

  ngOnInit(): void {
    if (this.userRole == 'Staff') {
      window.alert('You are not authorised to access this page.');
      this.router.navigate(['']);
    }
    this.userService.getUserList().subscribe((data) => {
      this.tempList = data;
      if (this.userRole == 'Branch Manager') {
        for (let u of this.tempList.t) {
          if (u.branch != null) {
            if (u.branch.id == this.branchId) {
              this.list.t.push(u);
            }
          }
        }
      } else {
        this.list = this.tempList;
      }
    });
  }

  // method to filter user
  getUser(form: NgForm) {
    if (form.value.choice == 'bid' && form.value.id == '') {
      window.alert('Enter id value to be searched.');
    } else if (form.value.choice == 'uid' && form.value.id == '') {
      window.alert('Enter id value to be searched.');
    } else {
      this.value = form.value.id;
      this.option = form.value.choice;
    }
  }

  // method to delete user
  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe(
      (res) => {
        // this.user.getUserList().subscribe((res)=>{
        //     this.list = res;
        //   })
        window.alert('User deleted successfully!');
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
        window.alert(err.message);
      }
    );
  }
}
