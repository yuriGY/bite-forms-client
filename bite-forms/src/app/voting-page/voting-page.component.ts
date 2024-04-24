import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { initializeApp } from "firebase/app";
import { collection, doc, getDocs, getFirestore, onSnapshot, increment, updateDoc } from "firebase/firestore";
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

        this.getLocalStorageData();
        this.getData();
      }
    });
  }

  getLocalStorageData() {
    const localStorageData = localStorage.getItem(this.localStorageKey);
    if (localStorageData) {
      const userData = JSON.parse(localStorageData);
      if (userData.id === this.id && userData.hasVoted) {
        this.hasVoted = true;
      }
    }
  }

  async saveVote() {
    this.showResults();
    this.saveToLocalStorage();

    const answersColectionRef = collection(this.db, 'forms', `${this.id}`, 'answers');
    let idAnswersFirebase: string = '';
    let optionsFirebase: any;

    let querySnapshot0 = await getDocs(answersColectionRef);
    querySnapshot0.forEach((doc) => {
      idAnswersFirebase = doc.id;
      optionsFirebase = doc.data()['options'];
    });
    
    const answersDocRef = doc(this.db, 'forms', `${this.id}`, 'answers', `${idAnswersFirebase}`);

    for(let i=0; i<optionsFirebase.length; i++){
      if(optionsFirebase[i] === this.selectedAnswer){
        switch (i) {
          case 0:
            await updateDoc(answersDocRef, {
              "votes.opcao0": increment(1)
            });
            break;
          case 1:
            await updateDoc(answersDocRef, {
              "votes.opcao1": increment(1)
            });
            break;
          case 2:
            await updateDoc(answersDocRef, {
              "votes.opcao2": increment(1)
            });
            break;
          case 3:
            await updateDoc(answersDocRef, {
              "votes.opcao3": increment(1)
            });
            break;
            case 4:
              await updateDoc(answersDocRef, {
                "votes.opcao4": increment(1)
              });
            break;
            case 5:
              await updateDoc(answersDocRef, {
                "votes.opcao5": increment(1)
              });
            break;
            case 6:
              await updateDoc(answersDocRef, {
                "votes.opcao6": increment(1)
              });
            break;
            case 7:
              await updateDoc(answersDocRef, {
                "votes.opcao7": increment(1)
              });
            break;
            case 8:
              await updateDoc(answersDocRef, {
                "votes.opcao8": increment(1)
              });
            break;
            case 9:
              await updateDoc(answersDocRef, {
                "votes.opcao9": increment(1)
              });
            break;
          default:
            alert('Falha ao votar');
        }
      }
    }
  }

  saveToLocalStorage(): void {
    if (!this.hasVoted) {
      this.hasVoted = true;
      const userData = { id: this.id, hasVoted: this.hasVoted };
      localStorage.setItem(this.localStorageKey, JSON.stringify(userData));
    }
  }

  async getData() {
    const questionCollectionRef = collection(this.db, 'forms');
    let idAnswersFirebase: string = '';

    const questionDocRef = doc(this.db, 'forms', `${this.id}`); 
    const answersColectionRef = collection(this.db, 'forms', `${this.id}`, 'answers'); 

    let querySnapshot0 = await getDocs(answersColectionRef);
    querySnapshot0.forEach((doc) => {
      idAnswersFirebase = doc.id;
    });

    onSnapshot(questionDocRef, (doc) => {
      this.changeTitle(doc.data()); 
    });

    try {
      onSnapshot(doc(this.db, 'forms', `${this.id}`, 'answers', `${idAnswersFirebase}`), (doc) => {
        this.updateVotes(doc.data())
      });
    } catch(e) {
        console.error("Error adding document: ", e);
    }
  }

  updateVotes(data: any) {
    this.answers = [];
    for(let i=0; i<data.options.length; i++){
      this.answers.push({
        text: data['options'][i],
        votes: data['votes'][`opcao${i}`]          
      });
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
