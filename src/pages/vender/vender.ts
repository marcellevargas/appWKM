import { Component, ViewChild } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { MinhasAcoesProvider, MinhaAcao } from '../../providers/minhas-acoes/minhas-acoes';
import { Acao } from '../../providers/acoes/acoes';
import { NgForm } from '@angular/forms';
import { Ordem } from '../../providers/ordens/ordens';
import { AlertController } from 'ionic-angular';

/**
 * - Página VenderPage => tela responsável por permitir o cadastro de uma ordem de venda, contém:
 * - Função salvarOrdemVenda(): função para verificar se a ordem será executada automaticamente ou não
 */

@Component({
  selector: 'page-vender',
  templateUrl: 'vender.html',
})
export class VenderPage {
  @ViewChild('form') form: NgForm;

  public acao: Acao = new Acao();
  public ordem: Ordem = new Ordem();
  public minhaAcao: MinhaAcao = new MinhaAcao;
  public menorValorOrdemVenda;
  public quantidadeOrdemVenda;

  constructor(public navParams: NavParams, private minhasAcoesProvider: MinhasAcoesProvider, public viewCtrl: ViewController, private alertCtrl: AlertController) {
    this.acao = this.navParams.get('acao')
    this.minhaAcao = this.navParams.get('minhasAcoes')
    this.quantidadeOrdemVenda = this.navParams.get('quantidadeOrdemVenda')
    this.menorValorOrdemVenda = this.navParams.get('menorValorOrdemVenda')
  }

  ionViewDidLoad() { }

  fechar() {
    this.viewCtrl.dismiss();
  }

  salvarOrdemVenda() {
    //Se o menor valor de ordem de venda registrado for maior do que 0
    if (this.menorValorOrdemVenda > 0) {
      if (this.ordem.valor_acao <= this.menorValorOrdemVenda) {

        let quantidadeRealAcoes = (parseInt(this.minhaAcao.quantidade) - parseInt(this.quantidadeOrdemVenda));

        if (quantidadeRealAcoes >= this.ordem.quantidade) {

          this.minhaAcao.quantidade = (parseInt(this.minhaAcao.quantidade) - parseInt(this.ordem.quantidade));
          this.minhaAcao.acao.codigo = this.acao.codigo;
          this.minhasAcoesProvider.verificaMinhasAcoes(this.minhaAcao)
            .then(() => {
              this.alertaOrdemCriadaExecutada()
            })
        } else {
          this.alertaQuantidadeAcoesInsuficientes()
        }

      } else {
        this.alertaOrdemCriada()
      }

    }
    //Se o menor valor de venda registrado não for maior do que 0
    else {
      let quantidadeRealAcoes = (parseInt(this.minhaAcao.quantidade) - parseInt(this.quantidadeOrdemVenda));
      if (quantidadeRealAcoes >= this.ordem.quantidade) {
        this.minhaAcao.quantidade = (parseInt(this.minhaAcao.quantidade) - parseInt(this.ordem.quantidade));
        this.minhaAcao.acao.codigo = this.acao.codigo;
        this.minhasAcoesProvider.verificaMinhasAcoes(this.minhaAcao)
          .then(() => {
            this.alertaOrdemCriadaExecutada()
          })
      } else {
        this.alertaQuantidadeAcoesInsuficientes()
      }
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

  alertaQuantidadeAcoesInsuficientes() {
    let alert = this.alertCtrl.create({
      title: 'Ops!',
      subTitle: 'Quantidade de ações insuficientes',
      buttons: ['ok']
    });
    alert.present();
  }
}
