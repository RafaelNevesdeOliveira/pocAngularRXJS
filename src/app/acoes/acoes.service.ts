import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck, tap } from 'rxjs/operators';
import { Acao, AcoesAPI } from './model/acoes';
@Injectable({
  providedIn: 'root',
})
export class AcoesService {
  constructor(private httpClient: HttpClient) {}

  getAcoes(valor?: string) {
    const params = valor ? new HttpParams().append('valor', valor) : undefined;
    return this.httpClient
      .get<AcoesAPI>('http://localhost:3000/acoes', { params })
      .pipe(
        tap((data)=>console.log(data)),
        pluck('payload'),
        map((acoes) =>
          acoes.sort((acaoA, acaoB) => this.ordenarPorCodigo(acaoA, acaoB))
        )
      );
  }

  ordenarPorCodigo(acaoA:Acao, acaoB:Acao){
    if(acaoA.codigo > acaoB.codigo) return 1;
    if(acaoA.codigo < acaoB.codigo) return -1;
    return 0;
  }
}
