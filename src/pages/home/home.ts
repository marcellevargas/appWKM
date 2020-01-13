import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AcoesProvider } from '../../providers/acoes/acoes';
import { ModalController } from 'ionic-angular';
import { SelectAcaoPage } from '../select-acao/select-acao';

/**
 * - HomePage => tela responsável por apresentar as todas as oções cadastradas contém:
 * - Método selecionarTodasAcoes(): Chama o método selecionarTodasAcoes de acoesProvide
 * - Método visualizarAcao(): Chama a tela SelectAcaoPage e envia a acao por parâmetro
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public acoes: any [] = [];
  quantidadeAcoes: number;
  constructor(public navCtrl: NavController, public acoesProvider: AcoesProvider, public modalCtrl: ModalController) {
    
  }

  ionViewDidEnter(){
    this.selecionarTodasAcoes();
  }

  // Chama o método selecionarTodasAcoes da classe acoesProvider
  // this.acoes = return acoesProvider.selectAllAcoes()
  selecionarTodasAcoes(){
    this.acoesProvider.selecionarTodasAcoes()
    .then((returnListaAcoes: any)=>{
      this.acoes = returnListaAcoes;

      //Propriedade que recebe a quantidade de ações,se o valor for maior do 0 o
      // *ngFor irá ser executado no HTML
      this.quantidadeAcoes = this.acoes.length;
    })
  }

  // Chama a tela SelectAcaoPage e envia a acao por parâmetro
  visualizarAcao(acao){
    const modal = this.modalCtrl.create(SelectAcaoPage, {acao: acao});
    modal.present();    
  }
}
