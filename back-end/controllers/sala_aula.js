/*
    QUATRO OPERAÇÕES BÁSICAS SOBRE DADOS
    1) CREATE (criação ou inserção)
        Cria um novo objeto dentro da coleção
    2) RETRIEVE (recuperação ou listagem)
        Permite recuperar os objetos a partir do BD
    3) UPDATE (atualização)
        Altera os dados de um objeto que JÁ EXISTE no BD
    4) DELETE (exclusão)
        Elimina um objeto do BD
    (C)reate + (R)etrieve + (U)pdate + (D)elete = CRUD
    VERBOS HTTP ASSOCIADOS ÀS OPERAÇÕES CRUD
    Verbo       Operação
    POST        Create
    GET         Retrieve
    PUT         Update
    DELETE      Delete
*/
// Importar o model para dentro do controller
const SalaAula = require('../models/SalaAula')
const controller = {}       // Objeto vazio
// Método novo(), implementando a operação CREATE
controller.novo = async (req, res) => {
    try {
        // Envia os dados dentro de req.body para o BD para criação
        await SalaAula.create(req.body)
        // HTTP 201: Created
        res.status(201).end()
    }
    catch (erro) {
        console.error(erro)
        // HTTP 500: Internal Server Error
        res.status(500).send(erro)
    }
}
// Método listar(), implementando a operação RETRIEVE(all)
controller.listar = async (req, res) => {
    try {
        // find() sem parâmetros é para trazer tudo
        let dados = await SalaAula.find()
        res.send(dados)// Vai com status HTTP 200: OK
    }
    catch (erro) {
        console.error(erro)
        res.status(500).send(erro)
    }
}
// Metodo obterUm(), implementando a operação   RETRIEVE (ONE)
controller.obterUm = async (req, res) => {
    const id = req.params.id // Capturando o parametro id
    let obj = await SalaAula.findById(id)
    // Se o objeto vier preenchido(achou), então o retornamos  
    if (obj) res.send(obj)
    // Senão (objeto vazio), enviamos o status HTTP 404: NOT FOUND
    else res.status(404).end()
}
//Metodo atualizar(), implementando a operação UPDATE
controller.atualizar = async  (req, res) => {
    try {
        //Isolar o _id do objeto para fins de busca
        const id = req.body._id
        //Busca o ojjeto pela Id e, encontrando-a,substui o conteudo por req.body
        let obj = await SalaAula.findByIdAndUpdate(id, req.body)
        // Se encontrou e substituiu, retornamos HTTP 204; NO CONTENT    
        if (obj) res.status(204).end()
        // Caso contrario, retorna HTTP 404: HOT FOUND
        else res.status(404).end()
    }
    catch (erro) {
        console.error(erro)
        res.status(500).end()
    }
}

// Metodo excluir(), implementando a opração  DELETE  
controller.excluir = async (req,res) => {
    try{
    //Isolando o id pars exclusão
    const id = req.body._id
    let obj = await SalaAula.findByIdAndDelete(id)
    //Encontrou e excluiu
    if(obj) res.status(204).end()
    //Objeto não foi encontrado para exclusão
    else res.status(404).end()
    }
    catch(erro){
      console.error(erro)
      res.status(500).send(erro)  
    }
}

module.exports = controller