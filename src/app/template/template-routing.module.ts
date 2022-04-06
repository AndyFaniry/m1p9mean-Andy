import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path:'', pathMatch: 'full', redirectTo: 'login' },
  {path:'login',component: LoginComponent},
  {path:'inscription',component:InscriptionComponent},
  {path:'admin',component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
