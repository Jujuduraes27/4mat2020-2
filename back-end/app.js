var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const db = require('./config/database')
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const dbName = process.env.DB_NAME
db(`mongodb+srv://${dbUser}:${dbPass}@cluster0.mm1tc.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`)
var app = express();

const cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/users', usersRouter);
const teste = require(`./routes/teste`)
app.use(`/teste`,teste)

// Rota para curso
const curso = require('./routes/curso')
app.use('/curso',curso)

//Rota para professor
const professor = require('./routes/professor')
app.use('/professor',professor)

//Rota para sala de aula
const sala_aula = require('./routes/sala_aula')
app.use('/sala-aula',sala_aula)

//Rota para Turma
const turma = require('./routes/turma')
app.use('/turma',turma)
module.exports = app;

//Rota para Cliente
const cliente = require('./routes/cliente')
app.use('/cliente',cliente)

//Rota para Entregador
const entregador = require('./routes/entregador')
app.use('/entregador',entregador)

//Rota para Funcionario
const funcionario = require('./routes/funcionario')
app.use('/funcionario',funcionario)

//Rota para pedido
const pedido = require('./routes/pedido')
app.use('/pedido',pedido)

//Rota para Produto
const produto = require('./routes/produto')
app.use('/produto',produto)