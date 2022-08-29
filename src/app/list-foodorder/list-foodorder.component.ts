import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodorderService } from '../Services/foodorder.service';
import { MenuService } from '../Services/menu.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-list-foodorder',
  templateUrl: './list-foodorder.component.html',
  styleUrls: ['./list-foodorder.component.css']
})
export class ListFoodorderComponent implements OnInit {

  constructor(private order:FoodorderService, private user:UserService, private router:Router) { }
  result:any;
  checkAdmin = this.user.isAdmin();
  checkBranchManager = this.user.isBranchManager();

  ngOnInit(): void {
    this.order.getFoodOrderList().subscribe((data)=>{
      this.result = data;
      console.log(this.result.t);
    })
    if(this.user.getRole() == "Staff") {
      window.alert("You are not authorised to access this page.");
      this.router.navigate(['']);
    }
  }

  deleteFoodOrder(id:any) {
    this.order.deleteFoodOrder(id).subscribe((res)=>{
      window.alert("Food Order deleted successfully!");
      this.ngOnInit();
    },(err)=>{
      console.log(err);
      window.alert(err.message);
    });
  }


}
