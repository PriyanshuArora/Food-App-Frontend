import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http:HttpClient, private router:Router) { }

  // Saving branch to the server using http post method
  addBranch(branch:any) {
    return this.http.post("http://localhost:8080/savebranch",branch);
  }
  
  getBranchList() {
    return this.http.get("http://localhost:8080/allbranch");
  }
  
  // Deleting user to the server using http delete method
  deleteBranch(id: any) {
    return this.http.delete(`http://localhost:8080/deletebranch/${id}`);
  }

  // Editing user to the server using http put method
  editBranch(id: any, branch: any) {
    return this.http.put(`http://localhost:8080/updatebranch/${id}`, branch);
  }
}
