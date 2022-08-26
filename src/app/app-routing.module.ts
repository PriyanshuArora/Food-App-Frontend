import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { AddFoodComponent } from './add-food/add-food.component';
import { AddFoodorderComponent } from './add-foodorder/add-foodorder.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { AddUserComponent } from './add-user/add-user.component'; 
import { BranchListComponent } from './branch-list/branch-list.component';
import { BranchManagerListComponent } from './branch-manager-list/branch-manager-list.component';
import { EditBranchComponent } from './edit-branch/edit-branch.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { ManagerListComponent } from './manager-list/manager-list.component';

const routes: Routes = [
  {path:"adduser", component:AddUserComponent},
  {path:"addbranch",component:AddBranchComponent},
  {path:"addfood",component:AddFoodComponent},
  {path:"addmenu",component:AddMenuComponent},
  {path:"addorder",component:AddFoodorderComponent},

  {path:"edituser",component:EditUserComponent},
  {path:"editbranch",component:EditBranchComponent},

  {path:"loginuser",component:LoginUserComponent},

  {path:"managerlist",component:ManagerListComponent},
  {path:"branchlist",component:BranchListComponent}, 
  {path:"branchmanagerlist",component:BranchManagerListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
