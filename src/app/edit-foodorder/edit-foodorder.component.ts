import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BranchService } from '../Services/branch.service';
import { FoodService } from '../Services/food.service';
import { FoodorderService } from '../Services/foodorder.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-edit-foodorder',
  templateUrl: './edit-foodorder.component.html',
  styleUrls: ['./edit-foodorder.component.css'],
})
export class EditFoodorderComponent implements OnInit, OnDestroy {

  constructor(
    private userService: UserService,
    private orderService: FoodorderService,
    private foodService: FoodService,
    private branchService: BranchService,
    private route:ActivatedRoute,
    private router: Router,
  ) {}

  // Local Variables
  foodOrderList:any;
  selectedOrder:any;
  branch = { id: '' };
  // foods:any = [];
  foodsTemp:any = [];
  foodlist: any;
  branchlist:any;
  checkBranchManager = this.userService.isBranchManager();
  checkAdmin = this.userService.isAdmin();
  userRole = this.userService.getRole();
  branchId = this.userService.getBranch();
  Subscription: Subscription | undefined;

  ngOnInit(): void {
    this.Subscription = this.foodService.getFoodList().subscribe((data)=>{
      this.foodlist = data;
    })
    this.Subscription = this.branchService.getBranchList().subscribe((data)=>{
      this.branchlist = data;
    })

    let id=this.route.snapshot.params['id'];
    this.Subscription = this.orderService.getFoodOrderList().subscribe((data)=>{
      this.foodOrderList = data;
      for(let r of this.foodOrderList.t) {
        if(r.id == id) {
          this.selectedOrder = r;
          this.foodsTemp = this.selectedOrder.foods;
        }
      }
    },(err)=>{
      console.log(err);
      window.alert(err.error.message);
    });
  }

  // Method to add foods in order
  addFood(form: NgForm) {
    
    if(form.value.id == '') {
      window.alert("Select any food first!");
    }
    else if(this.foodsTemp.some((item: { id: any; }) => item.id == form.value.id)) {
      window.alert("Food already added! Select any other food.");
    }
    else {
      if(form.value.quantity == '') {
        window.alert("Enter food quantity!");
      }
      else {
        for(let i = 0; i < form.value.quantity; i++) {        
          this.selectedOrder.foods.push(Object.assign({}, form.value));
        }
        form.resetForm();
      }
    }
  }

  // Method to delete foods from order
  deleteFood(item:any) {
    this.foodsTemp.splice(this.foodsTemp.findIndex((obj: { id: any; }) => obj.id == item.id), 1);
    for(let i = 0; i < item.quantity; i++) {   
      if(this.selectedOrder.foods.findIndex((obj: { id: any; }) => obj.id == item.id)>-1) {
        this.selectedOrder.foods.splice(this.selectedOrder.foods.findIndex((obj: { id: any; }) => obj.id == item.id), 1);
      }
    }
  }

  // Method to update food order
  updateFoodOrder(form: NgForm) {
    form.value.foods=this.selectedOrder.foods;
    if(this.userRole != "Admin") {
      this.branch.id = this.branchId;
      form.value.branch = this.branch;
    } else {
      this.branch.id = form.value.branch;
      form.value.branch = this.branch;
    }

    this.Subscription = this.orderService.editFoodOrder(this.selectedOrder.id,form.value).subscribe((res)=>{
      window.alert("Food Order updated successfully!");
      this.router.navigate(['orderlist']);
    },(err)=>{
      console.log(err);
      window.alert(err.error.message);
    });
  }

  ngOnDestroy(): void {
    this.Subscription?.unsubscribe();
  }

}
