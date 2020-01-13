import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { Acao } from '../acoes/acoes';

/*
*  Provider responsável por consultar as Ações cadastradas, contém:
*   - verificaMinhasAcoes(): método verifica se já existe uma acao do usuário com o mesmo código. 
                            Se existir, será chamado o método atualizarQuantidade().
                            Se não será chamado o método inserir()
*  
*  Extrutura da mensagem de erro: (method(). Mensagem programador: + mensagem erro aplicação)
*/
@Injectable()
export class MinhasAcoesProvider {

  constructor(private databaseProvider: DatabaseProvider) { }

  // - verificaMinhasAcoes(): método verifica se já existe uma acao do usuário com o mesmo código.
  // Se existir, será realizado o atualizarQuantidade() nas quantidades. 
  // Se não será realizado o inserir()
  // Recebe minhaAcao por parâmetro
  verificaMinhasAcoes(minhaAcao: MinhaAcao) {
    return this.databaseProvider.bancoDados()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM minhas_acoes WHERE codigo_acao = ?';
        let data = [minhaAcao.acao.codigo];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              this.atualizarQuantidade(minhaAcao)
            } else {
              this.inserir(minhaAcao)
            }
          })
          .catch((e) => console.error(e.message));
      })
      .catch(e => console.error('Erro ao consultar a qtd de minhas_acoes', e.message));
  }

  // - inserir(): Método insere registros na tabela minhas_acoes.
  // Recebe minhaAcao por parâmetro
  inserir(minhaAcao: MinhaAcao) {
    return this.databaseProvider.bancoDados()
      .then((db: SQLiteObject) => {

        let sql = 'INSERT INTO minhas_acoes ( codigo_acao, quantidade ) VALUES ( ?, ? )';
        let data = [minhaAcao.acao.codigo, minhaAcao.quantidade];

        return db.executeSql(sql, data)
          .then(() => {
            return true
          })
          .catch((e) => {
            console.error('insert(). Erro  ao inserir minhaAcao (verificar dados enviados): ' + e.message)
            return 0;
          });
      })
      .catch((e) => {
        console.error('insert(). Erro  ao inserir minhaAcao (verificar dados enviados): ' + e.message)
        return 0;
      });
  }

  // - atualizarQuantidade(): Método realiza a atualização da quantidade na tabela minhas_acoes
  //                          de acordo com o código da ação
  // Recebe minhaAcao por parâmetro
  atualizarQuantidade(minhaAcao: MinhaAcao) {
    return this.databaseProvider.bancoDados()
      .then((db: SQLiteObject) => {

        let sql = 'update minhas_acoes set quantidade = ? where codigo_acao = ?';
        let data = [minhaAcao.quantidade, minhaAcao.acao.codigo];

        return db.executeSql(sql, data)
          .then(() => {
            return true
          })
          .catch((e) => {
            console.error('update(). Erro update minhaAcao (verificar dados enviados): ' + e.message)
            return 0;
          });
      })
      .catch((e) => {
        console.error('update(). Erro update minhaAcao (verificar dados enviados): ' + e.message)
        return 0;
      });
  }

  // - selecionarQuantidadeMinhasAcoes(): Método realiza o select no banco e retorna a quantidade de ações
  //                                      de acordo com o codigo da ação.
  // Recebe codigo_acao por parâmetro

  public selecionarQuantidadeMinhasAcoes(codigo_acao) {
    return this.databaseProvider.bancoDados()
      .then((db: SQLiteObject) => {

        let sql = 'SELECT * FROM minhas_acoes WHERE codigo_acao = ?';
        let data = [codigo_acao];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let minhaAcaoData = data.rows.item(0);

              let minhaAcao = new MinhaAcao();
              minhaAcao.quantidade = minhaAcaoData.quantidade;

              return minhaAcao;
            } else {

              let minhaAcao = new MinhaAcao();
              minhaAcao.quantidade = 0;

              return minhaAcao;
            }
          })
          .catch((e) => {
            console.error('selectQuantidadeMinhasAcoes(). Erro selectQuantidadeMinhasAcoes minhaAcao (verificar dados enviados): ' + e.message)
            return 0;
          });
      })
      .catch((e) => {
        console.error('selectQuantidadeMinhasAcoes(). Erro selectQuantidadeMinhasAcoes minhaAcao (verificar dados enviados): ' + e.message)
        return 0;
      });
  }

  // - selecionarMinhasAcoes(): Método realiza o select no banco e retorna todas as ações presentes em minhas_acoes.
  public selecionarMinhasAcoes() {
    return this.databaseProvider.bancoDados()
      .then((db: SQLiteObject) => {

        let sql = 'SELECT * FROM minhas_acoes WHERE quantidade > 0';
        let data = [];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let listaAcoes: any[] = [];

              for (var i = 0; i < data.rows.length; i++) {
                var minhasAcoesData = data.rows.item(i);
                listaAcoes.push(minhasAcoesData);
              }
              return listaAcoes;

            } else {
              return 0;
            }
          })
          .catch((e) => {
            console.error('selecionarMinhasAcoes(). Erro  ao selecionar a acao (verificar se o código está cadastrado): ' + e.message)
            return 0;
          });
      })
      .catch((e) => {
        console.error('selecionarMinhasAcoes(). Erro selectQuantidadeMinhasAcoes minhaAcao (verificar dados enviados): ' + e.message)
        return 0;
      });
  }

  

}
export class MinhaAcao {
  id: number;
  acao = new Acao();
  quantidade: any;
}
