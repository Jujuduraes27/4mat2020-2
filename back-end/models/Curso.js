const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    nome: {
        type: String,
        required: true // atributo obrigatório
    },
    carga_horária: {
     type: Number, 
     required: true, 
     min: 4,
     max: 240, 
     default: 100 // valor padrão
    },
    nivel: {
      type: String,
      required: true,
      // conjunto de valores válidos
      enun: ['Básico','Intermediário','Avançado']

    },  
    valor_curso:{
        type: Number,
        required: true,
        min:50 
    }
})
// PARÂMETROS DO mongoose.model()
// 1º -> Nome do model (inicial maiúscula, igual ao nome do arquivo)
// 2º -> a constante esquema, montada anteriormente
// 3º -> o nome da COLEÇÃO no BD que irá receber os objetos que serão
//    criados a partir deste model (inicial minúscula, plural do
//    nome do model)
module.exports = mongoose.model('Curso',esquema,'cursos')