import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

/*
*  Provider responsável por consultar as Ordens cadastradas, contém:
*   - selecionarOrdens(): Método seleciona as ordens existentes de acordo com o codigo_acao. 
*                          Recebe codigo_acao por parâmetro
*  
*  Extrutura da mensagem de erro: (method(). Mensagem programador: + mensagem erro aplicação)
*/
@Injectable()
export class OrdensProvider {
 
  constructor(private databaseProvider: DatabaseProvider) { }

  // - selecionarOrdens(): Método seleciona as ordens existentes de acordo com o codigo_acao.
  // Recebe codigo_acao por parâmetro

  public selecionarOrdens(codigo_acao){
    return this.databaseProvider.bancoDados()
    .then((db: SQLiteObject) => {
     
     let sql = 'SELECT * FROM ordem WHERE codigo_acao = ?';
     let data = [codigo_acao];
      
     return db.executeSql(sql, data)
       .then((data: any) => {
         if (data.rows.length > 0) {
           if(data.rows.length > 1){
               let listaOrdens: any[] = [];
                
              for (var i = 0; i < data.rows.length; i++) {
                var ordensData = data.rows.item(i);
                listaOrdens.push(ordensData);
              }
              return listaOrdens;
           }else{
              let ordemData = data.rows.item(0);
            
              let ordem = new Ordem();
  
              ordem.tipo_ordem        = ordemData.tipo_ordem;
              ordem.codigo_acao       = ordemData.codigo_acao; 
              ordem.quantidade        = ordemData.quantidade;
              ordem.valor_acao        = ordemData.acoes_valor;
            
              return ordem;
           }
           
          }else{
            return 0;
         }
       })
       .catch((e) => console.error(e.message));
   })
     .catch(e => console.error('Erro ao consultar a qtd de minhas_acoes', e.message)); 
   
  }
 
  
}
export class Ordem {
  id: number;
  codigo_acao: string;
  quantidade: any;
  valor_acao: number;
  tipo_ordem: string;
  data_hora: Date;
}
