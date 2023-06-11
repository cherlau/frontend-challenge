const form = document.querySelector('#form')
const fadeElement = document.querySelector('#fade')
const loaderElement = document.querySelector('#loader')
const closeButton = document.querySelector('#close-message')
const name = document.querySelector('#name')
const area = document.querySelector('#area')
const razaoSocial = document.querySelector('#razao-social')
const nomeFantasia = document.querySelector('#nome-fantasia')
const cepInput = document.querySelector('#cep')
const cnpj = document.querySelector('#cnpj')
const inscEstadual = document.querySelector('#insc-estadual')
const inscMunicipal = document.querySelector('#insc-municipal')
const address = document.querySelector('#address')
const neighborhood = document.querySelector('#neighborhood')
const contactPerson = document.querySelector('#contact-person')
const complement = document.querySelector('#complement')
const region = document.querySelector('#region')
const tel = document.querySelector('#tel')
const number = document.querySelector('#number')
const city = document.querySelector('#city')
const email = document.querySelector('#email')
const btnSubmit = document.querySelector('.btn-submit')
const btnAddProduct = document.querySelector('#btn-add-product')
const registeredProducts = document.querySelector('.registered-products')
const btnInclude = document.querySelector('#btn-include')
const fieldsetProducts = document.querySelector('#fieldset-products')
const fieldsetAnexos = document.querySelector('#fieldset-anexos')

window.onload = dataAtual()

function dataAtual(){
    var dataAtual = new Date();
    var dia = String(dataAtual.getDate()).padStart(2, '0');
    var mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    var ano = dataAtual.getFullYear();
    var horas = String(dataAtual.getHours()).padStart(2, '0');
    var minutos = String(dataAtual.getMinutes()).padStart(2, '0');
    var dataHoraFormatada = ano + '-' + mes + '-' + dia + 'T' + horas + ':' + minutos;
    
    document.getElementById('date').value = dataHoraFormatada;
}

document.addEventListener('click', e => {
    let el = e.target
    
    if(el === btnSubmit){
        e.preventDefault()
        e.stopPropagation()
        dataAtual()
        toggleLoader()
        
        if(!validateInputsFornecedor()){
            toggleLoader();
            toggleMessage('Dados do Fornecedor incompletos')
            return
        } 

        if(!cepInput.classList.contains('is-valid')){
            toggleLoader();
            cepInput.classList.add('is-invalid')
            toggleMessage("CEP inválido")
            return
        }

        if(carrinho.itens.length === 0){
            toggleLoader();
            fieldsetProducts.classList.add('border-red')
            toggleMessage('Adicione pelo menos um produto')
            return
        }
        
        console.log(documentos.docs.length === 0)
        if(documentos.docs.length === 0){
            toggleLoader();
            fieldsetAnexos.classList.add('border-red')
            toggleMessage('Anexe pelo menos um documento')
            return
        }

        const camposDesejados = ['razaoSocial', 'nomeFantasia', 'cnpj', 'inscricaoEstadual', 'inscricaoMunicipal', 'nomeContato', 'telefoneContato', 'emailContato']
        formData = new FormData(form)
        const dadosJson = {}

        for(let [chave, valor] of formData.entries()){
            if(camposDesejados.includes(chave)){
            dadosJson[chave] = valor
        }
        }

        dadosJson.produtos = carrinho.itens.map(item => ({
            indice: item.indice,
            descricaoProduto: item.description,
            unidadeMedida: item.undMed,
            qtdeEstoque: item.qntEstoq,
            valorUnitario: item.valorUnid,
            valorTotal: item.valorTotal
        }))

        dadosJson.anexos = documentos.docs.map(item => ({
            indice: item.indice,
            nomeArquivo: item.nomeArquivo,
            blobArquivo: item.blobArquivo
        }))

        console.log(dadosJson)

        sessionStorage.setItem('jsonForm', JSON.stringify(dadosJson))

        setTimeout(() => {
            toggleLoader();
        }, 1000);
    }

    if(el == btnInclude) btnAddProduct.removeAttribute('data-bs-dismiss'); 
    
    if(el === btnAddProduct) criarProduto()

})

function validateInputsFornecedor(){
    let boolean = true
    if(!addClassValid(razaoSocial)) boolean = false   
    if(!addClassValid(cnpj)) boolean = false
    if(!addClassValid(nomeFantasia)) boolean = false
    if(!addClassValid(nomeFantasia)) boolean = false
    if(!addClassValid(address)) boolean = false
    if(!addClassValid(number)) boolean = false
    if(!addClassValid(neighborhood)) boolean = false
    if(!addClassValid(region)) boolean = false
    if(!addClassValid(city)) boolean = false
    if(!addClassValid(contactPerson)) boolean = false
    if(!addClassValid(tel)) boolean = false
    if(!addClassValid(email)) boolean = false

    return boolean
}

function addClassValid(input){
    
    if(!input.validity.valid){   
        input.classList.remove('is-valid')
        input.classList.add('is-invalid')
     return false
    }
    if(input.validity.valid){
        input.classList.remove('is-invalid')
        input.classList.add('is-valid')
        return true
    }
}

cepInput.addEventListener('keypress', e => {
    const onlyNumbers = /[0-9]/ 
    const key = e.key
    
    if(!onlyNumbers.test(key)){
        e.preventDefault()
        return
    }
})

cepInput.addEventListener('keyup', e => {
    const cepValue = e.target.value.replace('-','')
    
    if(cepValue.length === 8){
        getAddress(cepValue)
    }
})

async function getAddress(cep){
    toggleLoader()
    
    cepInput.blur()
    
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

    const data = await response.json()
    
    if(data.erro === true){
        toggleLoader()
        toggleMessage("CEP inválido")
        cepInput.classList.remove('is-valid')
        cepInput.classList.add('is-invalid')
        return false
    }
    
    address.value = data.logradouro
    city.value = data.localidade
    neighborhood.value = data.bairro
    region.value = data.uf
    cepInput.classList.remove('is-invalid')
    cepInput.classList.add('is-valid')
    toggleLoader();
}

const toggleLoader = () => {

    fadeElement.classList.toggle('hide')
    loaderElement.classList.toggle('hide')
}

const toggleMessage = (msg) => {
    const messageElement = document.querySelector('#message')
    
    const messageElementText = document.querySelector('#message p')
    
    messageElementText.innerText =  msg
    
    fadeElement.classList.toggle('hide')
    messageElement.classList.toggle('hide')
}

closeButton.addEventListener("click", () => toggleMessage())

function createJson(){
    
}

class Produto{
    constructor(indice, description, undMed, qntEstoq, valorUnid){
        this.indice = indice
        this.description = description
        this.undMed = undMed
        this.qntEstoq = qntEstoq
        this.valorUnid = valorUnid
        this.valorTotal = qntEstoq * valorUnid
    }
}

const xModal = document.querySelector('.x-modal')
let indice = 0
function criarProduto(){
    let boolean = true
    const descriptionInput = document.querySelector('#description')
    const undInput = document.querySelector('#und')
    const qtdeInput = document.querySelector('#qtde')
    const valueunInput = document.querySelector('#value-un')

    if(!addClassValid(descriptionInput)) boolean = false
    if(!addClassValid(undInput)) boolean = false
    if(!addClassValid(qtdeInput)) boolean = false
    if(!addClassValid(valueunInput)) boolean = false

    btnAddProduct.removeAttribute('data-bs-dismiss'); 
    if(!boolean){
        return
    }

    btnAddProduct.setAttribute('data-bs-dismiss', 'modal');

    const produto = new Produto(indice = 1, descriptionInput.value, undInput.value, qtdeInput.value, valueunInput.value)
    carrinho.adicionarItem(produto)
    carrinho.exibirEAtualizarCarrinho()
    xModal.click()
}
 
class Carrinho{
    constructor(){
        this.itens = []
    }
    
    adicionarItem(produto){
        this.itens.push(produto)
        this.attIndice()
        this.exibirEAtualizarCarrinho();
    }

    attIndice(){
    let indice = 0
    this.itens.map(produto => {
        indice++
        produto.indice = indice
        return produto
    })

    }
    
    removerItem(produto) {
      for (let i = 0; i < this.itens.length; i++) {
          if (this.itens[i].indice === produto.indice) {
              this.itens.splice(i, 1);
              return; // Saia do loop após remover o produto correto
            }
        }
    }

    exibirEAtualizarCarrinho(){

        registeredProducts.innerHTML = '';

        for(const produto of this.itens){
            const div = document.createElement('div')
            div.classList.add('row')
            div.classList.add('mt-5')
            const produtosInfo = `
            <i class="col-1 align-self-center bi bi-trash-fill border border-dark fs-3 p-1 btnRemoveItem"
            id="trash"></i>
            <fieldset class="col-10 custom-fieldset border div-item">
                <legend class="custom-legend legend-item">Item ${produto.indice}</legend>
                <div class="row">
                    <div class="input-group row">
                        <label class="col-3 " for="description-item">Descrição do Produto: </label>
                        <input type="text" class="form-control" id="description-item" value="${produto.description}" readonly>
                    </div>
                    <div class="row d-flex align-items-end">
                        <div class="col-3">
                            <label class="form-label" for="und-item">Und. Medida</label>
                            <input class="form-control" type="text" id="und-item" value="${produto.undMed}" readonly>
                        </div>
                        <div class="col-3">
                            <label class="form-label" for="qtde-item">Qtde em Estoque</label>
                            <input class="form-control" type="number" id="qtde-item" value="${produto.qntEstoq}" readonly>
                        </div>
                        <div class="col-3">
                            <label class="form-label" for="value-un">Valor Unitário</label>
                            <input class="form-control" type="text" id="value-un-item" value="R$ ${produto.valorUnid}" readonly>
                        </div>
                        <div class="col-3">
                            <label class="form-label" for="total-item">Valor total</label>
                            <input class=" form-control" type="text" id="total-item" value="R$ ${produto.valorTotal}" disabled>
                        </div>
                    </div>
                </div>
            </fieldset>
            `
                
            div.innerHTML = produtosInfo
            registeredProducts.appendChild(div)

            const btnRemoveItem = div.querySelector('.btnRemoveItem');
            btnRemoveItem.addEventListener('click', () => {

                this.removerItem(produto);
                this.attIndice()
                this.exibirEAtualizarCarrinho();
              });
        }
        
   
    }
}

const carrinho = new Carrinho()
carrinho.exibirEAtualizarCarrinho();

class Documento{
    constructor(indice, nomeArquivo, blobArquivo){
        this.indice = indice
        this.nomeArquivo = nomeArquivo
        this.blobArquivo = blobArquivo
    }
}

class Documentos{
    constructor(){
        this.docs = []
    }

    adicionarItemDoc(documento){
        this.docs.push(documento)
        this.attIndiceDoc()
        this.exibirEAtualizarDocumentos()
        documentos.salvarSessionStorage()
    }
    
    attIndiceDoc(){
        let indice = 0
        this.docs.map(documento => {
            indice++
            documento.indice = indice
            return documento
        })
    }

    removerItemDoc(documento) {
      for (let i = 0; i < this.docs.length; i++) {
          if (this.docs[i].nomeArquivo === documento.nomeArquivo) {
              this.docs.splice(i, 1);
              return; // Saia do loop após remover o produto correto
            }
        }
    }

    salvarSessionStorage(){
        const jsonDocs = JSON.stringify(this.docs)
        sessionStorage.setItem('files', jsonDocs)
    }

    removerSessionStorage(indice){
        indice--
        let dadosSession = sessionStorage.getItem('files')
        dadosSession = JSON.parse(dadosSession)
        
        dadosSession.splice(indice, 1)
        this.attIndiceDoc()
        sessionStorage.clear()
        this.salvarSessionStorage()
    }

    exibirEAtualizarDocumentos(){

        divDocuments.innerHTML = '';

        for(const documento of this.docs){
            const div = document.createElement('div')
            div.classList.add('doc-item')
            div.classList.add('d-flex')
            div.classList.add('align-items-center')
            const docsInfo = `
                <i class="bi bi-trash btn-remove-doc"></i>
                <i class="bi bi-eye btn-download"></i>
                <span class="align-self-center" id="doc-name">${documento.nomeArquivo}</span>
            `
                
            div.innerHTML = docsInfo
            divDocuments.appendChild(div)

            const btnRemoveDoc = div.querySelector('.btn-remove-doc');
            btnRemoveDoc.addEventListener('click', () => {
                this.removerItemDoc(documento);
                this.removerSessionStorage(documento.indice)
                this.attIndiceDoc()
                this.exibirEAtualizarDocumentos();
            });

            const btnDownload = div.querySelector('.btn-download')
            btnDownload.addEventListener('click', function(){
                download()(documento.blobArquivo, documento.nomeArquivo)
             })
        }
    }
}

const divDocuments = document.querySelector('.div-documents')
const inputDocumento = document.querySelector('#file-input')

let conteudo = ''
let nomeArq = ''

inputDocumento.addEventListener('change', function(){
    if (this.files && this.files.length > 0) fieldsetAnexos.classList.remove('border-red')

    const arquivo = this.files[0]
    const reader = new FileReader()

    reader.addEventListener('load', function(){
        conteudo = reader.result
        const blob = new Blob([conteudo], {type: 'octet/stream'})
        nomeArq = arquivo.name
        const documento = new Documento(indice = 1, nomeArq, blob)
        documentos.adicionarItemDoc(documento)
    })

    if(arquivo){
        reader.readAsArrayBuffer(arquivo);
    }

})

const download = function(){
    const a = document.createElement('a')
    a.style = 'display: none'
    document.body.appendChild(a)
    return function(blob, nomeArquivo){
        const url = window.URL.createObjectURL(blob)
        a.href = url
        a.download = nomeArquivo
        a.click()
        window.URL.revokeObjectURL(url)
    }
}


const documentos = new Documentos()