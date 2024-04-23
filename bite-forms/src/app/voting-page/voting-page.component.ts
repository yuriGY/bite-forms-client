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
  isResultVisible = false;
  isAnswerSelected = false;
  isResultTimedout = false;

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
        this.id = params['id'];
        this.getData();
      }
    });
  }

  save() {
    this.showResults();
  }

  async getData() {
    const questionDocRef = collection(this.db, 'forms');
    const answersColectionRef = collection(this.db, 'forms', 'kuayLn5dyp6vTvfwZ0T6', 'answers');
    const answersDocRef = doc(this.db, 'forms', 'kuayLn5dyp6vTvfwZ0T6', 'answers', 'q7BBLenxj3kn3yKpnpIk');

    let querySnapshot1 = await getDocs(questionDocRef);
    querySnapshot1.forEach((doc) => {
      this.title = doc.data()['title'];
    });

    let querySnapshot2 = await getDocs(answersColectionRef);
    querySnapshot2.forEach((doc) => {

      this.answers = [];
      for (let i = 0; i < doc.data()['options'].length; i++) {
        this.answers.push({
          text: doc.data()['options'][i],
          votes: doc.data()['votes'][i]
        });
      }
    });

    onSnapshot(answersDocRef, (doc) => {
      this.updateVotes(doc.data())
      console.log('mudou');
    });
  }

  updateVotes(data: any) {
    let votesArray = data.votes;
    for (let i = 0; i < data.votes.length; i++) {
      this.answers[i].votes = data.votes[i];
    }
    console.log(votesArray);
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
