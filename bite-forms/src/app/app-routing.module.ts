import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFormComponent } from './create-form/create-form.component';
import { VotingComponent } from './voting/voting.component';

const routes: Routes = [
  { path: '', component: CreateFormComponent },
  { path: 'voting/:id', component: VotingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
