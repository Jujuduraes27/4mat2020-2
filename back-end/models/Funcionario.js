const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    funcionario: {type: String,required: true},  
    cpf:{type:String, required: true, index:{unique:true}},
    rg:{type:String, required: true},
    data_nascimento:{type: Date, required:true},
    telefone:{type:String, required:true},
    valor_trabalho:{type:Number, required:true}  


})
// PARÂMETROS DO mongoose.model()
// 1º -> Nome do model (inicial maiúscula, igual ao nome do arquivo)
// 2º -> a constante esquema, montada anteriormente
// 3º -> o nome da COLEÇÃO no BD que irá receber os objetos que serão
//    criados a partir deste model (inicial minúscula, plural do
//    nome do model)
module.exports = mongoose.model('Funcionario',esquema,'funcionarios')