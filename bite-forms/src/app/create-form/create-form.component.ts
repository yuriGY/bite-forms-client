import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IFormData } from '../shared/interfaces/form-data.interface';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent {
  formData: IFormData;
  id: string;
  formDisabled: boolean = false;

  title: string = '';
  answers: string[] = [''];
  maxAnswers: number = 10;
  answersModel: string[] = [];

  constructor(
    private router: Router
  ) {
    this.answersModel = Array(this.maxAnswers).fill('');
  }

  createTitle() {
    if (this.title.trim() !== '') {
      // Verifica se todas as alternativas foram preenchidas
      const allAnswersFilled = this.answersModel.slice(0, this.answers.length).every(answer => answer.trim() !== '');
  
      if (allAnswersFilled) {
        // Verifica se todas as alternativas são únicas
        const allAnswersUnique = this.answersModel.slice(0, this.answers.length).every((answer, index) => this.answersModel.indexOf(answer) === index);
  
        if (allAnswersUnique) {
          this.generateRandomId(); // Gerar ID antes de navegar
          this.formData = {
            id: this.id,
            title: this.title,
            answers: this.answers
          };
          this.router.navigateByUrl(`voting/${this.id}`);
          this.formDisabled = true; // Desabilita o formulário
        } else {
          console.log('Por favor, preencha alternativas únicas, parece que tem alternativas com os mesmos valores.');
          alert('Por favor, preencha alternativas únicas, parece que tem alternativas com os mesmos valores.');
        }
      } else {
        console.log('Por favor, preencha todas as alternativas.');
        alert('Por favor, preencha todas as alternativas.');
      }
    } else {
      console.log('Por favor, preencha a pergunta e pelo menos uma alternativa.');
      alert('Por favor, preencha a pergunta e pelo menos uma alternativa.');
    }
  }
  
  
  
  addAnswer() {
    if (this.answers.length < this.maxAnswers) {
      this.answers.push('');
    } else {
      console.log('Limite máximo de alternativas atingido.');
    }
  }

  removeAnswer(index: number) {
    if (this.answers.length > 1) {
      this.answers.splice(index, 1);
      this.answersModel.splice(index, 1);
    }
  }

  generateRandomId() {
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
    this.id = randomId;
  }
}
