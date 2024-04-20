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
  hasCopiedUrl = false;
  isResultVisible = false;
  isVoteSelected = false;
  isResultTimedout = false;

  title = 'qual a sua fruta favorita?';
  answers: IAnswers[] = [{
    text: 'abacaxi',
    votes: 5
  },
  {
    text: 'limão',
    votes: 11
  }];

  constructor(
    private activatedRoute: ActivatedRoute,
    private clipboard: Clipboard,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.id = params['id'];

        this.getData();
      }
    });
  }

  save() {
    // this.firestore.save(this.answers);
    this.showResults();
  }

  getData() {
    // this.firestore.subscribe((data: IAnswers[]) => {
    //   this.answers = data; // Atribua os dados recebidos ao array
    // });
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
}
