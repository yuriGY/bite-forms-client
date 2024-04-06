import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent {
  novaPergunta: string = '';

  constructor(private router: Router) {}

  criarPergunta() {
    // Verifica se a pergunta não está vazia
    if (this.novaPergunta.trim() !== '') {
      // Navega para a tela create-form
      this.router.navigate(['/formulario']);
    } else {
      // Se a pergunta estiver vazia, pode exibir uma mensagem de erro ou lidar de outra forma
      console.log('Por favor, insira uma pergunta.');
    }
  }
}
