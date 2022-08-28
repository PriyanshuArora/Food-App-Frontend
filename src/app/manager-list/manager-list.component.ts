import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.css']
})
export class ManagerListComponent implements OnInit {

  constructor(private user:UserService, private router:Router) { }
  result:any;

  ngOnInit(): void {
    if(this.user.getRole() == "Staff") {
      window.alert("You are not authorised to access this page.");
      this.router.navigate(['']);
    }
    this.user.getManagerList().subscribe((data)=>{
      this.result = data;
      console.log(this.result.t);
    })
  }


}
