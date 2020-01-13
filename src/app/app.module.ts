//Angular
import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import localept from '@angular/common/locales/pt';

//Ionic-Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';

//Providers 
import { DatabaseProvider } from '../providers/database/database';
import { AcoesProvider } from '../providers/acoes/acoes';

//Pages
import { HomePage } from '../pages/home/home';
import { MinhasAcoesProvider } from '../providers/minhas-acoes/minhas-acoes';
import { OrdensProvider } from '../providers/ordens/ordens';
import { SelectAcaoPage } from '../pages/select-acao/select-acao';
import { ComprarPage } from '../pages/comprar/comprar';
import { VenderPage } from '../pages/vender/vender';
import { MinhasAcoesPage } from '../pages/minhas-acoes/minhas-acoes';
import { TabsPage } from '../pages/tabs/tabs';
import { TelaAberturaPage } from '../pages/tela-abertura/tela-abertura';

registerLocaleData(localept, 'pt');

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SelectAcaoPage,
    ComprarPage,
    VenderPage,
    MinhasAcoesPage,
    TabsPage,
    TelaAberturaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SelectAcaoPage,
    ComprarPage,
    VenderPage,
    MinhasAcoesPage,
    TabsPage,
    TelaAberturaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: LOCALE_ID, useValue: 'pt'},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AcoesProvider,
    DatabaseProvider,
    SQLite,
    MinhasAcoesProvider,
    OrdensProvider        
  ]
})
export class AppModule {}
