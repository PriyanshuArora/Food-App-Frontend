import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodService } from '../Services/food.service';
import { MenuService } from '../Services/menu.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {

  constructor(
    private user: UserService,
    private router: Router,
    private menu: MenuService,
    private foodService: FoodService
  ) {}

  // Local Variables
  branch = { id: '' };
  foods:any = [];
  foodItem:any = { id: '' };
  checkBranchManager = this.user.isBranchManager();
  foodlist: any;

  ngOnInit(): void {
    if (this.user.getRole() != 'Branch Manager') {
      window.alert('You are not authorised to access this page.');
      this.router.navigate(['']);
    }
    this.foodService.getFoodList().subscribe((data)=>{
      this.foodlist = data;
    })
  }

  addFood(form: NgForm) {
    if(form.value.id == '') {
      window.alert("Select any food first!");
    }
    else if(this.foods.includes(form.value)) {
      window.alert("Food already added! Select any other food.");
    }
    else {
      this.foods.push(form.value);
      form.resetForm();
    }
  }

  deleteFood(item:any) {
    this.foods.pop(item);
  }


  // Methods
  addMenu(form: NgForm) {
    form.value.foods=this.foods;
    this.branch.id = this.user.getBranch();
    form.value.branch = this.branch;

    this.menu.addMenu(form.value).subscribe(
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

}
