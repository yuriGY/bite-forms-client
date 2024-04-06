import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFormComponentComponent } from './create-form/create-form.component';

const routes: Routes = [
  { path: 'formulario', component: CreateFormComponentComponent }, // Rota para o componente create-form
  { path: '**', redirectTo: '/create-question' } // Redirecionamento para create-question se a rota não for encontrada];
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
