import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAnswers } from '../shared/interfaces/answers.interface';
import { IFormData } from '../shared/interfaces/form-data.interface';

@Component({
  selector: 'app-voting-page',
  templateUrl: './voting-page.component.html',
  styleUrls: ['./voting-page.component.scss']
})
export class VotingPageComponent implements OnInit {
  @Input() formData: IFormData;

  id: string;
  selectedAnswer: string;
  title: string;

  hasCopiedUrl = false;
  hasVoted = false;
  isResultVisible = false;
  isAnswerSelected = false;
  isResultTimedout = false;

  localStorageKey = 'USER_VOTED';

  answers: IAnswers[] = [{
    text: 'abacaxi',
    votes: 5,
    isSelected: false
  },
  {
    text: 'limão',
    votes: 11,
    isSelected: false
  }];

  constructor(
    private activatedRoute: ActivatedRoute,
    private clipboard: Clipboard,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.id = params['id']; // ao abrir a página, a variável id recebe o id da url (que foi gerado ao criar o formulário)
        this.getData();
      }
    });

    const localStorageData = localStorage.getItem(this.localStorageKey);
    if (localStorageData) {
      const userData = JSON.parse(localStorageData);
      if (userData.id === this.id && userData.hasVoted) {
        this.hasVoted = true;
      }
    }
  }

  save() {
    //salvar o voto do usuário no firestore aqui, voto do usuário se encontra na var selectedAnswer
    //quando for exibir os resultados, lembre-se de atualizar os dados (adicionar +1 ao resultado do voto da requisição que foi feita ao abrir o componente ou salvar voto -> realizar a requisição de novo e exibir)
    this.showResults();
    this.saveToLocalStorage();
  }

  saveToLocalStorage(): void {
    const userData = { id: this.id, hasVoted: this.hasVoted };
    localStorage.setItem(this.localStorageKey, JSON.stringify(userData));
  }

  getData() {
    // receber os dados do firestore aqui
    this.title = 'qual a sua fruta favorita ?';/* receba o título */
  }

  selectAnswer(answer: IAnswers) {
    this.selectedAnswer = answer.text;
    this.isAnswerSelected = true;

    this.answers.forEach((a) => {
      a.isSelected = false;
    });

    answer.isSelected = true;
  }

  showResults() {
    this.isResultVisible = true;
    this.isResultTimedout = true;

    setTimeout(() => {
      this.isResultTimedout = false;
    }, 5000);
  }

  copyURL() {
    const url = window.location.href;
    this.clipboard.copy(url);
    this.hasCopiedUrl = true;

    setTimeout(() => {
      this.hasCopiedUrl = false;
    }, 2000);
  }

  redirectToMainPage() {
    this.router.navigateByUrl(`/`);
  }
}
