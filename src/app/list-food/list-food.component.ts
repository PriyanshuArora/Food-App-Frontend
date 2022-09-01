import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from '../Services/food.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-list-food',
  templateUrl: './list-food.component.html',
  styleUrls: ['./list-food.component.css'],
})
export class ListFoodComponent implements OnInit {
  constructor(
    private foodService: FoodService,
    private userService: UserService,
    private router: Router
  ) {}

  // local variables
  foodList: any;
  checkAdmin = this.userService.isAdmin();
  checkBranchManager = this.userService.isBranchManager();
  userRole = this.userService.getRole();

  ngOnInit(): void {
    this.foodService.getFoodList().subscribe((data) => {
      this.foodList = data;
    });
    if (this.userRole == 'Staff') {
      window.alert('You are not authorised to access this page.');
      this.router.navigate(['']);
    }
  }

  // method to change availability of food
  changeAvailability(id: any) {
    this.foodService.changeAvailability(id).subscribe(
      (res) => {
        window.alert('Food availability changed successfully!');
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
        window.alert(err.message);
      }
    );
  }
}
