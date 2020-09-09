/*
QUATRO OPERAÇÕES BÁSICAS DE DADOS
1) CREATE(criação ou inserção)
criar um novo objeto dentro da coleção.
2) RETRIEVE (recuperação e listagem)
permite recuperar os objetos a partir do BD.
3) UPDATE(atualização)
Alterar os dados de um objeto que JÁ EXISTE no BD
4) DELETE(exclusão)
Elimina um objeto do BD

(C)reate + (R)etrieve + (U)pdate + (D)elete = CRUD
VERBOS HTTP ASSOCIADOS AS OPERÇÕES CRUD

Verbo  Operação
POST   Create
GET    Retrieve
PUT    Update
DELETE  Delete

*/
//Importar o model para dentro do controller
const Curso = require('../models/Curso')
const controller = {} // objeto vazio

//metodo novo(), implementando a operação CREATE
controller.novo = async (req,res) =>{
    try{
    //Envia os dados dentro de req.body  para o BD para criação
    await Curso.create(req.body)
    //HTTP 201: Created
    res.status(201).end()
    }
    catch(erro){
        console.error(erro)
        //HTTP 500: Irternet Server Error
        res.status(500).send(erro)
    }
}
module.exports = controller
