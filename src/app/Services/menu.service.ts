import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient) { }

  // Saving menu to the server using http post method
  addMenu(menu:any) {
    return this.http.post("http://localhost:8080/savemenu",menu);
  }

  // Getting menu list from the server using http get method
  getMenuList() {
    return this.http.get("http://localhost:8080/allmenu");
  }

  // Deleting menu from the server using http delete method
  deleteMenu(id: any) {
    return this.http.delete(`http://localhost:8080/deletemenu/${id}`);
  }

  // Updating menu from the server using http put method
  editMenu(id: any, menu: any) {
    return this.http.put(`http://localhost:8080/updatemenu/${id}`, menu);
  }
}
