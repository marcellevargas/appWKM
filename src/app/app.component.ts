import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { DatabaseProvider } from '../providers/database/database'
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = '';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, databaseProvider: DatabaseProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();

      this.createDatabase(databaseProvider, splashScreen);
    });
  }

  private createDatabase(databaseProvider: DatabaseProvider, splashScreen: SplashScreen)
  {
    databaseProvider.criarEstruturaBanco()
      .then(()=>{ 
        this.openHomePage(splashScreen);
      }) 
      .catch(() => { console.error('Error app.components') });
  }

  private openHomePage(splashScreen: SplashScreen) {
    splashScreen.hide();
    this.rootPage = TabsPage;
  }
}
