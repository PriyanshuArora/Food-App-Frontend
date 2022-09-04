import { Component, OnInit } from '@angular/core';
import { FoodorderService } from '../Services/foodorder.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-list-foodorder',
  templateUrl: './list-foodorder.component.html',
  styleUrls: ['./list-foodorder.component.css'],
})
export class ListFoodorderComponent implements OnInit {
  constructor(
    private orderService: FoodorderService,
    private userService: UserService
  ) {}

  // local variables
  orderList: any;
  orderId: any;
  checkAdmin = this.userService.isAdmin();
  checkBranchManager = this.userService.isBranchManager();

  ngOnInit(): void {
    this.orderService.getFoodOrderList().subscribe((data) => {
      this.orderList = data;
    });
  }

  // method to delete food orders
  deleteFoodOrder(id: any) {
    this.orderService.deleteFoodOrder(id).subscribe(
      (res) => {
        window.alert('Food Order deleted successfully!');
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
        window.alert(err.message);
      }
    );
  }
}
