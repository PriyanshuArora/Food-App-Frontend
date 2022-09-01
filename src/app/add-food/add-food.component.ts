import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchService } from '../Services/branch.service';
import { FoodService } from '../Services/food.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css'],
})
export class AddFoodComponent implements OnInit {
  constructor(
    private userService: UserService,
    private foodService: FoodService,
    private branchService:BranchService,
    private router: Router
  ) {}

  // Local Variables
  branch = { id: '' };
  branchlist:any;
  checkBranchManager = this.userService.isBranchManager();
  checkAdmin = this.userService.isAdmin();
  userRole = this.userService.getRole();

  ngOnInit(): void {
    if (this.userRole == 'Staff') {
      window.alert('You are not authorised to access this page.');
      this.router.navigate(['']);
    }
    this.branchService.getBranchList().subscribe((data)=>{
      this.branchlist = data;
    })
  }

  // Method to save food
  addFood(form: NgForm) {
    if(this.userRole == "Branch Manager") {
      this.branch.id = this.userService.getBranch();
      form.value.branch = this.branch;
    } else {
      this.branch.id = form.value.branch;
      form.value.branch = this.branch;
    }

    this.foodService.addFood(form.value).subscribe(
      (res) => {
        this.reloadComponent();
        window.alert("Food added successfully!");
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
