'use strict';

angular
  .module('myApp.controllers', [])
  .controller('HomeCtrl', HomeCtrl);

function HomeCtrl ($scope, $timeout, ApiService) {
  $scope.form = {};
  $scope.errors = [];
  $scope.success = '';

  $scope.addPessoasStatus = false;
  $scope.numMaxPessoas = 0; // o numero real de participantes
  $scope.numPessoa = 0; // qual o numero do participante que esta add no momento

  $scope.app = {
    name: 'Sorteio de Amigo Secreto',
    company: 'Kenoby',
    version: '0.0.1'
  };

  $scope.stepStart = true;
  $scope.stepOneActive = false;
  $scope.stepTwoActive = false;
  $scope.stepThreeActive = false;
  $scope.stepFourActive = false;

  $scope.welcomeMessage = 'Bem vindo ao ' + $scope.app.name + '!';

  // 1. Nova Festa de Amigo Secreto
  $scope.start = function () {
    $scope.stepStart = false;
    $scope.stepOneActive = true;
  };

  $scope.stepOneMessage = 'Primeiro, nos informe o dia do Amigo Secreto e a quantidade de participantes..';

  $scope.finishStepOne = function () {
    var body = {};

    if (!$scope.form.dataEvento) {
      $scope.errors.push({ msg: 'Você precisa preencher a DATA DO AMIGO SECRETO!' });
    } else {
      body.dataEvento = $scope.form.dataEvento;
    }

    if (!$scope.form.numPessoas) {
      $scope.errors.push({ msg: 'Você precisa preencher o NÚMERO DE PARTICIPANTES!' });
    } else {
      body.numPessoas = $scope.form.numPessoas;
      $scope.numMaxPessoas = $scope.form.numPessoas;
      $scope.numPessoa += 1;
    }

    body = angular.toJson(body);
    console.log('body: ', body);

    var newParty = ApiService.newParty(body);
    newParty.then(function (res) {
      console.log('res de newParty: ', res.data);

      if (res.status == 201 && res.data.error == false) {
        $scope.success = res.data.message;

        $scope.id_party = res.data.data._id;
        localStorage.setItem('id_party', $scope.id_party);

        $scope.form = {};

        $timeout(function () {
          $scope.success = '';
          $scope.stepOneActive = false;
          $scope.stepTwoActive = true;
          $scope.addPessoasStatus = true;
        }, 1500);
      } else {
        $scope.form = {};
        $scope.errors.push({ msg: res.data.message });
      }
    });
  };

  // 2. Adicionar Participante
  $scope.stepTwoMessage = 'Agora vamos adicionar os participantes..';
  $scope.participantes = [];

  $scope.addNext = function (numPessoaAtual) {
      var body = {};

      if (!$scope.form.nome) {
        $scope.errors.push({ msg: 'Você precisa preencher o NOME do participante!' });
      } else {
        body.nome = $scope.form.nome;
      }

      if (!$scope.form.email) {
        $scope.errors.push({ msg: 'Você precisa preencher o NOME do participante!' });
      } else {
        body.email = $scope.form.email;
      }

      body = angular.toJson(body);
      console.log('body: ', body);

      var newFriend = ApiService.newFriend($scope.id_party, body);
      newFriend.then(function (res) {
        console.log('res de newFriend: ', res.data);

        if (res.status == 201 && res.data.error == false) {
          $scope.form = {};
          $scope.numPessoa = numPessoaAtual + 1;

          if (numPessoaAtual == $scope.numMaxPessoas) {
            console.log('chegou ao fim aquiiiiii!');
            console.log('$scope.id_party aquiiiiii: ', $scope.id_party);

            $scope.form = {};
            $scope.addPessoasStatus = false;

            $scope.stepTwoActive = false;
            $scope.stepThreeActive = true;

            // 3. Realizar Sorteio
            var sorteio = ApiService.sorteio($scope.id_party);
            sorteio.then(function (res) {
              console.log('res de sorteio: ', res.data);

              if (res.status == 200 && res.data.error == false) {
                // 5. Enviar e-mails
                var sendMail = ApiService.sendMail($scope.id_party);
                sendMail.then(function (resSendMail) {
                  console.log('res de sendMail: ', resSendMail.data);

                  if (resSendMail.status == 200 && resSendMail.data.error == false) {
                    $scope.stepThreeActive = false;
                    $scope.stepFourActive = true;
                    $scope.stepFourMessage = resSendMail.data.message;
                    localStorage.removeItem('id_party');
                  }
                });
              }
            });
          }
        }
      });
  };
}
