import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../Services/menu.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.css'],
})
export class ListMenuComponent implements OnInit {
  constructor(
    private menuService: MenuService,
    private userService: UserService,
    private router: Router
  ) {}

  // local variables
  menuList: any;
  checkAdmin = this.userService.isAdmin();
  checkBranchManager = this.userService.isBranchManager();
  userRole = this.userService.getRole();

  ngOnInit(): void {
    this.menuService.getMenuList().subscribe((data) => {
      this.menuList = data;
    });
    if (this.userRole == 'Staff') {
      window.alert('You are not authorised to access this page.');
      this.router.navigate(['']);
    }
  }

  deleteMenu(id: any) {
    this.menuService.deleteMenu(id).subscribe(
      (res) => {
        window.alert('Menu deleted successfully!');
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
        window.alert(err.message);
      }
    );
  }
}
