angular
	.module('myApp.services', [])
	.factory('ApiService', ApiService);

function ApiService ($http, CONSTANTS) {
	var factory = {};

	// 1. Nova Festa de Amigo Secreto - POST
	factory.newParty = function (body) {
		var url = CONSTANTS.API_URL + '/party';
		console.log('url newParty: ', url);

		return $http({
			method: 'POST',
			url: url,
			headers: { 'Content-Type' : 'application/json' },
			data: body
		}).then(function(data) {
			return data;
		});
	};

	// 2. Adicionar Participante - POST
	factory.newFriend = function (id_party, body) {
		var url = CONSTANTS.API_URL + '/lottery/' + id_party;
		console.log('url newFriend: ', url);

		return $http({
			method: 'POST',
			url: url,
			headers: { 'Content-Type' : 'application/json' },
			data: body
		}).then(function(data) {
			return data;
		});
	};

	// 3. Realizar Sorteio - GET
	factory.sorteio = function (id_party) {
		var url = CONSTANTS.API_URL + '/lottery/' + id_party + '/sort';
		console.log('url sorteio: ', url);

		return $http({
			method: 'GET',
			url: url
		}).then(function (data) {
			return data;
		});
	};

	// 5. Enviar e-mails - GET
	factory.sendMail = function (id_party) {
		var url = CONSTANTS.API_URL + '/lottery/' + id_party + '/sendMail';
		console.log('url sendMail: ', url);

		return $http({
			method: 'GET',
			url: url
		}).then(function (data) {
			return data;
		});
	};

  return factory;
}
