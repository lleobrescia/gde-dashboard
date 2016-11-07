(function () {
  'use strict';

  angular
    .module('dashboard')
    .config(RouteConfig);

  RouteConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

  function RouteConfig($stateProvider, $locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('home', {
        url: 'home',
        cache: false,
        templateUrl: 'paginas/menu.html',
        controller: 'MenuController'
      })
      .state('alunos', {
        url: '/alunos',
        cache: false,
        params: {
          cadastro: null
        },
        name: 'alunos',
        templateUrl: 'app/alunos/alunos.html',
        controller: 'AlunosController',
        controllerAs: 'alunos',
        title: '- Lista de Alunos'
      })
      .state('alunosAdicionar', {
        url: '/alunos/adicionar',
        cache: false,
        templateUrl: 'app/alunos/aluno.html',
        controller: 'AlunoController',
        controllerAs: 'aluno',
        title: '- Adicionar Aluno'
      })
      .state('alunosDetails', {
        url: '/alunos/visualizar/:idAluno',
        cache: false,
        name: 'alunos',
        templateUrl: 'app/alunos/aluno.html',
        controller: 'AlunoController',
        controllerAs: 'aluno',
        title: '- Informações Sobre Aluno'
      })
      .state('professores', {
        url: '/professores',
        cache: false,
        params: {
          cadastro: null
        },
        templateUrl: 'app/professores/professores.html',
        controller: 'ProfessoresController',
        controllerAs: 'profs',
        title: '- Lista de Professores'
      })
      .state('professoresAdicionar', {
        url: '/professores/adicionar',
        cache: false,
        templateUrl: 'app/professores/professor.html',
        controller: 'ProfessorController',
        controllerAs: 'prof',
        title: '- Adicionar Professor'
      })
      .state('professoresDetails', {
        url: '/professores/visualizar/:idProf',
        cache: false,
        templateUrl: 'app/professores/professor.html',
        controller: 'ProfessorController',
        controllerAs: 'prof',
        title: '- Informações Sobre Professor'
      })
      .state('turmas', {
        url: '/turmas',
        cache: false,
        templateUrl: 'app/turmas/turmas.html',
        controller: 'TurmasController',
        controllerAs: 'turmas',
        title: '- Lista de Turmas'
      })
      .state('turmas.adicionar', {
        url: '/adicionar',
        cache: false,
        templateUrl: 'app/turmas/turma.html',
        controller: 'TurmaController',
        controllerAs: 'turma',
        title: '- Adicionar Turma'
      })
      .state('turmas.details', {
        url: '/visualizar/:idTurma',
        cache: false,
        templateUrl: 'app/turmas/turma.html',
        controller: 'TurmaController',
        controllerAs: 'turma',
        title: '- Informações Sobre Turma'
      })
      .state('comunicacao', {
        url: '/comunicacao',
        cache: false,
        templateUrl: 'app/comunicacao/comunicacao.html',
        controller: 'ComunicacaoController',
        controllerAs: 'comunicacao',
        title: '- Comunicação'
      })
      .state('usuarios', {
        url: '/usuarios',
        cache: false,
        params: {
          cadastro: null
        },
        templateUrl: 'app/usuarios/usuarios.html',
        controller: 'UsuariosController',
        controllerAs: 'usuarios',
        title: '- Usuários'
      })
      .state('usuarioAdicionar', {
        url: '/usuarios/adicionar',
        cache: false,
        templateUrl: 'app/usuarios/usuario.html',
        controller: 'UsuarioController',
        controllerAs: 'usuario',
        title: '- Adicionar Usuário'
      })
      .state('usuarioDetails', {
        url: '/usuarios/visualizar/:idUsuario',
        cache: false,
        templateUrl: 'app/usuarios/usuario.html',
        controller: 'UsuarioController',
        controllerAs: 'usuario',
        title: '- Informações Usuário'
      });
  }
})();
