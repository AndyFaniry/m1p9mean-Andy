import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './template/pages/notfound/notfound.component';


// Toutes les routes de votre application doivent dériver de app
const routes: Routes = [
  {
    path: 'app',
    loadChildren: async () => (await import('./template/template.module')).TemplateModule
  },
  {
    path: '**', component:NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
