import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BranchService } from '../Services/branch.service';
import { FoodService } from '../Services/food.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrls: ['./edit-food.component.css'],
})
export class EditFoodComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private foodService: FoodService,
    private branchService: BranchService,
    private router: Router
  ) {}

  // local variables
  foodList: any;
  selectedFood: any;
  branchlist: any;
  branch = { id: '' };
  checkAdmin = this.userService.isAdmin();
  userRole = this.userService.getRole();
  branchId = this.userService.getBranch();
  Subscription: Subscription | undefined;

  ngOnInit(): void {
    if (this.userRole == 'Staff') {
      window.alert('You are not authorised to access this page.');
      this.router.navigate(['']);
    }

    let id = this.route.snapshot.params['id'];
    this.Subscription = this.foodService.getFoodList().subscribe(
      (data) => {
        this.foodList = data;
        for (let r of this.foodList.t) {
          if (r.id == id) {
            this.selectedFood = r;
          }
        }
      },
      (err) => {
        console.log(err);
        window.alert(err.error.message);
      }
    );
    this.Subscription = this.branchService.getBranchList().subscribe((data) => {
      this.branchlist = data;
    });
  }

  // Method to update food
  updateFood(form: NgForm) {
    if (this.userRole == 'Branch Manager') {
      this.branch.id = this.branchId;
      form.value.branch = this.branch;
    } else {
      this.branch.id = form.value.branch;
      form.value.branch = this.branch;
    }

    this.Subscription = this.foodService.editFood(this.selectedFood.id, form.value).subscribe(
      (res) => {
        window.alert("Food updated successfully!");
        this.router.navigate(['foodlist']);
      },
      (err) => {
        console.log(err);
        window.alert(err.error.message);
      }
    );
  }

  ngOnDestroy(): void {
    this.Subscription?.unsubscribe();
  }
}
