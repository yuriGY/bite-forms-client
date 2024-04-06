import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFormComponentComponent } from './create-form/create-form.component';
import { CreateQuestionComponent } from './create-question/create-question.component';

const routes: Routes = [
  { path: 'formulario', component: CreateFormComponentComponent }, // Rota para o componente create-form
  { path: 'create-question', component: CreateQuestionComponent }, // Rota para o componente create-question
  { path: '', component: CreateQuestionComponent }, // Rota raiz definida explicitamente para create-question
  { path: '**', redirectTo: '/create-question' } // Redirecionamento para create-question se a rota não for encontrada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
