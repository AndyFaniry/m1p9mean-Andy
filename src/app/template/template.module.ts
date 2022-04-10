import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateRoutingModule } from './template-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiModule } from '../api/api.module';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { SpinnerComponent } from './pages/spinner/spinner.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { FooterComponent } from './pages/footer/footer.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { RestaurantContentComponent } from './pages/restaurant-content/restaurant-content.component';
import { LivreurContentComponent } from './pages/livreur-content/livreur-content.component';
import { PlatContentComponent } from './pages/plat-content/plat-content.component';
import { CommandeContentComponent } from './pages/commande-content/commande-content.component';
import { ClientComponent } from './pages/client/client.component';

@NgModule({
  declarations: [
    LoginComponent,
    InscriptionComponent,
    SpinnerComponent,
    NavbarComponent,
    AdminComponent,
    NotfoundComponent,
    FooterComponent,
    SidebarComponent,
    RestaurantComponent,
    RestaurantContentComponent,
    LivreurContentComponent,
    PlatContentComponent,
    CommandeContentComponent,
    ClientComponent,
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    ReactiveFormsModule,
    ApiModule,
   
  ]
})
export class TemplateModule { }
