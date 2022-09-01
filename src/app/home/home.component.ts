import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BranchService } from '../Services/branch.service';
import { FoodService } from '../Services/food.service';
import { FoodorderService } from '../Services/foodorder.service';
import { MenuService } from '../Services/menu.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private menuService:MenuService, 
    private userService:UserService, 
    private branchService:BranchService,
    private foodService:FoodService,
    private orderService:FoodorderService
  ) { }

  checkAdmin = this.userService.isAdmin();
  checkBranchManager = this.userService.isBranchManager();
  username = this.userService.getName();
  branchId = this.userService.getBranch();

  userList:any;
  foodList:any;
  menuList:any;
  orderList:any;
  branchList:any;

  userCount = 0;
  foodCount = 0;
  menuCount = 0;
  orderCount = 0;
  currentBranch:any;


  ngOnInit(): void {
    this.menuService.getMenuList().subscribe((data)=>{
      this.menuList = data;
      for(let m of this.menuList.t) {
        if(m.branch != null) {
          if(m.branch.id == this.branchId) {
            this.menuCount++;
          }
        }
      }
    })
    
    this.userService.getUserList().subscribe((data)=>{
      this.userList = data;
      for(let u of this.userList.t) {
        if(u.branch != null) {
          if(u.branch.id == this.branchId) {
            this.userCount++;
          }
        }
      }
    })

    this.foodService.getFoodList().subscribe((data)=>{
      this.foodList = data;
      for(let f of this.foodList.t) {
        if(f.branch != null) {
          if(f.branch.id == this.branchId) {
            this.foodCount++;
          }
        }
      }
    })

    this.orderService.getFoodOrderList().subscribe((data)=>{
      this.orderList = data;
      for(let o of this.orderList.t) {
        if(o.branch != null) {
          if(o.branch.id == this.branchId) {
            this.orderCount++;
          }
        }
      }
    })

    this.branchService.getBranchList().subscribe((data)=>{
      this.branchList = data;
      for(let b of this.branchList.t) {
        if(b.id == this.branchId) {
          this.currentBranch = b;
        }
      }
    })
  }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }
  
}
