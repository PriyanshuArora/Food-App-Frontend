import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../Services/branch.service';
import { FoodService } from '../Services/food.service';
import { MenuService } from '../Services/menu.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {

  constructor(
    private userService: UserService,
    private menuService: MenuService,
    private foodService: FoodService,
    private branchService: BranchService,
    private route:ActivatedRoute,
    private router: Router
  ) {}

  // Local Variables
  menuList:any;
  selectedMenu:any;
  branch = { id: '' };
  foodlist: any;
  branchlist:any;
  checkBranchManager = this.userService.isBranchManager();
  checkAdmin = this.userService.isAdmin();
  userRole = this.userService.getRole();
  branchId = this.userService.getBranch();

  ngOnInit(): void {
    if (this.userRole == 'Staff') {
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
    this.menuService.getMenuList().subscribe((data)=>{
      this.menuList = data;
      for(let r of this.menuList.t) {
        if(r.id == id) {
          this.selectedMenu = r;
        }
      }
    },(err)=>{
      console.log(err);
      window.alert(err.error.message);
    });
  }

  // Method to add foods in menu
  addFood(form: NgForm) {
    if(form.value.id == '') {
      window.alert("Select any food first!");
    }
    else if(this.selectedMenu.foods.some((item: { id: any; }) => item.id == form.value.id)) {
      window.alert("Food already added! Select any other food.");
    }
    else {
      this.selectedMenu.foods.push(form.value);
      form.resetForm();
    }
  }

  // Method to delete foods from order
  deleteFood(item:any) {
    this.selectedMenu.foods.splice(this.selectedMenu.foods.indexOf(item), 1);
  }

  // Method to update menu
  updateMenu(form: NgForm) {
    form.value.foods=this.selectedMenu.foods;
    if(this.userRole == "Branch Manager") {
      this.branch.id = this.branchId;
      form.value.branch = this.branch;
    } else {
      this.branch.id = form.value.branch;
      form.value.branch = this.branch;
    }

    this.menuService.editMenu(this.selectedMenu.id,form.value).subscribe((res)=>{
      console.log(res);
      window.alert("Menu updated successfully!");
      this.router.navigate(['menulist']);
    },(err)=>{
      console.log(err);
      window.alert(err.error.message);
    });
  }
}
