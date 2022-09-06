import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuService } from '../Services/menu.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.css'],
})
export class ListMenuComponent implements OnInit, OnDestroy {
  constructor(
    private menuService: MenuService,
    private userService: UserService,
    private router: Router
  ) {}

  // local variables
  menuList: any;
  menuId: any;
  checkAdmin = this.userService.isAdmin();
  checkBranchManager = this.userService.isBranchManager();
  userRole = this.userService.getRole();
  Subscription: Subscription | undefined;

  ngOnInit(): void {
    this.Subscription = this.menuService.getMenuList().subscribe((data) => {
      this.menuList = data;
    });
    if (this.userRole == 'Staff') {
      window.alert('You are not authorised to access this page.');
      this.router.navigate(['']);
    }
  }

  deleteMenu(id: any) {
    this.Subscription = this.menuService.deleteMenu(id).subscribe(
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
  
  ngOnDestroy(): void {
    this.Subscription?.unsubscribe();
  }
}
