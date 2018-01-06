const _ = require('lodash')
const nodemailer = require('nodemailer')

const FUNCTIONS = require('../../helpers/functions')
const SORT = require('../../helpers/sort')

const LotteryModel = require('./model')
const PartyModel = require('../party/model')

// Adicionar os participantes
const addNewPeople = (request, reply) => {
  let partyId = request.params.id_party
  let people = request.payload

  PartyModel.findById(partyId, (err, party) => {
    if (err) {
      return FUNCTIONS.objResponse(reply, 200, true, err, 'Erro ao encontrar a sua festa de Amigo Secreto')
    }

    if (party && party !== '') {
      let partyData = party
      let numPessoas = partyData.numPessoas

      let query = { $and: [
        { "partyId": partyId },
        { "email": new RegExp('^' + request.payload.email + '$', "i") }
      ]}

      LotteryModel.find(query, (err, data) => {
        if (err) {
          return FUNCTIONS.objResponse(reply, 200, true, err, 'Erro ao encontrar a sua festa de Amigo Secreto')
        }

        if (data) {
          if (data.length == 0) {
            people.partyId = partyId
            people.createdAt = FUNCTIONS.getCurrentDateWithoutTimezone()

            LotteryModel.create(people, (err, _p) => {
              if (err) {
                return FUNCTIONS.objResponse(reply, 200, true, err, 'Erro ao encontrar a sua festa de Amigo Secreto')
              }

              if (_p) {
                return FUNCTIONS.objResponse(reply, 201, false, _p, 'Novo participante cadastrado com sucesso!')
              }
            })
          } else {
            return FUNCTIONS.objResponse(reply, 403, true, data, 'Erro ao cadastrar um novo participante. Pois o mesmo já está cadastrado nesse Amigo Secreto!')
          }
        }
      })
    }
  })
}

// Realizar o sorteio
const sort = (request, reply) => {
  let query = { "partyId": request.params.id_party }

  LotteryModel.find(query).exec().then(peoplesFounded => {
    // Gerando numeros randons para evitar participante sortear ele mesmo
    let randomArr = [];

    for (let i = 0; randomArr.length < peoplesFounded.length; i++) {
      let numeroGerado;

      do {
        numeroGerado = Math.floor(Math.random() * ( peoplesFounded.length - 0));
      } while (i == numeroGerado);

      randomArr.push(numeroGerado);
      randomArr = _.uniq(randomArr);
    }

    const sortedPeoples = _.map(peoplesFounded, (p, i) => {
      p.amigoSorteadoId = peoplesFounded[randomArr[i]]._id;
      p.updatedAt = FUNCTIONS.getCurrentDateWithoutTimezone()

      LotteryModel.findOneAndUpdate({ '_id': p._id }, p, { upsert: true }, (err, resp) => {
        if (err) {
          console.log(err);
        }
      })

      return p;
    });

    return FUNCTIONS.objResponse(reply, 200, false, peoplesFounded, 'Sorteio realizado com sucesso!')
  }).catch(e => console.log(e));
}

// Disparar e-mails
const sendMail = (request, reply) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'amiguinhosecretok121@gmail.com',
      pass: 'amiguinhoamiguinho@'
    }
  });

  let query = { "partyId": request.params.id_party }

  LotteryModel.find(query).exec().then(peoplesFounded => {
    peoplesFounded = _.keyBy(peoplesFounded, '_id');

    _.forEach(peoplesFounded, participante => {
      transporter.sendMail({
        from: '"Amigo Secreto - K121" <amigosecreto@kenoby.com>', // sender address
        to: participante.email, // list of receivers
        subject: '[Amigo Secreto - K121] O seu Amigo Secreto é..', // Subject line
        text:
          `
          Olá ${participante.nome}!

          \n\n Acabamos de sortear o nosso AMIGO SECRETO e o seu é: ${peoplesFounded[participante.amigoSorteadoId].nome}.
          Compre um presente bem legal no valor máximo de R$ 50,00!

          \n\n\n Cheers!
          `
      }, (err, info) => {
        if (err) {
          return FUNCTIONS.objResponse(reply, 200, true, err, 'Erro ao enviar os e-mails!')
        }

        if (info) {
          return FUNCTIONS.objResponse(reply, 200, false, [], 'E-mails enviados com sucesso!')
        }
      })
    });
  })
}

module.exports = {
  addNewPeople,
  sort,
  sendMail
}

// {
//   "nome": "Ednilson Amaral",
//   "email": "ednilsonamaral.ti@gmail.com"
// }
//
// {
//   "nome": "Rodrigo Amaral",
//   "email": "ednilsonamaral@live.com"
// }
//
// {
//   "nome": "Nashie Hirumitsu",
//   "email": "nashie_hiro@yahoo.com.br"
// }
//
// {
//   "nome": "João da Silva",
//   "email": "joao_amaral_92@outlook.com"
// }
