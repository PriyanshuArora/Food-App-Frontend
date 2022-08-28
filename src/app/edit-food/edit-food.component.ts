import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../Services/branch.service';
import { FoodService } from '../Services/food.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrls: ['./edit-food.component.css']
})
export class EditFoodComponent implements OnInit {

  constructor(private route:ActivatedRoute, private user:UserService, private food:FoodService, private branchService:BranchService, private router:Router) { }
  result:any;
  selectedFood:any;
  branchlist:any;
  branch = { id: '' };
  checkAdmin = this.user.isAdmin();

  ngOnInit(): void {
    if(this.user.getRole() == "Staff") {
      window.alert("You are not authorised to access this page.");
      this.router.navigate(['']);
    }

    let id=this.route.snapshot.params['id'];
    this.food.getFoodList().subscribe((data)=>{
      this.result = data;
      for(let r of this.result.t) {
        if(r.id == id) {
          this.selectedFood = r;
        }
      }
    },(err)=>{
      console.log(err);
      window.alert(err.error.message);
    });
    this.branchService.getBranchList().subscribe((data)=>{
      this.branchlist = data;
    })
  }

  updateFood(form:NgForm) {
    if(this.user.getRole() == "Branch Manager") {
      this.branch.id = this.user.getBranch();
    form.value.branch = this.branch;
    } else {
      this.branch.id = form.value.branch;
      form.value.branch = this.branch;
    }
    
    this.food.editFood(this.selectedFood.id,form.value).subscribe((res)=>{
      console.log(res);
      this.router.navigate(['foodlist']);
    },(err)=>{
      console.log(err);
      window.alert(err.error.message);
    });
  }

}
