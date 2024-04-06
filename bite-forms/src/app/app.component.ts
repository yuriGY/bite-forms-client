import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  novaPergunta: string = '';
  alternativas: string[] = [''];
  maxAlternativas: number = 10;

  constructor(private router: Router) {}

  criarPergunta() {
    if (this.novaPergunta.trim() !== '' && this.alternativas.every(alternativa => alternativa.trim() !== '')) {
      this.router.navigate(['/formulario']);
    } else {
      console.log('Por favor, preencha a pergunta e todas as alternativas.');
    }
  }

  adicionarAlternativa() {
    if (this.alternativas.length < this.maxAlternativas) {
      this.alternativas.push('');
    } else {
      console.log('Limite máximo de alternativas atingido.');
    }
  }
}
