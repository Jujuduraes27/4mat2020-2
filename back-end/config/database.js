const mongoose = require  ('mongoose')

module.exports = uri =>{
    mongoose.connect(uri,{
        useNewUrlParser: true, 
        useUnifiedTopology: true

    })
    mongoose.connection.on('connected',() =>
    console.log('==> Mongoose! conectado com sucesso ao servidor')
    ) 
    // capturamos um sinal de encerramento
    process.on('SIGINT', () =>
    mongoose.connection.close(() =>{
        console.log('==> Mongoose! Desconectado pelo término da aplicação');
        // 0 indica a finalização ocorreu sem erro
        process.exit(0)
    })
    
    )
    mongoose.connection.on('disconnected', () =>
        console.log('==> Mongoose! Desconectado do servidor')
    )
}