import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from '../Services/food.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-list-food',
  templateUrl: './list-food.component.html',
  styleUrls: ['./list-food.component.css']
})
export class ListFoodComponent implements OnInit {

  constructor(private food:FoodService, private user:UserService, private router:Router) { }
  result:any;
  checkAdmin = this.user.isAdmin();
  checkBranchManager = this.user.isBranchManager();

  ngOnInit(): void {
    this.food.getFoodList().subscribe((data)=>{
      this.result = data;
    })
    if(this.user.getRole() == "Staff") {
      window.alert("You are not authorised to access this page.");
      this.router.navigate(['']);
    }
  }

  deleteFood(id:any) {
    this.food.deleteFood(id).subscribe((res)=>{
      window.alert("Food deleted successfully!");
      this.ngOnInit();
    },(err)=>{
      console.log(err);
      window.alert(err.message);
    });
  }

}
