# WKM - Analytics
<p> Aplicativo android desenvolvido utilizando o Ionic Framework para o desafio proposto pela pela WKN para a vaga de desenvolvedor IONIC/Pleno.</p>

<table style="width:100%">
  <tr>
    <th>
      <img src="https://user-images.githubusercontent.com/37669732/72255940-c1e54600-35e6-11ea-9390-1bd3ba220740.png" width="250px" heigth="300px"/>
    </th>
    <th>
      <img src="https://user-images.githubusercontent.com/37669732/72255597-edb3fc00-35e5-11ea-92e4-0475cd300503.png" width="250px" heigth="400px"/>
    </th>
    <th>
      <img src="https://user-images.githubusercontent.com/37669732/72257688-01159600-35eb-11ea-8b3e-f030e76444c2.png" width="250px" heigth="50px"/>
    </th>
  </tr>
  
  <tr>
    <th>
      <img src="https://user-images.githubusercontent.com/37669732/72257821-505bc680-35eb-11ea-945b-ec18537e6068.png" width="250px" heigth="300px"/>
    </th>
    <th>
      <img src="https://user-images.githubusercontent.com/37669732/72257876-75e8d000-35eb-11ea-9780-23ea11c33721.png" width="250px" heigth="400px"/>
    </th>
  </tr>
  
</table>

## Instalação e teste do app

1- Criar um projeto ionic versão 3:
```sh
ionic start wkm-analytics blank --type=ionic-angular
```
2-Fazer o download do respositório e inserir dentro do app criado
```sh
git clone "NOME REPO"
```
3- Depois de fazer o download do repositório, instalar o plugin de banco de dados:
```sh
ionic cordova plugin add cordova-sqlite-storage
```
```sh
npm install --save @ionic-native/sqlite@4
```
4- Testando o aplicativo no celular
```sh
ionic cordova run android
```

## Requisitos Funcionais

Requisitos funcionais:

* O usuário deve poder selecionar a ação para comprar e vender.
* Ao selecionar uma ação, deve ser exibida a quantidade de ações que ele possui, 
  quanto ela está valendo atualmente, o valor total e as ordens abertas do usuário.
* O aplicativo deve permitir que o usuário crie uma ordem de compra ou de venda, com quantidade e valor. 

* É necessário verificar se o usuário tem ações suficientes para poder vender, 
  inclusive se já existem outras ordens de venda abertas.
* Ao criar uma ordem, o aplicativo deve verificar se o valor registrado executará a ordem automaticamente ou não. 
  Para verificar se a ordem é executada automaticamente, é verificado o valor de compra mais alto 
  e de venda mais baixo (não é necessário se preocupar com a quantidade). 
*Caso a ordem seja executada, atualizar a quantidade de ações do usuário.

Considerações:

As ações e os valores não precisam ser de fato registrados, podem ser dados mockados, inclusive os valores de compra mais alto e de venda mais baixo.
Não é necessária implementação de back-end.
Usar as tecnologias Ionic com Angular.

## Objetivo

* Criar uma aplicativo que permita a compra e venda de ações na bolsa.

## Desenvolvedor

Marcelle Vargas – marcellecode@gmail.com


