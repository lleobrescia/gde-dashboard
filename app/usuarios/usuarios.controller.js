(function () {
  'use strict';

  angular
    .module('dashboard')
    .controller('UsuariosController', UsuariosController);

  UsuariosController.$inject = ['serverService', 'toastr', 'ListManagerService'];
  function UsuariosController(serverService, toastr, ListManagerService) {
    var self = this;
    var idEscola = '577ffe27e371b996be608a62';

    self.dado = {
      'ObjectID': '',
      'Id_Escola': idEscola
    };
    self.listUsuarios = [];
    self.usuariosSelecionados = [];

    self.DeleteUsuario = DeleteUsuario;
    self.GetCargo = GetCargo;
    self.ListManagerService = ListManagerService; // O servico eh usado no view

    Activate();

    ////////////////

    function Activate() {
      GetUsuarios();
    }

    function DeleteUsuario() {
      angular.forEach(self.usuariosSelecionados, function (item) {
        serverService.Request('RemoverUsuarioEscola', { ObjectID: item.Id }).then(function (resposta) {
        });
      });
      self.usuariosSelecionados = [];
      GetUsuarios();
      toastr.success('Usuário Removido');
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

    function GetUsuarios() {
      serverService.Request('RetornarTodosUsuariosEscola', self.dado).then(function (resposta) {
        self.listUsuarios = resposta;
        console.log(resposta);
      });
    }
  }
})();
