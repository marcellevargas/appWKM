import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { MinhasAcoesProvider, MinhaAcao } from '../../providers/minhas-acoes/minhas-acoes';
import { Acao } from '../../providers/acoes/acoes';
import { NgForm } from '@angular/forms';
import { Ordem } from '../../providers/ordens/ordens';
import { AlertController } from 'ionic-angular';

/**
 * - Página ComprarPage => tela responsável por permitir o cadastro de uma ordem de compra, contém:
 * - Método close(): Encerra a visualização da página
 * - Método salvarOrdemCompra(): Verifica se a ordem de compra será executada automaticamente
 */

@Component({
  selector: 'page-comprar',
  templateUrl: 'comprar.html',
})

export class ComprarPage {


  @ViewChild('form') form: NgForm;

  public acao: Acao = new Acao();
  public ordem: Ordem = new Ordem();
  public minhaAcao: MinhaAcao = new MinhaAcao;
  public maiorValorOrdemCompra;
  public valor_acao: number;


  constructor(public navCtrl: NavController, public navParams: NavParams, private minhasAcoesProvider: MinhasAcoesProvider, public viewCtrl: ViewController, private alertCtrl: AlertController) {

    this.acao = this.navParams.get('acao')
    this.minhaAcao = this.navParams.get('minhasAcoes')
    this.maiorValorOrdemCompra = this.navParams.get('maiorValorOrdemCompra')
  }

  ionViewDidLoad() { }

  fechar() {
    this.viewCtrl.dismiss();
  }


  salvarOrdemCompra() {
    // Se a propriedade maiorValorOrdemCompra >= 0 o Método irá verificar se o valor da maior
    // ordem de compra já registrada é maior que o valor informado no formulário, se esse valor é maior
    // será atualizada a quantidade na tabela minhas_acoes

    if (this.maiorValorOrdemCompra > 0) {
      this.minhaAcao.quantidade = (parseInt(this.ordem.quantidade) + parseInt(this.minhaAcao.quantidade));
      this.minhaAcao.acao.codigo = this.acao.codigo;
      if (this.ordem.valor_acao >= this.maiorValorOrdemCompra) {
        this.minhasAcoesProvider.verificaMinhasAcoes(this.minhaAcao)
          .then(() => {
            this.alertaOrdemCriadaExecutada()
          })
      } else {
        this.alertaOrdemCriada()
      }
    }
    else {
      this.minhaAcao.quantidade = (parseInt(this.ordem.quantidade) + parseInt(this.minhaAcao.quantidade));
      this.minhaAcao.acao.codigo = this.acao.codigo;
      this.minhasAcoesProvider.verificaMinhasAcoes(this.minhaAcao)
      this.alertaOrdemCriadaExecutada()
    }

  }

  alertaOrdemCriada() {
    let alert = this.alertCtrl.create({
      title: 'Ordem criada',
      subTitle: 'status: aguardando processamento',
      buttons: ['ok']
    });
    alert.present();
    this.viewCtrl.dismiss();
  }

  alertaOrdemCriadaExecutada() {
    let alert = this.alertCtrl.create({
      title: 'Ordem criada',
      subTitle: 'status: executada',
      buttons: ['ok']
    });
    alert.present();
    this.viewCtrl.dismiss();
  }

}
