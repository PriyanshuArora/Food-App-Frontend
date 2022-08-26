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
  
}
