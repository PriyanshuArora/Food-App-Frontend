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
    private menu:MenuService, 
    private user:UserService, 
    private branch:BranchService,
    private food:FoodService,
    private order:FoodorderService
  ) { }

  checkAdmin = this.user.isAdmin();
  checkBranchManager = this.user.isBranchManager();
  username = this.user.getName();
  branchId = this.user.getBranch();

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
    this.menu.getMenuList().subscribe((data)=>{
      this.menuList = data;
      for(let m of this.menuList.t) {
        if(m.branch != null) {
          if(m.branch.id == this.branchId) {
            this.menuCount++;
          }
        }
      }
    })
    
    this.user.getUserList().subscribe((data)=>{
      this.userList = data;
      for(let u of this.userList.t) {
        if(u.branch != null) {
          if(u.branch.id == this.branchId) {
            this.userCount++;
          }
        }
      }
    })

    this.food.getFoodList().subscribe((data)=>{
      this.foodList = data;
      for(let f of this.foodList.t) {
        if(f.branch != null) {
          if(f.branch.id == this.branchId) {
            this.foodCount++;
          }
        }
      }
    })

    this.order.getFoodOrderList().subscribe((data)=>{
      this.orderList = data;
      for(let o of this.orderList.t) {
        if(o.branch != null) {
          if(o.branch.id == this.branchId) {
            this.orderCount++;
          }
        }
      }
    })

    this.branch.getBranchList().subscribe((data)=>{
      this.branchList = data;
      for(let b of this.branchList.t) {
        if(b.id == this.branchId) {
          this.currentBranch = b;
        }
      }
    })
  }

  isLoggedIn() {
    return this.user.isLoggedIn();
  }
  
}
