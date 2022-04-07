import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user/user.service';
import { HttpClientModule } from '@angular/common/http'
import { RestaurantService } from './services/restaurant/restaurant.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [UserService,RestaurantService],
  exports: []
})
export class ApiModule { }
