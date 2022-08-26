import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { BranchListComponent } from './branch-list/branch-list.component';
import { AddFoodComponent } from './add-food/add-food.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { AddFoodorderComponent } from './add-foodorder/add-foodorder.component';
import { BranchManagerListComponent } from './branch-manager-list/branch-manager-list.component';
import { EditBranchComponent } from './edit-branch/edit-branch.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    EditUserComponent,
    LoginUserComponent,
    ManagerListComponent,
    AddBranchComponent,
    BranchListComponent,
    AddFoodComponent,
    AddMenuComponent,
    AddFoodorderComponent,
    BranchManagerListComponent,
    EditBranchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
