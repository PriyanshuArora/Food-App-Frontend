import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BranchService } from '../Services/branch.service';
import { FoodService } from '../Services/food.service';
import { MenuService } from '../Services/menu.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit, OnDestroy {

  constructor(
    private userService: UserService,
    private menu: MenuService,
    private foodService: FoodService,
    private branchService: BranchService,
    private router: Router
  ) {}

  // Local Variables
  branch = { id: '' };
  foods:any = [];
  foodlist: any;
  branchlist:any;
  checkBranchManager = this.userService.isBranchManager();
  checkAdmin = this.userService.isAdmin();
  userRole = this.userService.getRole();
  Subscription: Subscription | undefined;

  ngOnInit(): void {
    if (this.userRole == 'Staff') {
      window.alert('You are not authorised to access this page.');
      this.router.navigate(['']);
    }
    this.Subscription = this.foodService.getFoodList().subscribe((data)=>{
      this.foodlist = data;
    })
    this.Subscription = this.branchService.getBranchList().subscribe((data)=>{
      this.branchlist = data;
    })
  }

  // Method to add foods in menu
  addFood(form: NgForm) {
    if(form.value.id == '') {
      window.alert("Select any food first!");
    }
    else if(this.foods.some((item: { id: any; }) => item.id == form.value.id)) {
      window.alert("Food already added! Select any other food.");
    }
    else {
      this.foods.push(form.value);
      form.resetForm();
    }
  }

  // Method to delete foods from menu
  deleteFood(item:any) {
    this.foods.splice(this.foods.indexOf(item), 1);
  }

  // Method to Save menu
  addMenu(form: NgForm) {
    form.value.foods=this.foods;
    if(this.userRole == "Branch Manager") {
      this.branch.id = this.userService.getBranch();
      form.value.branch = this.branch;
    } else {
      this.branch.id = form.value.branch;
      form.value.branch = this.branch;
    }

    this.Subscription = this.menu.addMenu(form.value).subscribe(
      (res) => {
        this.reloadComponent();
        window.alert("Menu added successfully!");
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

  ngOnDestroy(): void {
    this.Subscription?.unsubscribe();
  }
}
