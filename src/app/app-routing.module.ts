import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { AddFoodComponent } from './add-food/add-food.component';
import { AddFoodorderComponent } from './add-foodorder/add-foodorder.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditBranchComponent } from './edit-branch/edit-branch.component';
import { EditFoodComponent } from './edit-food/edit-food.component';
import { EditFoodorderComponent } from './edit-foodorder/edit-foodorder.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { GenerateBillComponent } from './generate-bill/generate-bill.component';
import { AuthGuardGuard } from './Guards/auth-guard.guard';
import { HomeComponent } from './home/home.component';
import { ListBranchComponent } from './list-branch/list-branch.component';
import { ListFoodComponent } from './list-food/list-food.component';
import { ListFoodorderComponent } from './list-foodorder/list-foodorder.component';
import { ListMenuShowcaseComponent } from './list-menu-showcase/list-menu-showcase.component';
import { ListMenuComponent } from './list-menu/list-menu.component';
import { ListUserComponent } from './list-user/list-user.component';
import { LoginUserComponent } from './login-user/login-user.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"loginuser",component:LoginUserComponent},

  {path:"adduser", component:AddUserComponent,canActivate:[AuthGuardGuard]},
  {path:"addbranch",component:AddBranchComponent,canActivate:[AuthGuardGuard]},
  {path:"addfood",component:AddFoodComponent,canActivate:[AuthGuardGuard]},
  {path:"addmenu",component:AddMenuComponent,canActivate:[AuthGuardGuard]},
  {path:"addorder",component:AddFoodorderComponent,canActivate:[AuthGuardGuard]},

  {path:"edituser/:id",component:EditUserComponent,canActivate:[AuthGuardGuard]},
  {path:"editbranch/:id",component:EditBranchComponent,canActivate:[AuthGuardGuard]},
  {path:"editfood/:id",component:EditFoodComponent,canActivate:[AuthGuardGuard]},
  {path:"editmenu/:id",component:EditMenuComponent,canActivate:[AuthGuardGuard]},
  {path:"editorder/:id",component:EditFoodorderComponent,canActivate:[AuthGuardGuard]},
  
  {path:"bill/:id",component:GenerateBillComponent,canActivate:[AuthGuardGuard]},

  {path:"userlist",component:ListUserComponent,canActivate:[AuthGuardGuard]},
  {path:"branchlist",component:ListBranchComponent,canActivate:[AuthGuardGuard]}, 
  {path:"foodlist",component:ListFoodComponent,canActivate:[AuthGuardGuard]},
  {path:"menulist",component:ListMenuComponent,canActivate:[AuthGuardGuard]},
  {path:"menu",component:ListMenuShowcaseComponent,canActivate:[AuthGuardGuard]},
  {path:"orderlist",component:ListFoodorderComponent,canActivate:[AuthGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
