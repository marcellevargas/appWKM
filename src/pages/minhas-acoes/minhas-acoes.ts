import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { MinhasAcoesProvider } from '../../providers/minhas-acoes/minhas-acoes';

/**
 * classe MinhasAcoesPage => Tela apresenta as ações pertencentes
 *                           ao usuário
 */

@IonicPage()
@Component({
  selector: 'page-minhas-acoes',
  templateUrl: 'minhas-acoes.html',
})
export class MinhasAcoesPage {

  public listaMinhasAcoes;
  public quantidadeMinhasAcoes;
  constructor(private minhasAcoesProvider: MinhasAcoesProvider) {
  }

  ionViewDidEnter() {
    this.minhasAcoesProvider.selecionarMinhasAcoes()
    .then((retornoMinhasAcoes: any)=> {
      this.listaMinhasAcoes = retornoMinhasAcoes;
      //Propriedade que recebe a quantidade de ações,se o valor for maior do 0 o
      // *ngFor irá ser executado no HTML
      this.quantidadeMinhasAcoes = this.listaMinhasAcoes.length;
    })
  }
  

}
