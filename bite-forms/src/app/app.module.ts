import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importação do FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateFormComponentComponent } from './create-form/create-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateFormComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
