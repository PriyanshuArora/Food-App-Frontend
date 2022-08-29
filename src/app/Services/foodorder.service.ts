import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FoodorderService {

  constructor(private http:HttpClient, private router:Router) { }

  // Saving food order to the server using http post method
  addFoodOrder(order:any) {
    return this.http.post("http://localhost:8080/savefoodorder",order);
  }

  getFoodOrderList() {
    return this.http.get("http://localhost:8080/allfoodorder");
  }

  // Deleting food order to the server using http delete method
  deleteFoodOrder(id: any) {
    return this.http.delete(`http://localhost:8080/deletefoodorder/${id}`);
  }

  // Editing food order to the server using http put method
  editFoodOrder(id: any, order: any) {
    return this.http.put(`http://localhost:8080/updatefoodorder/${id}`, order);
  }
}
