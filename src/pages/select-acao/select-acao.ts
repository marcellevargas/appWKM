import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController } from 'ionic-angular';
import { Acao } from '../../providers/acoes/acoes';
import { MinhasAcoesProvider, MinhaAcao } from '../../providers/minhas-acoes/minhas-acoes';
import { OrdensProvider } from '../../providers/ordens/ordens';
import { ComprarPage } from '../comprar/comprar';
import { VenderPage } from '../vender/vender';

/**
 * SelectAcaoPage => Tela responsável de receber uma ação por parâmetro e apresentar as informações de:
 *                    - Valor atual
 *                    - Quantidade de ordens de compra e venda
 *                    - Quantiade de ações existentes para aquela ação
 */


@Component({
  selector: 'page-select-acao',
  templateUrl: 'select-acao.html',
})
export class SelectAcaoPage {

  public acao: Acao = new Acao();
  public minhasAcoes: MinhaAcao = new MinhaAcao();
  public valorTotal;
  maiorValorOrdemCompra: number;
  menorValorOrdemVenda: number;
  quantidadeOrdemVenda: number;
  listaOrdem: any;

  constructor(public navParams: NavParams, public viewCtrl: ViewController, private minhasAcoesProvider: MinhasAcoesProvider, private ordensProvider: OrdensProvider, public modalCtrl: ModalController) {
    this.acao = this.navParams.get('acao');
    this.selecionarQuantidadeMinhasAcoes(this.acao.codigo);
    this.selecionarOrdens(this.acao.codigo);
  }

  fechar() {
    this.viewCtrl.dismiss();
  }

  //- Função getQuantidadeMinhasAcoes(): Recebe a quantidade presente na tabela minhas_acoes
  // Recebe por parâmetro "codigo_acao" => corresponde ao código da ação recebida
  selecionarQuantidadeMinhasAcoes(codigo_acao) {
    this.minhasAcoesProvider.selecionarQuantidadeMinhasAcoes(codigo_acao)
      .then((qtdMinhasAcoes: any) => {
        //qtdMinhasAcoes => parâmetro de retorno de minhasAcoesProvider.selectQuantidadeMinhasAcoes()
        // que recebe a quantidade de ações existentes de acordo com o código da ação

        this.minhasAcoes = qtdMinhasAcoes;
        this.valorTotal = this.acao.valor * this.minhasAcoes.quantidade;
      })
  }

  // - Função getOrdens(): Recebe de retorno maiorValorOrdemVenda, menorValorOrdemVenda,quantidadeOrdemVenda
  // Recebe por parâmetro "codigo_acao" => corresponde ao código da ação recebida
  selecionarOrdens(codigo_acao) {
    this.ordensProvider.selecionarOrdens(codigo_acao)
      .then((returnOrdens: any) => {
        //returnOrdens => Parâmetro que recebe o retorno ordensProvider.selectOrdens()

        if (returnOrdens == 0) {
          //Se returnOrdens == 0 => não existem registros para esse codigo_acao
          this.maiorValorOrdemCompra = 0;
          this.menorValorOrdemVenda = 0;
          this.quantidadeOrdemVenda = 0;
        } else {
          //Se existirem registros a propriedade listaOrdem recebe o valor de returnOrdens
          returnOrdens.forEach(ordem => {
            // Selecionando o maior valor de venda
            //e o menor valor de compra
            let listaValorOrdensVenda: any[] = []
            if (ordem.tipo_ordem == 'compra') {
              //Seleciona o maior valor de compra
              this.quantidadeOrdemVenda = ordem.quantidade;
              listaValorOrdensVenda.push(ordem.valor_acao);
              this.maiorValorOrdemCompra = Math.max(...listaValorOrdensVenda)
            } else {
              //Seleciona o menor valor de venda
              this.quantidadeOrdemVenda = (this.quantidadeOrdemVenda + ordem.quantidade);
              listaValorOrdensVenda.push(ordem.valor_acao);
              this.menorValorOrdemVenda = Math.min(...listaValorOrdensVenda)
            }
            this.listaOrdem = returnOrdens;
          })

        }

      })
  }

  // -Função openComprarPage(): executa a função de chamar a tela de ComprarPage
  // Recebe por parâmetro acao,minhasAcoes, maiorValorOrdemVenda
  abrirComprarPage(acao, minhasAcoes, maiorValorOrdemCompra) {
    const modal = this.modalCtrl.create(ComprarPage, { acao: acao, minhasAcoes: minhasAcoes, maiorValorOrdemCompra: maiorValorOrdemCompra });
    modal.present();
    this.viewCtrl.dismiss();
  }

  // -Função openVenderPage(): executa a função de chamar a tela de ComprarPage
  // Recebe por parâmetro acao,minhasAcoes, maiorValorOrdemVenda
  abrirVenderPage(acao, minhasAcoes, menorValorOrdemVenda, quantidadeOrdemVenda) {
    const modal = this.modalCtrl.create(VenderPage, { acao: acao, minhasAcoes: minhasAcoes, menorValorOrdemVenda: menorValorOrdemVenda, quantidadeOrdemVenda: quantidadeOrdemVenda });
    modal.present();
    this.viewCtrl.dismiss();
  }

}
