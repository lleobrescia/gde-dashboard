/**
* Aluno Controller
* @namespace Controllers
*/
(function () {
  'use strict';

  angular
    .module('dashboard')
    .controller('AlunoController', AlunoController);

  AlunoController.$inject = ['serverService', 'session', 'toastr', '$state', 'SortByService'];

  /**
  * @namespace AlunoController
  * @desc Adiciona e edita informacoes de um aluno
  * @memberOf Controllers
  */
  function AlunoController(serverService, session, toastr, $state, SortByService) {
    var self = this;
    var idEscola = '577ffe27e371b996be608a62';

    self.avaliacoes = [];
    self.dadoAdicionar = {
      'Data_Nascimento': '',
      'Email_Responsavel': '',
      'Excluido': false,
      'Id_Escola': idEscola,
      'Matricula': '',
      'Nome': '',
      'SenhaAppPai': '',
      'Sexo': ''
    };
    self.dado = [];
    self.dadoAux = [];
    self.carregando = true;
    self.dataNascimento = '';
    self.edition = true;
    self.emailResponsavel = '';
    self.genero = '';
    self.graficos = [];
    self.matricula = '';
    self.nome = '';
    self.request = {
      'ObjectID': '',
      'Id_Escola': idEscola
    };
    self.requestAvaliacao = {
      'Id_Escola': idEscola,
      'Id_Turma': '',
      'Id_Aluno': ''
    };

    self.AdicionarAluno = AdicionarAluno;
    self.Atualizar = Atualizar;
    self.CancelarEdicao = CancelarEdicao;
    self.MountChart = MountChart;
    self.SortByService = SortByService //servico usado no view

    // RetornarParecerDescritivoPedagogicoAluno
    Activate();

    ////////////////

    /**
    * @namespace Activate
    * @desc Startup do controlador
    * @memberOf Controllers.AlunoController
    */
    function Activate() {
      if ($state.params.idAluno) {
        self.request.ObjectID = $state.params.idAluno;
        self.edition = false;
        GetAluno();
      }
    }

    /**
    * @namespace AdicionarAluno
    * @desc Adiciona o aluno e envia a senha para o responsavel
    * @memberOf Controllers.AlunoController
    */
    function AdicionarAluno() {
      serverService.Request('CadastrarAluno', self.dadoAdicionar).then(function (resp) {
        $state.go('alunos', { cadastro: 'OK' });
      });
    }

    /**
    * @namespace Atualizar
    * @desc Salva as informacoes editadas e envia ao servidor
    * @memberOf Controllers.AlunoController
    */
    function Atualizar() {
      serverService.Request('AtualizarDadosAluno', self.dado).then(function (resp) {
        toastr.success('Alterações Salvas!');
      });
    }

    /**
    * @namespace CancelarEdicao
    * @desc Cancela as alteracoes feitas pelo usuario
    * @memberOf Controllers.AlunoController
    */
    function CancelarEdicao() {
      self.dado = self.dadoAux;
      self.edition = false;
    }

    function MountChart(lista) {
      self.graficos = [];
      angular.forEach(lista, function (resultado) {
        var colors = [];
        var count = 1;
        var data = [];
        var descricao = [];
        var labels = [];
        var nome = resultado.CampoExperiencia;
        var respostas = [];

        angular.forEach(resultado.Itens_Resultado_Avaliacao, function (campos) {
          data.push(campos.Resposta_Value);
          descricao.push(campos.Descricao);
          labels.push('Atividade' + count);

          switch (campos.Resposta_String) {
            case 'Alcançado':
              colors.push('rgb(0, 128, 0)');
              respostas.push('Alcançado');
              break;
            case 'Em processo':
              colors.push('rgb(255, 255, 0)');
              respostas.push('Em processo');
              break;
            case 'Acima do esperado':
              colors.push('rgb(0, 0, 255)');
              respostas.push('Acima do esperado');
              break;
            case 'Não alcançado':
              colors.push('rgb(255, 0, 255)');
              respostas.push('Não alcançado');
              break;
            case 'Não avaliado':
              colors.push('rgb(255, 0, 0)');
              respostas.push('Não avaliado');
              break;

            default:
              break;
          }
          count++;
        });
        self.graficos.push({
          'nome': nome,
          'labels': labels,
          'respostas': respostas,
          'data': data,
          'dataset': {
            'pointBackgroundColor': colors,
            'pointBorderColor': colors,
            'backgroundColor': 'rgba(35, 159, 219, 0.4)',
            'borderColor': 'rgb(35, 159, 219)',
            'pointBorderWidth': 10
          },
          'options': {
            scale: {
              lineArc: true,
              ticks: {
                display: false,
                beginAtZero: true,
                min: 0,
                max: 100,
                fixedStepSize: 25
              }
            }
          },
          'descricao': descricao
        });
      });

      console.log(self.graficos);
    }

    /**
    * @namespace GetAluno
    * @desc Pega as informacoes do aluno no servidor utilizando o id da url
    * @memberOf Controllers.AlunoController
    */
    function GetAluno() {
      serverService.Request('RecuperarDadosAlunosEscola', self.request).then(function (resp) {
        self.dado = self.dadoAux = resp[0];

        self.dadoAdicionar.Data_Nascimento = self.dado.Data_Nascimento;
        self.dadoAdicionar.Email_Responsavel = self.dado.Email_Responsavel;
        self.dadoAdicionar.Matricula = self.dado.Matricula;
        self.dadoAdicionar.Nome = self.dado.Nome;
        self.dadoAdicionar.SenhaAppPai = self.dado.SenhaAppPai;
        self.dadoAdicionar.Sexo = self.dado.Sexo;

        GetAvaliacaoPedagogica();

        // console.log(self.dado);
      });
    }

    function GetAvaliacaoPedagogica() {
      self.requestAvaliacao.Id_Aluno = self.request.ObjectID;
      self.requestAvaliacao.Id_Turma = self.dado.Id_Turma;
      // console.log(self.requestAvaliacao);
      serverService.Request('RetornarDadosGraficosAvaliacaoPedagogica', self.requestAvaliacao).then(function (resp) {
        self.avaliacoes = resp[0].ResultadoAvaliacoes;
        console.log(self.avaliacoes);
      });
    }
  }
})();
