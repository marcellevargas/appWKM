import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

/*
*  Provider responsável por consultar as Ações cadastradas, contém:
*   - Método selecionarTodasAcoes(param): Método realiza um select no banco e retorna todas as açoes cadastradas. 
*   Recebe codigo como parâmetro
*  
*  Extrutura da mensagem de erro: (method(). Mensagem programador: + mensagem erro aplicação)
*/
@Injectable()
export class AcoesProvider {

  constructor(private databaseProvider: DatabaseProvider) {  }

  // - Método selecionarTodasAcoes(): Método realiza um select no banco e 
  // retorna todas as açoes cadastradas. 
  // Não recebe parâmetros
  public selecionarTodasAcoes(codigo: string = null) {
    return this.databaseProvider.bancoDados()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM acoes ORDER BY valor DESC';
        var data: any[] = [];

        // Filtrando as ações
        // de acordo com o código
        if (codigo) {
          sql += ' and codigo like ?'
          data.push('%' + codigo + '%');
        }

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let listaAcoes: any[] = [];

              for (var i = 0; i < data.rows.length; i++) {
                var acoesData = data.rows.item(i);
                listaAcoes.push(acoesData);
              }
              return listaAcoes;

            } else {
              return 0;
            }
          })
          .catch((e) => {
            console.error('selecionarTodasAcoes(). Erro  ao selecionar a acao (verificar se o código está cadastrado): ' + e.message)
            return 0;
          });
      })
      .catch((e) => {
        console.error('selecionarTodasAcoes(). Erro  ao selecionar a acao (verificar se o código está cadastrado): ' + e.message)
        return 0;
      });
  }

}
export class Acao {
  id: number;
  codigo: string;
  quantidade_min: number;
  quantidade_max: number;
  valor: number;
}