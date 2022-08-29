import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../Services/branch.service';
import { FoodService } from '../Services/food.service';
import { FoodorderService } from '../Services/foodorder.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-edit-foodorder',
  templateUrl: './edit-foodorder.component.html',
  styleUrls: ['./edit-foodorder.component.css']
})
export class EditFoodorderComponent implements OnInit {

  constructor(
    private user: UserService,
    private router: Router,
    private order: FoodorderService,
    private foodService: FoodService,
    private branchService: BranchService,
    private route:ActivatedRoute
  ) {}

  // Local Variables
  result:any;
  selectedOrder:any;
  branch = { id: '' };
  temp:any
  foods:any = [];
  tempList:any = [];
  foodItem:any = { id: '' };
  checkBranchManager = this.user.isBranchManager();
  checkAdmin = this.user.isAdmin();
  foodlist: any;
  branchlist:any;

  ngOnInit(): void {
    if (this.user.getRole() == 'Staff') {
      window.alert('You are not authorised to access this page.');
      this.router.navigate(['']);
    }
    this.foodService.getFoodList().subscribe((data)=>{
      this.foodlist = data;
    })
    this.branchService.getBranchList().subscribe((data)=>{
      this.branchlist = data;
    })

    let id=this.route.snapshot.params['id'];
    this.order.getFoodOrderList().subscribe((data)=>{
      this.result = data;
      for(let r of this.result.t) {
        if(r.id == id) {
          this.selectedOrder = r;
          
          for(let o of this.selectedOrder.foods) {
            if(this.tempList==0) {
              this.temp = { id: '', quantity: 1 };
              this.temp.id = o.id;
              this.tempList.push(this.temp);
            }
            else {
              for(let i of this.tempList) {
                if(i.id == o.id) {
                  ++i.quantity;
                }
                else {
                  this.temp = { id: '', quantity: 0 };
                  this.temp.id = o.id;
                  this.tempList.push(this.temp);
                }
              }
            }
            this.temp = { id: '', quantity: 0 };
            this.temp.id = o.id;
            this.foods.push(this.temp);
          }
        }
      }
      console.log(this.tempList);
      console.log(this.foods);
    },(err)=>{
      console.log(err);
      window.alert(err.error.message);
    });
  }

  addFood(form: NgForm) {
    
    if(form.value.id == '') {
      window.alert("Select any food first!");
    }
    else if(this.foods.some((item: { id: any; }) => item.id == form.value.id)) {
      window.alert("Food already added! Select any other food.");
    }
    else {
      if(form.value.quantity == '') {
        window.alert("Enter food quantity!");
      }
      else {
        this.tempList.push(form.value);
        for(let i = 0; i < form.value.quantity; i++) {        
          this.foods.push(form.value);
        }
        form.resetForm();
      }
    }
  }

  deleteFood(item:any) {
    this.tempList.pop(item);
    for(let i = 0; i < item.quantity; i++) {        
      this.foods.pop(item);
    }
  }

  updateFoodOrder(form: NgForm) {
    form.value.foods=this.foods;
    if(this.user.getRole() == "Branch Manager") {
      this.branch.id = this.user.getBranch();
      form.value.branch = this.branch;
    } else {
      this.branch.id = form.value.branch;
      form.value.branch = this.branch;
    }

    this.order.editFoodOrder(this.selectedOrder.id,form.value).subscribe((res)=>{
      console.log(res);
      window.alert("Food Order updated successfully!");
      this.router.navigate(['orderlist']);
    },(err)=>{
      console.log(err);
      window.alert(err.error.message);
    });
  }

}
