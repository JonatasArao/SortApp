"use strict";
var SortApp;
(function (SortApp) {
    document.addEventListener('DOMContentLoaded', function () {
        // Instanciando Classe de Sorteio
        var Sorteador = new SortApp.Sorteio;
        // Botão - Cadastrar Pessoa
        var cadastrarPessoa = document.getElementById("cadastrarPessoa");
        // Ação - Cadastrar Pessoa
        cadastrarPessoa.addEventListener('click', function () {
            var nome = document.getElementById('nomePessoa').value;
            var idade = document.getElementById('idadePessoa').value;
            var perfil = document.getElementById('perfilPessoa').value;
            var pessoa = new SortApp.Pessoa(nome, parseInt(idade), perfil);
            Sorteador.addPessoa(pessoa);
        });
        // Botão - Modal Cadastrar Pessoa
        var btnCadastrarModalPessoa = document.getElementById("btnCadastrarModalPessoa");
        // Ação - Modal Cadastrar Pessoa
        btnCadastrarModalPessoa.addEventListener('click', function () {
            document.getElementById('nomePessoa').value = '';
            document.getElementById('idadePessoa').value = '';
            document.getElementById('perfilPessoa').value = '';
        });
        // Botão - Mostrar Pessoas
        var mostrarPessoas = document.getElementById("btnMostrarPessoas");
        // Ação - Mostrar Pessoas
        mostrarPessoas.addEventListener('click', function () {
            var mostrandoPessoas = document.getElementById('mostrandoPessoas');
            var pessoas = Sorteador.getPessoas();
            if (pessoas.length > 0) {
                var listaPessoas_1 = '';
                pessoas.forEach(function (pessoa) {
                    listaPessoas_1 += "\n                <a href=\"#\" class=\"list-group-item list-group-item-action\">\n                    <div class=\"d-flex w-100 justify-content-between\">\n                        <h5 class=\"mb-1\">" + pessoa.getNome() + "</h5>\n                        <small class=\"text-muted\">" + pessoa.getIdade() + " ano(s)</small>\n                    </div>\n                    <p class=\"mb-1\">\n                        " + pessoa.getPerfil() + "\n                    </p>\n                </a>\n               ";
                });
                mostrandoPessoas.innerHTML = listaPessoas_1;
            }
            else {
                mostrandoPessoas.innerHTML = "\n                <a href=\"#\" class=\"list-group-item list-group-item-action\">\n                    <div class=\"d-flex w-100 justify-content-between\">\n                        <h5 class=\"mb-1\">Cadastre pelo menos uma pessoa</h5>\n                    </div>\n                </a>\n                ";
            }
        });
        // Botão - Salvar Pessoas
        var salvarPessoas = document.getElementById('btnSalvarPessoas');
        // Ação - Salvar Pessoas
        salvarPessoas.addEventListener('click', function () {
            localStorage.setItem('listaPessoas', JSON.stringify(Sorteador.getPessoas()));
        });
        // Botão - Carregar Pessoas
        var carregarPessoas = document.getElementById('btnCarregarPessoas');
        // Ação - Carregar Pessoas
        carregarPessoas.addEventListener('click', function () {
            var pessoasString = localStorage.getItem('listaPessoas');
            if (pessoasString != null) {
                var pessoasArray = JSON.parse(pessoasString);
                pessoasArray.forEach(function (pessoaArray) {
                    var pessoa = new SortApp.Pessoa(pessoaArray.nome, parseInt(pessoaArray.idade), pessoaArray.perfil);
                    Sorteador.addPessoa(pessoa);
                });
            }
        });
        // Botão - Sorteio de Pessoas
        var sorteio = document.getElementById('btnSorteio');
        // Ação - Sorteio de Pessoas
        sorteio.addEventListener('click', function () {
            var pessoaSorteadaHeading = document.getElementById('pessoaSorteada');
            if (Sorteador.sortearPessoa()) {
                var pessoaSorteada = Sorteador.sortearPessoa().getNome();
                pessoaSorteadaHeading.innerHTML = pessoaSorteada;
            }
            else {
                pessoaSorteadaHeading.innerHTML = 'Cadastre pelo menos 1 pessoa';
            }
        });
    });
})(SortApp || (SortApp = {}));
