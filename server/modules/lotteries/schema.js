const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const FUNCTIONS = require('../../helpers/functions')

const _schema = {
  partyId: { type: Schema.Types.ObjectId, required: true, ref: 'Party' },
  nome: { type: String, required: true, uppercase: true },
	email: { type: String, lowercase: true, required: true },
  amigoSorteadoId: { type: Schema.Types.ObjectId, ref: 'Lottery' },
  createdAt: { type: Date },
	updatedAt: { type: Date }
}

const LotterySchema = new Schema(_schema)

module.exports = LotterySchema
