import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {

  isResultVisible = false;
  totalSim = 0;
  totalNao = 0;

  constructor() { }

  ngOnInit(): void {

  }

  mostrarVotos() {
    this.isResultVisible = true;

    const sim = document.querySelector('input[name="choice"][value="sim"]:checked') as HTMLInputElement;
    const nao = document.querySelector('input[name="choice"][value="nao"]:checked') as HTMLInputElement;

    this.totalSim = sim ? 1 : 0;
    this.totalNao = nao ? 1 : 0;
  }

}
