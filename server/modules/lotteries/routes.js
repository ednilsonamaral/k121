const CONSTANTS = require('../../helpers/constants')
const HANDLERS = require('./handlers')

const thisURI = `${CONSTANTS.URI}/lottery`

module.exports = [
  {
    method: 'POST',
    path: `${thisURI}/{id_party}`,
    handler: HANDLERS.addNewPeople
  },

  {
    method: 'GET',
    path: `${thisURI}/{id_party}/sort`,
    handler: HANDLERS.sort
  },

  {
    method: 'GET',
    path: `${thisURI}/{id_party}/sendMail`,
    handler: HANDLERS.sendMail
  }
]
