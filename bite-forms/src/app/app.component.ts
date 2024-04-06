import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input() formData: any;

  novaPergunta: string = '';
  alternativas: string[] = [''];
  maxAlternativas: number = 10;

  constructor(private router: Router) { }

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

  generateRandomId(): string {
    const length = 8;
    const NUMBERS = "0123456789";
    const LOWERCASE_LETTERS = "abcdefghijklmnopqrstuvxwyz";
    const UPPERCASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVXWYZ";

    const characters = NUMBERS + LOWERCASE_LETTERS + UPPERCASE_LETTERS;
    let randomId = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }
    return randomId;
  }
}
