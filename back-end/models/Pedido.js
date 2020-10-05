const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    
    
    valor:{type:Number, required:true}, 
    
    cliente:{type: mongoose.ObjectId, ref:'Cliente',required:true},
    funcionario:{type: mongoose.ObjectId, ref:'Funcionario',required:true},
    entregador:{type: mongoose.ObjectId, ref:'Entregador'},
    produto:{type: mongoose.ObjectId, ref:'Produto',required:true}
    


})
// PARÂMETROS DO mongoose.model()
// 1º -> Nome do model (inicial maiúscula, igual ao nome do arquivo)
// 2º -> a constante esquema, montada anteriormente
// 3º -> o nome da COLEÇÃO no BD que irá receber os objetos que serão
//    criados a partir deste model (inicial minúscula, plural do
//    nome do model)
module.exports = mongoose.model('Pedido',esquema,'pedidos')