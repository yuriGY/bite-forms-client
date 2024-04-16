import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  isResultVisible = false;
  title = 'Variável para receber título da api?';
  answers: IAnswers[] = [{
    text: 'Sim',
    votes: 0
  },
  {
    text: 'Não',
    votes: 0
  }];

  constructor(
    private activatedRoute: ActivatedRoute,
    private clipboard: Clipboard,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.id = params['id'];

        // this.firestore.subscribe((data: IAnswers[]) => {
        //   this.answers = data; // Atribua os dados recebidos ao array
        // });
      }
    });
  }

  showResults() {
    this.isResultVisible = true;
  }

  copyURL() {
    const url = window.location.href;
    this.clipboard.copy(url);
  }
}
