import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IFormData } from '../shared/interfaces/form-data.interface';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc, getDocs, addDoc, updateDoc } from "firebase/firestore"; 

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent {
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

          this.saveQuestion();
          this.router.navigateByUrl(`voting/${this.id}`);
          this.formDisabled = true; // Desabilita o formulário
        } else {
          alert('Por favor, preencha alternativas únicas, parece que tem alternativas com os mesmos valores.');
        }
      } else {
        alert('Por favor, preencha todas as alternativas.');
      }
    } else {
      alert('Por favor, preencha a pergunta e pelo menos uma alternativa.');
    }
  }

  addAnswer() {
    if (this.answers.length < this.maxAnswers) {
      this.answers.push('');
    } else {
      alert('Limite máximo de alternativas atingido.');
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

  //Método para salvar a pergunta na FireStore
  async saveQuestion() {
    const questionCollectionRef = collection(this.db, 'forms');
    const questionDocRef = doc(this.db, 'forms', `${this.id}`);
    const answersDocRef = doc(this.db, 'forms', `${this.id}`, 'answers', 'answer');

    const optionsText = this.answersModel
      .map((item: string) => item.trim())
      .filter((item: string) => item !== ""); // Elimina os elementos vazios

    try {
      await setDoc(questionDocRef, {
        "id": this.formData.id,
        "title": this.formData.title
      });

      console.log("Document 1 written ")
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    try {
      await addDoc(collection(this.db, "forms", `${this.id}`, 'answers'), {
        "options": optionsText,
        "votes": optionsText.map(() => 0) // Recria o array de votos, para cada opção, com zero
      });      

      console.log("Document 1 written ")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  redirectToMainPage() {
    this.router.navigateByUrl(`/`);
  }
}
