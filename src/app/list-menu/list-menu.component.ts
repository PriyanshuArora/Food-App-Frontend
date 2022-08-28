import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from '../Services/food.service';
import { MenuService } from '../Services/menu.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.css']
})
export class ListMenuComponent implements OnInit {

  constructor(private food:FoodService, private menu:MenuService, private user:UserService, private router:Router) { }
  result:any;
  checkAdmin = this.user.isAdmin();
  checkBranchManager = this.user.isBranchManager();

  ngOnInit(): void {
    this.menu.getMenuList().subscribe((data)=>{
      this.result = data;
      console.log(this.result.t);
    })
    if(this.user.getRole() == "Staff") {
      window.alert("You are not authorised to access this page.");
      this.router.navigate(['']);
    }
  }

  deleteMenu(id:any) {
    this.menu.deleteMenu(id).subscribe((res)=>{
      window.alert("Menu deleted successfully!");
      this.ngOnInit();
    },(err)=>{
      console.log(err);
      window.alert(err.message);
    });
  }

}
