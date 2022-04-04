import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindAllComponent } from './home/pages/find-all/find-all.component';

// Toutes les routes de votre application doivent dériver de app
const routes: Routes = [
  {
    path: 'app',
    loadChildren: async () => (await import('./home/home.module')).HomeModule
  },
  { path:'find', component:FindAllComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
