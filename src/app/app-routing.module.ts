import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Toutes les routes de votre application doivent dériver de app
const routes: Routes = [
  {
    path: 'app',
    loadChildren: async () => (await import('./template/template.module')).TemplateModule
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
