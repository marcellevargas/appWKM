import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { MinhasAcoesPage } from '../minhas-acoes/minhas-acoes';
import { HomePage } from '../home/home';
import { ModalController } from 'ionic-angular';
import { TelaAberturaPage } from '../tela-abertura/tela-abertura';

/**
 * TabsPage => Apresenta as duas telas principais com o formato de abas.
 *             Ao carregar cria um modal chamando a TelaAberturaPage
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = MinhasAcoesPage;
  tab2Root = HomePage;

  constructor(public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    const modal = this.modalCtrl.create(TelaAberturaPage);
    modal.present();
  }

}
