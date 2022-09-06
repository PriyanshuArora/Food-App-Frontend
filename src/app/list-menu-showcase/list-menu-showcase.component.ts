import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuService } from '../Services/menu.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-list-menu-showcase',
  templateUrl: './list-menu-showcase.component.html',
  styleUrls: ['./list-menu-showcase.component.css'],
})
export class ListMenuShowcaseComponent implements OnInit, OnDestroy {
  constructor(
    private menuService: MenuService,
    private userService: UserService
  ) {}
  result: any;
  checkAdmin = this.userService.isAdmin();
  checkBranchManager = this.userService.isBranchManager();
  Subscription: Subscription | undefined;

  ngOnInit(): void {
    this.Subscription = this.menuService.getMenuList().subscribe((data) => {
      this.result = data;
    });
  }

  ngOnDestroy(): void {
    this.Subscription?.unsubscribe();
  }
}
