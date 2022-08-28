import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient, private router:Router) { }

  // Saving food to the server using http post method
  addFood(food:any) {
    return this.http.post("http://localhost:8080/savefood",food);
  }

  getFoodList() {
    return this.http.get("http://localhost:8080/allfood");
  }

  // Deleting food to the server using http delete method
  deleteFood(id: any) {
    return this.http.delete(`http://localhost:8080/deletefood/${id}`);
  }

  // Editing food to the server using http put method
  editFood(id: any, food: any) {
    return this.http.put(`http://localhost:8080/updatefood/${id}`, food);
  }
}
