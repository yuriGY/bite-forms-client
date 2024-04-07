import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importação do FormsModule
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { VotingPageComponent } from './voting-page/voting-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateFormComponent,
    VotingPageComponent
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
