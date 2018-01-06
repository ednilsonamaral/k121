const CONSTANTS = require('../../helpers/constants')
const HANDLERS = require('./handlers')

const thisURI = `${CONSTANTS.URI}/party`

module.exports = [
  {
    method: 'POST',
    path: thisURI,
    handler: HANDLERS.create
  }
]
