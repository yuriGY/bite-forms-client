import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFormComponent } from './create-form/create-form.component';
import { VotingPageComponent } from './voting-page/voting-page.component';

const routes: Routes = [
  { path: '', component: CreateFormComponent },
  { path: 'voting/:id', component: VotingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
