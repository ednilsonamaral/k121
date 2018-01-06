module.exports = (Model, Schema) => {
	const Mongoose = require('mongoose')
	return Mongoose.model(Model, Schema)
}
