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

@NgModule({
  declarations: [
    LoginComponent,
    InscriptionComponent,
    SpinnerComponent,
    NavbarComponent,
    AdminComponent,
    NotfoundComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    ReactiveFormsModule,
    ApiModule,
   
  ]
})
export class TemplateModule { }
