const FUNCTIONS = require('../../helpers/functions')

const PartyModel = require('./model')

// Criar o evento
const create = (request, reply) => {
  const newParty = request.payload
  newParty.createdAt = FUNCTIONS.getCurrentDateWithoutTimezone()
  newParty.dataEvento = FUNCTIONS.getCurrentOnlyDate()

  const testePar = newParty.numPessoas % 2
  if (testePar == 0) {
    PartyModel.create(newParty, (err, data) => {
      if (err) {
        return FUNCTIONS.objResponse(reply, 401, true, err, 'Erro ao cadastrar uma nova festa de Amigo Secreto!')
      }

      if (data) {
        return FUNCTIONS.objResponse(reply, 201, false, data, 'Nova festa de Amigo Secreto cadastrado com sucesso!')
        return console.log('data: ', data)
      }
    })
  } else {
    return FUNCTIONS.objResponse(reply, 401, true, [], 'Informe um número par para criar uma nova festa de Amigo Secreto!')
  }
}

module.exports = {
  create
}
