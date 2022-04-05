import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateRoutingModule } from './template-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiModule } from '../api/api.module';
import { InscriptionComponent } from './pages/inscription/inscription.component';


@NgModule({
  declarations: [
    LoginComponent,
    InscriptionComponent,
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    ReactiveFormsModule,
    ApiModule
  ]
})
export class TemplateModule { }
