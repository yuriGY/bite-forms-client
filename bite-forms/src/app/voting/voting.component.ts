import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFormData } from '../shared/interfaces/form-data.interface';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit {
  @Input() formData: IFormData;

  id: string;
  isResultVisible = false;
  totalSim = 0;
  totalNao = 0;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    debugger
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.id = params['id'];
      }
    });
  }

  mostrarVotos() {
    this.isResultVisible = true;

    const sim = document.querySelector('input[name="choice"][value="sim"]:checked') as HTMLInputElement;
    const nao = document.querySelector('input[name="choice"][value="nao"]:checked') as HTMLInputElement;

    this.totalSim = sim ? 1 : 0;
    this.totalNao = nao ? 1 : 0;
  }

}