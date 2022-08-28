import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient, private router:Router) { }

  // Saving menu to the server using http post method
  addMenu(menu:any) {
    return this.http.post("http://localhost:8080/savemenu",menu);
  }

  getMenuList() {
    return this.http.get("http://localhost:8080/allmenu");
  }

  // Deleting menu to the server using http delete method
  deleteMenu(id: any) {
    return this.http.delete(`http://localhost:8080/deletemenu/${id}`);
  }

  // Editing menu to the server using http put method
  editMenu(id: any, menu: any) {
    return this.http.put(`http://localhost:8080/updatemenu/${id}`, menu);
  }
}
