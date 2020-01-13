import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
*  Provider responsável pela criação do banco de dados, contém:
*   - Método database(): Método que executa o sqlite.create()
*   - Método createDatabase(): Método que executa os métodos de => criar as tabelas e inserir dados de teste   
*   - Método createTables(): Método que cria as tabelas que do banco de dados
*   - Método insertDadosTeste(): Incluindo os dados de teste   
*
*   Extrutura da mensagem de erro: (method(). Mensagem programador: + mensagem erro aplicação)
*/

@Injectable() 
export class DatabaseProvider {

  constructor(private sqlite: SQLite) { }


  //- Método bancoDados(): Método que executa o sqlite.create()
  public bancoDados() {
    return this.sqlite.create({
      name: 'wkmAnalytics(0.0.1).db',
      location: 'default'
    });
  }


  //- Método criarEstruturaBanco(): Método que executa as método de => criar as tabelas e inserir dados de teste
  public criarEstruturaBanco() {
    return this.bancoDados()
      .then((db: SQLiteObject) => {
        // Criando as tabelas
        this.criarTabelas(db)
        this.inserirDadosTeste(db)
      })
      .catch(e => console.error('createDatabase(). Erro ao criar banco de dados, message: ' + e.message));
  }

  /**
   * - criarTabelas(): Método que cria as tabelas que do banco de dados
   * @param db
   */

  private criarTabelas(db: SQLiteObject) {
    return db.sqlBatch([
      [
        'CREATE TABLE IF NOT EXISTS acoes ( ' +
        'id INTEGER primary key NOT NULL, ' +
        'codigo TEXT  NOT NULL, ' +
        'quantidade_min INTEGER NOT NULL, ' +
        'quantidade_max INTEGER NOT NULL, ' +
        'valor INTEGER NOT NULL)'
      ],

      [
        'CREATE TABLE IF NOT EXISTS minhas_acoes ( ' +
        'id INTEGER primary key NOT NULL, ' +
        'codigo_acao TEXT  NOT NULL, ' +
        'quantidade INTEGER NOT NULL, ' +
        'FOREIGN KEY(codigo_acao) REFERENCES acoes(codigo)) '
      ],

      [
        'CREATE TABLE IF NOT EXISTS ordem ( ' +
        'id INTEGER primary key AUTOINCREMENT NOT NULL, ' +
        'codigo_acao TEXT  NOT NULL, ' +
        'quantidade INTEGER NOT NULL, ' +
        'valor_acao INTEGER NOT NULL, ' +
        'tipo_ordem TEXT NOT NULL, ' +
        'data_hora DATETIME) '
      ]

    ])
      .then(() => { return 'true' })
      .catch(e => console.error('createTables(). Erro ao criar as tabelas, message: ', e.message));
  }

  /**
   * -inserirDadosTeste(): Incluindo os dados de teste
   * @param db
   */
  private inserirDadosTeste(db: SQLiteObject) {
    return db.executeSql('select COUNT(id) as qtd from acoes', [])
      .then((data: any) => {

        //Se não existir nenhum registro na tabela de "acoes"
        if (data.rows.item(0).qtd == 0) {
          db.sqlBatch([

            //Inserir dados de teste na tabela "acoes" 
            ['INSERT INTO acoes ( id, codigo, valor, quantidade_min, quantidade_max ) VALUES ( ?, ?, ?, ?, ? )', ['1', 'PETR4F', '36.25', '0', '700']],
            ['INSERT INTO acoes ( id, codigo, valor, quantidade_min, quantidade_max ) VALUES ( ?, ?, ?, ?, ? )', ['2', 'METR3F', '16.25', '0', '700']],
            ['INSERT INTO acoes ( id, codigo, valor, quantidade_min, quantidade_max ) VALUES ( ?, ?, ?, ?, ? )', ['3', 'GETR4', '28.25', '100', '700']],
            ['INSERT INTO acoes ( id, codigo, valor, quantidade_min, quantidade_max ) VALUES ( ?, ?, ?, ?, ? )', ['4', 'PETR3F', '28.25', '200', '700']],
            ['INSERT INTO acoes ( id, codigo, valor, quantidade_min, quantidade_max ) VALUES ( ?, ?, ?, ?, ? )', ['5', 'LAMB4F', '12.25', '0', '700']],
            ['INSERT INTO acoes ( id, codigo, valor, quantidade_min, quantidade_max ) VALUES ( ?, ?, ?, ?, ? )', ['6', 'PAMB3F', '22.25', '0', '700']],
            ['INSERT INTO acoes ( id, codigo, valor, quantidade_min, quantidade_max ) VALUES ( ?, ?, ?, ?, ? )', ['7', 'LAMB4F', '11.25', '150', '700']],
            ['INSERT INTO acoes ( id, codigo, valor, quantidade_min, quantidade_max ) VALUES ( ?, ?, ?, ?, ? )', ['8', 'HNR3F', '21.25', '350', '700']],
            ['INSERT INTO acoes ( id, codigo, valor, quantidade_min, quantidade_max ) VALUES ( ?, ?, ?, ?, ? )', ['9', 'REST4F', '15.25', '0', '700']],
            ['INSERT INTO acoes ( id, codigo, valor, quantidade_min, quantidade_max ) VALUES ( ?, ?, ?, ?, ? )', ['10', 'ZHUN5F', '25.25', '0', '700']],
            ['INSERT INTO acoes ( id, codigo, valor, quantidade_min, quantidade_max ) VALUES ( ?, ?, ?, ?, ? )', ['11', 'ITU6F', '13.25', '200', '700']],
            ['INSERT INTO acoes ( id, codigo, valor, quantidade_min, quantidade_max ) VALUES ( ?, ?, ?, ?, ? )', ['12', 'REST4F', '23.25', '500', '700']],

            //Inserir dados de teste na tabela "minhas_acoes"
            ['INSERT INTO minhas_acoes ( codigo_acao, quantidade ) VALUES ( ?, ? )', ['PETR4F', '5']],
            ['INSERT INTO minhas_acoes ( codigo_acao, quantidade ) VALUES ( ?, ? )', ['LAMB4F', '25']],
            ['INSERT INTO minhas_acoes ( codigo_acao, quantidade ) VALUES ( ?, ? )', ['REST4F', '17']],

            //Inserir dados de teste na tabela "ordem"
            ['INSERT INTO ordem ( codigo_acao, quantidade, valor_acao, tipo_ordem, data_hora ) VALUES ( ?, ?, ?, ?, ? )', ['PETR4F', '6', '16.25', 'compra', '2019/01/10']],
            ['INSERT INTO ordem ( codigo_acao, quantidade, valor_acao, tipo_ordem, data_hora ) VALUES ( ?, ?, ?, ?, ? )', ['PETR4F', '9', '26.25', 'venda', '2019/01/10']],
          ])
            .then(() => { return true })
            .catch(e => console.error('Erro ao incluir dados', e.message));
        }
      })
      .catch(e => console.error('insertDadosTeste(): Erro ao consultar a quantidade de acoes, message: ', e));
  }

}
