import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFormComponent } from './create-form/create-form.component';
import { VotingComponent } from './voting/voting.component';

const routes: Routes = [
  {  // Rota para o componente create-form
    path: 'form', component: CreateFormComponent, children: [
      { path: 'voting/:id', component: VotingComponent }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
