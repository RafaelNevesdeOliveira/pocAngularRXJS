import { Acoes, AcoesAPI } from './model/acoes';
import { AcoesService } from './acoes.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent implements OnInit {
  acoesInput = new FormControl();
  public acoes$ = this.acoesInput.valueChanges.pipe(
    tap(console.log),
    debounceTime(300),
    filter((valorDigitado) => valorDigitado.length >= 2),
    switchMap((valorDigitado) => this.acoesService.getAcoes(valorDigitado)),
    filter(Boolean),
    tap(console.log)
  );
  constructor(private acoesService: AcoesService) {}

  ngOnInit() {}
}
