import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { AddFoodComponent } from './add-food/add-food.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { AddFoodorderComponent } from './add-foodorder/add-foodorder.component';
import { EditBranchComponent } from './edit-branch/edit-branch.component';
import { ListUserComponent } from './list-user/list-user.component';
import { UserListPipe } from './Pipes/user-list.pipe';
import { ListBranchComponent } from './list-branch/list-branch.component';
import { FoodByIdPipe } from './Pipes/food-by-id.pipe';
import { ListFoodComponent } from './list-food/list-food.component';
import { ListMenuComponent } from './list-menu/list-menu.component';
import { ListFoodorderComponent } from './list-foodorder/list-foodorder.component';
import { EditFoodComponent } from './edit-food/edit-food.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { EditFoodorderComponent } from './edit-foodorder/edit-foodorder.component';
import { FilterByBranchPipe } from './Pipes/filter-by-branch.pipe';
import { ListMenuShowcaseComponent } from './list-menu-showcase/list-menu-showcase.component';
import { HomeComponent } from './home/home.component';
import { OrderPipePipe } from './Pipes/order-pipe.pipe';
import { GenerateBillComponent } from './generate-bill/generate-bill.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    EditUserComponent,
    LoginUserComponent,
    AddBranchComponent,
    AddFoodComponent,
    AddMenuComponent,
    AddFoodorderComponent,
    EditBranchComponent,
    ListUserComponent,
    UserListPipe,
    ListBranchComponent,
    FoodByIdPipe,
    ListFoodComponent,
    ListMenuComponent,
    ListFoodorderComponent,
    EditFoodComponent,
    EditMenuComponent,
    EditFoodorderComponent,
    FilterByBranchPipe,
    ListMenuShowcaseComponent,
    HomeComponent,
    OrderPipePipe,
    GenerateBillComponent
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
