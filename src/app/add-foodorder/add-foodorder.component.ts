import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchService } from '../Services/branch.service';
import { FoodService } from '../Services/food.service';
import { FoodorderService } from '../Services/foodorder.service';
import { MenuService } from '../Services/menu.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-add-foodorder',
  templateUrl: './add-foodorder.component.html',
  styleUrls: ['./add-foodorder.component.css']
})
export class AddFoodorderComponent implements OnInit {

  constructor(
    private user: UserService,
    private router: Router,
    private foodService: FoodService,
    private order: FoodorderService,
    private branchService: BranchService
  ) {}

  // Local Variables
  branch = { id: '' };
  food = { id: '' };
  temp:any = [];
  foods:any = [];
  foodsTemp:any = [];
  foodItem:any = { id: '' };
  checkBranchManager = this.user.isBranchManager();
  checkAdmin = this.user.isAdmin();
  foodlist: any;
  branchlist:any;

  ngOnInit(): void {
    this.foodService.getFoodList().subscribe((data)=>{
      this.foodlist = data;
    })
    this.branchService.getBranchList().subscribe((data)=>{
      this.branchlist = data;
    })
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
        this.temp.push(form.value);
        for(let i = 0; i < form.value.quantity; i++) {        
          this.foods.push(form.value);
        }
        form.resetForm();
      }
    }
  }

  deleteFood(item:any) {
    this.temp.pop(item);
    for(let i = 0; i < item.quantity; i++) {        
      this.foods.pop(item);
    }
    console.log(this.temp);
    console.log(this.foods);
  }


  // Methods
  addFoodOrder(form: NgForm) {
    form.value.foods=this.foods;
    form.value.status="Ordered";
    if(this.user.getRole() == "Admin") {
      this.branch.id = form.value.branch;
      form.value.branch = this.branch;
    } else {
      this.branch.id = this.user.getBranch();
      form.value.branch = this.branch;
    }

    this.order.addFoodOrder(form.value).subscribe(
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
