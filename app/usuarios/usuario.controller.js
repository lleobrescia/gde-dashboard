(function () {
  'use strict';

  angular
    .module('dashboard')
    .controller('UsuarioController', UsuarioController);

  UsuarioController.$inject = ['serverService', '$state', 'toastr'];
  function UsuarioController(serverService, $state, toastr) {
    var self = this;
    var idEscola = '577ffe27e371b996be608a62';

    self.edition = false;
    self.dado = {
      'Email': '',
      'IdGrupoUsuario': '',
      'Nome': '',
      'Senha': '',
      'Cpf': '',
      'Id_Escola': idEscola
    };
    //usado para quando cancelar as alteracoes feitas no self.dado
    self.dadoAux = {};
    self.request = {
      'ObjectID': '',
      'Id_Escola': idEscola
    };
    self.state = $state.current.name;

    self.Adicionar = Adicionar;
    self.Atualizar = Atualizar;
    self.GetCargo = GetCargo;

    Activate();

    ////////////////

    function Activate() {
      if ($state.params.idUsuario) {
        self.request.ObjectID = $state.params.idUsuario;
        GetDados();
      }
    }

    function Adicionar() {
      serverService.Request('CadastrarUsuarioEscola', self.dado).then(function (resposta) {
        $state.go('usuarios', { cadastro: 'OK' });
      });
    }

    function Atualizar() {
      serverService.Request('AtualizarDadosUsuarioEscola', self.dado).then(function (resposta) {
        toastr.success('Alterações Salvas!');
        self.edition = false;
      });
    }

    function GetCargo(idGrupoUsuario) {
      var retorno = '';
      switch (idGrupoUsuario) {
        case '0': retorno = 'Usuário';
          break;

        case '1': retorno = 'Administrador';
          break;

        default: retorno = '';
          break;
      }

      return retorno;
    }

    function GetDados() {
      serverService.Request('RetornarTodosUsuariosEscola', self.request).then(function (resposta) {
        self.dadoAux = self.dado = resposta[0];
      });
    }
  }
})();
