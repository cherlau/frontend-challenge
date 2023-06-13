<h1 align="center">Frontend Challenge 🚀</h1>

<p align="center">
 <a href="#-sobre">Sobre</a> •
 <a href="#-projetos">Projeto</a> •
 <a href="#%EF%B8%8F-autor">Autor</a>
</p>

<h3 align="center">

<img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"/>
<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E">
<img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white"/>
</h3>

## 💻 Sobre

<strong>Projeto feito no processo seletivo para estágio</strong>. Desenvolvimento de formulário de cadastro de fornecedor/produto e documentos, possui funcionalidades como consultar CEP automaticamente usando API, cadastro de produtos que são adicionados ao carrinho e podem ser removidos, cadastro de documentos que podem ser removidos e baixados. Ao enviar o formulário, os dados são salvos em formato JSON e armazenados na session storage.

## Requisitos

* Prototipo
   * <img src="./.github/prototipo.png" width="500px"/>

* Razão social obrigatório
* Nome Fantasia obrigatório
* CNPJ obrigatório
* Inscrição Estadual opcional
* Inscrição Municipal opcional
* Endereço obrigatório (consultar CEP automaticamente usando api via cep)
* Nome da pessoa de contato/telefone/email obrigatório
* Tabela de produtos: obrigatório a inclusão de pelo menos 1 item
   * Descrição obrigatório
   * Unidade de medida obrigatório
   * Valor unitário obrigatório
   * Valor total bloqueado, sendo ele a multiplicação entre quantidade em estoque e valor unitário
* Tabela de Anexos: obrigatório a inclusão de ao menos um documento
   * Os documentos anexados deverão ser armazenados em memória (blob e session storage) para envio 
   * Botão Excluir (lixeira): Ao excluir o documento, o mesmo deverá ser excluido da memória
   * Botão Visualizar (olho): Ao visualizar o documento, o mesmo deverá realizar o donwload do documento
* Botão ‘Enviar’: ao clicar no botão, deverá ser aberto modal de loading de envio, e deverá ser formatado um JSON com os dados a serem enviados, conforme exemplo:

<p>&nbsp;</p> 

```bash 
{	razaoSocial: 'Razao social',
	nomeFantasia: 'Nome Fantasia',
	cnpj: '123456',
	inscricaoEstadual: '123456',
	inscricaoMunicipal: '123456',
	nomeContato: 'Nome contato',
	telefoneContato: '+5562999999999999'
	emailContato: 'email@email.com',
	produtos: {
		[ 	indice: 1,
			descricaoProduto: 'Descrição produto',
			unidadeMedida: 'unidadeMedida',
			qtdeEstoque: '123',
			valorUnitario: '1554.00',
			valorTotal: '2555.00'		
		],
		[ 	indice: 2,
			descricaoProduto: 'Descrição produto',
			unidadeMedida: 'unidadeMedida',
			qtdeEstoque: '123',
			valorUnitario: '1554.00',
			valorTotal: '2555.00'		
		],
	}
	anexos: {
		[ 	indice: 1,
			nomeArquivo: 'iouahsiuahusihausihiahiuah',
			blobArquivo: 'iouahsiuahusihausihiahiuah'
		],
		[ 	indice: 2,
			nomeArquivo: 'iouahsiuahusihausihiahiuah',
			blobArquivo: 'iouahsiuahusihausihiahiuah'
		],	
	}

}
```
---

## 🚧 Projeto

<h3 align="center">Formulário de cadastro
  <p></p>
  <img src="./.github/page1.png" width="700px"/>
  <img src="./.github/page5.png" width="700px"/>	
  <img src="./.github/page4.png" width="700px"/>	
  <img src="./.github/page2.png" width="700px"/>	
</h3>

<p>&nbsp;</p>

<h3 align="center">JSON com os dados do formulário
  <p></p>
  <img src="./.github/page3.png" width="1000px"/>
</h3>

---

## ✒️ Autor

| [<img src="https://avatars.githubusercontent.com/u/112346259?v=4" width=115 > <br> <sub> Cherlau Prado </sub>](https://github.com/cherPrado) |
| :--------------------------------------------------------------------------------------------------------------------------------------------: |

<h2 >Entre em contato 🤙🏽</h2>

<div align="center">
<a href="https://www.linkedin.com/in/cherlau-prado/" target="_blank"><img src="https://img.shields.io/badge/Cherlau%20Prado-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt=""></a>
<a href="cherlaufilho@discente.ufg.br" target="_blank"><img src="https://img.shields.io/badge/cherlaufilho@discente.ufg.br-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt=""></a>
</div>


