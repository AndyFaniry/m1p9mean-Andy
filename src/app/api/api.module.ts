import { CommandeService } from './services/commande/commande.service';
import { PlatService } from './services/plat/plat.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user/user.service';
import { HttpClientModule } from '@angular/common/http'
import { RestaurantService } from './services/restaurant/restaurant.service';
import { AlertService } from './services/alert/alert.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [UserService,RestaurantService,AlertService,PlatService,CommandeService],
  exports: []
})
export class ApiModule { }
