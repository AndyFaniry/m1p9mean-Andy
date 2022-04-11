import { NgModule} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DatePipe } from '@angular/common';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    KanbanModule,
    AppRoutingModule,
    SweetAlert2Module.forChild()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
