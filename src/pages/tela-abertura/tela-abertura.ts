import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

/**
 * Tela apresenta uma animação informando ao usuário que o aplicativo está 
 * as ações ideais. A ideia é que nessa tela ele possa finalizar a sincronização
 * com alguma API
 */

@IonicPage()
@Component({
  selector: 'page-tela-abertura',
  templateUrl: 'tela-abertura.html',
})
export class TelaAberturaPage {

  constructor(public viewCtrl: ViewController) {
  }

  ionViewDidEnter(){
    setTimeout(() => {
      this.viewCtrl.dismiss();
    }, 30000);
  }

}
