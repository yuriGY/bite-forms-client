import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { initializeApp } from "firebase/app";
import { collection, doc, getDocs, getFirestore, onSnapshot } from "firebase/firestore";
import { IAnswers } from '../shared/interfaces/answers.interface';
import { IFormData } from '../shared/interfaces/form-data.interface';

@Component({
  selector: 'app-voting-page',
  templateUrl: './voting-page.component.html',
  styleUrls: ['./voting-page.component.scss']
})
export class VotingPageComponent implements OnInit {
  // Your web app's Firebase configuration
  firebaseConfig = {
    apiKey: "AIzaSyBsRtNUhJa0tCp11DSEj091k2h-lZseDqk",
    authDomain: "bite-forms-43e4e.firebaseapp.com",
    databaseURL: "https://bite-forms-43e4e-default-rtdb.firebaseio.com",
    projectId: "bite-forms-43e4e",
    storageBucket: "bite-forms-43e4e.appspot.com",
    messagingSenderId: "979829682593",
    appId: "1:979829682593:web:0750f0b17466f6486d5be0"
  };

  // Initialize Firebase
  app = initializeApp(this.firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  db = getFirestore(this.app);

  @Input() formData: IFormData;

  id: string;
  selectedAnswer: string;
  title: string;

  hasCopiedUrl = false;
  hasVoted = false;
  isResultVisible = false;
  isAnswerSelected = false;
  isResultTimedout = false;

  localStorageKey = 'USER_DATA';

  answers: IAnswers[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private clipboard: Clipboard,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.id = params['id'];

        this.getData();
      }
    });

    this.getLocalStorageData();
  }

  getLocalStorageData() {
    debugger
    const localStorageData = localStorage.getItem(this.localStorageKey);
    if (localStorageData) {
      const userData = JSON.parse(localStorageData);
      if (userData.id === this.id && userData.hasVoted) {
        this.hasVoted = true;
      }
    }
  }

  saveVote() {
    this.showResults();
    this.saveToLocalStorage();
  }

  saveToLocalStorage(): void {
    if (!this.hasVoted) {
      const userData = { id: this.id, hasVoted: this.hasVoted };
      localStorage.setItem(this.localStorageKey, JSON.stringify(userData));
      this.hasVoted = true;
    }
  }

  async getData() {
    let idAnswersFirebase: string = '';

    const questionDocRef = doc(this.db, 'forms', `${this.id}`);
    const answersColectionRef = collection(this.db, 'forms', `${this.id}`, 'answers');

    onSnapshot(questionDocRef, (doc) => {
      this.changeTitle(doc.data());
    });

    let answersData = await getDocs(answersColectionRef);
    answersData.forEach((doc) => {
      for (let i = 0; i < doc.data()['options'].length; i++) {
        this.answers.push({
          text: doc.data()['options'][i],
          votes: doc.data()['votes'][i],
        });
      }
      idAnswersFirebase = doc.id;
    });

    try {
      onSnapshot(doc(this.db, 'forms', `${this.id}`, 'answers', `${idAnswersFirebase}`), (doc) => {
        this.updateVotes(doc.data())
      });
    } catch (e) {
      console.error("Error aqui adding document: ", e);
    }
  }

  updateVotes(data: any) {
    let votesArray = data.votes;

    for (let i = 0; i < votesArray.length; i++) {
      this.answers[i].votes = votesArray[i];
    }
  }

  changeTitle(t: any) {
    this.title = t.title;
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
