import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  // Saving food to the server using http post method
  addFood(food: any) {
    return this.http.post('http://localhost:8080/savefood', food);
  }

  // Getting food list from the server using http get method
  getFoodList() {
    return this.http.get('http://localhost:8080/allfood');
  }

  // Change availability of food from the server using http get method
  changeAvailability(id: any) {
    return this.http.get(`http://localhost:8080/foodavailability/${id}`);
  }

  // Updating food from the server using http put method
  editFood(id: any, food: any) {
    return this.http.put(`http://localhost:8080/updatefood/${id}`, food);
  }
}
