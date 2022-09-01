import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchService } from '../Services/branch.service';
import { FoodService } from '../Services/food.service';
import { FoodorderService } from '../Services/foodorder.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-add-foodorder',
  templateUrl: './add-foodorder.component.html',
  styleUrls: ['./add-foodorder.component.css']
})
export class AddFoodorderComponent implements OnInit {

  constructor(
    private userService: UserService,
    private foodService: FoodService,
    private orderService: FoodorderService,
    private branchService: BranchService,
    private router: Router
  ) {}

  // Local Variables
  branch = { id: '' };
  foods:any = [];
  foodsTemp:any = [];
  foodlist: any;
  branchlist:any;
  checkAdmin = this.userService.isAdmin();
  userRole = this.userService.getRole();

  ngOnInit(): void {
    this.foodService.getFoodList().subscribe((data)=>{
      this.foodlist = data;
    })
    this.branchService.getBranchList().subscribe((data)=>{
      this.branchlist = data;
    })
    console.log(this.foodlist);
  }

  // Method to add foods in order
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
        this.foodsTemp.push(form.value);
        for(let i = 0; i < form.value.quantity; i++) {        
          this.foods.push(form.value);
        }
        form.resetForm();
      }
    }
  }

  // Method to delete foods from order
  deleteFood(item:any) {
    this.foodsTemp.splice(this.foodsTemp.indexOf(item), 1);
    for(let i = 0; i < item.quantity; i++) {        
      this.foods.splice(this.foods.indexOf(item), 1);
    }
  }


  // Method to save food order
  addFoodOrder(form: NgForm) {
    form.value.foods=this.foods;
    form.value.status="Ordered";
    if(this.userRole == "Admin") {
      this.branch.id = form.value.branch;
      form.value.branch = this.branch;
    } else {
      this.branch.id = this.userService.getBranch();
      form.value.branch = this.branch;
    }

    this.orderService.addFoodOrder(form.value).subscribe(
      (res) => {
        this.reloadComponent();
        window.alert("Food order added successfully!");
      },
      (err) => {
        console.log(err);
        window.alert(err.error.message);
      }
    );
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
