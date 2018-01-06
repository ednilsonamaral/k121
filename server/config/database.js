const Mongoose = require('mongoose')

const connections = {
  'dev': 'mongodb://localhost/amigoSecretoDev',
  'hom': 'mongodb://localhost/amigoSecretoHom',
  'prod': 'mongodb://localhost/amigoSecretoProd'
}

Mongoose.Promise = global.Promise

Mongoose.connect(connections['dev'])
const db = Mongoose.connection

db.on('open', function () {
  console.log('Conexão com o banco de dados realizada com sucesso!')
})
db.on('error', console.error.bind(console, 'Erro na conexão com o banco de dados!'))

exports = db
