const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const _schema = {
  dataEvento: { type: Date, required: true },
  numPessoas: { type: Number, required: true },
  createdAt: { type: Date },
	updatedAt: { type: Date }
}

const PartySchema = new Schema(_schema);

module.exports = PartySchema


// {
//   "dataEvento": "Thu Dec 28 2017 14:37:32 GMT-0200 (-02)",
//   "numPessoas" 40
// }
