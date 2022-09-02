import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodorderService } from '../Services/foodorder.service';

@Component({
  selector: 'app-generate-bill',
  templateUrl: './generate-bill.component.html',
  styleUrls: ['./generate-bill.component.css']
})
export class GenerateBillComponent implements OnInit {

  constructor(
    private orderService: FoodorderService,
    private route:ActivatedRoute
  ) { }

  // local variables
  foodOrder: any;
  foodOrderDetails: any;
  foodOrderBranch: any;
  foodOrderFoods: any;
  cgst: any;
  sgst: any;

  ngOnInit(): void {
    let id=this.route.snapshot.params['id'];
    this.orderService.getFoodOrderById(id).subscribe((data) => {
      this.foodOrder = data;
      this.foodOrderDetails = this.foodOrder.t;
      this.foodOrderBranch = this.foodOrder.t.branch;
      this.foodOrderFoods = this.foodOrder.t.foods;
      this.cgst = this.foodOrderDetails.price*0.025;
      this.sgst = this.foodOrderDetails.price*0.025;
    });
  }
}
