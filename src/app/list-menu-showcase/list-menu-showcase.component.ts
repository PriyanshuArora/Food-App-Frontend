import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../Services/menu.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-list-menu-showcase',
  templateUrl: './list-menu-showcase.component.html',
  styleUrls: ['./list-menu-showcase.component.css'],
})
export class ListMenuShowcaseComponent implements OnInit {
  constructor(
    private menuService: MenuService,
    private userService: UserService
  ) {}
  result: any;
  checkAdmin = this.userService.isAdmin();
  checkBranchManager = this.userService.isBranchManager();

  ngOnInit(): void {
    this.menuService.getMenuList().subscribe((data) => {
      this.result = data;
      console.log(this.result.t);
    });
  }
}
