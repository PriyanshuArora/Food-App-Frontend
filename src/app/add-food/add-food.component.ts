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
    private user: UserService,
    private router: Router,
    private food: FoodService,
    private branchService:BranchService
  ) {}

  // Local Variables
  branch = { id: '' };
  branchlist:any;
  checkBranchManager = this.user.isBranchManager();
  checkAdmin = this.user.isAdmin();

  ngOnInit(): void {
    if (this.user.getRole() == 'Staff') {
      window.alert('You are not authorised to access this page.');
      this.router.navigate(['']);
    }
    this.branchService.getBranchList().subscribe((data)=>{
      this.branchlist = data;
    })
  }

  // Methods
  addFood(form: NgForm) {
    if(this.user.getRole() == "Branch Manager") {
      this.branch.id = this.user.getBranch();
    form.value.branch = this.branch;
    } else {
      this.branch.id = form.value.branch;
      form.value.branch = this.branch;
    }

    this.food.addFood(form.value).subscribe(
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
