import { ClientComponent } from './pages/client/client.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { LoginComponent } from './pages/login/login.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';

const routes: Routes = [
  { path:'', pathMatch: 'full', redirectTo: 'login' },
  {path:'login',component: LoginComponent},
  {path:'inscription',component:InscriptionComponent},
  {path:'admin',component:AdminComponent},
  {path:'admin/:type',component:AdminComponent},
  {path:'restaurant',component:RestaurantComponent},
  {path:'restaurant/:type',component:RestaurantComponent},
  {path:'client',component:ClientComponent},
  {path:'client/:type',component:ClientComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
