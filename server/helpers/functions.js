const Moment = require('moment'),
			CONSTANTS = require('./constants');

const getCurrentDateWithoutTimezone = () => Moment().format('YYYY-MM-DDTHH:mm:ss')
const getCurrentOnlyDate = () => Moment().format('YYYY-MM-DD')

// const objResponse = (reply, statusCode, err, data, message) => ({
// 	message: message,
// 	data: data,
// 	error: !err ? false : true,
// 	statusCode: statusCode,
// 	statusText: !err  ? 'OK' : 'NOK'
// })

const objResponse = (reply, statusCode, err, data, message) => {
	let code = 200
	if (statusCode === 201) {
		code = 201
	} else {
		code = 200
	}

	const response = reply.response({
		message: message,
		data: data,
		error: !err ? false : true,
		statusCode: statusCode,
		statusText: !err  ? 'OK' : 'NOK'
	}).code(code)

	response.type('text/json')
	response.header('X-Custom')

	return response
}

const FUNCTIONS = {
  getCurrentDateWithoutTimezone,
	getCurrentOnlyDate,
	objResponse
}

module.exports = FUNCTIONS
