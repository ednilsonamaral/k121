const Hapi = require('hapi'),
      server = new Hapi.Server(),
      HapiRouter = require('hapi-router'),
      CONSTANTS = require('./helpers/constants'),
      db = require('./config/database');

server.connection({
  host: 'localhost',
  port: process.env.PORT || 4040,
  routes: { cors: true }
})

const LotteryRoutes = require('./modules/lotteries/routes')
const PartyRoutes = require('./modules/party/routes')

server.route(LotteryRoutes)
server.route(PartyRoutes)

server.start((err) => {
	if (err) {
		throw err
	}

	console.log(`Servidor rodando em ${server.info.uri}`)
})
