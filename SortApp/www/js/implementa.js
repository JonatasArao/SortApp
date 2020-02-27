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
                pessoas.forEach(function (pessoa, index) {
                    listaPessoas_1 += "\n                <div class=\"list-group-item list-group-item-action\">\n                    <div class=\"d-flex w-100 justify-content-between\">\n                        <h5 class=\"mb-1\">" + pessoa.getNome() + "</h5>\n                        <small class=\"text-muted\">" + pessoa.getIdade() + " ano(s)</small>\n                    </div>\n                    <div class=\"d-flex w-100 justify-content-between\">\n                        <p class=\"mb-1 mostraPerfil\">\n                            " + pessoa.getPerfil() + "\n                        </p>\n                        <div>\n                            <button type=\"button\" data-dismiss=\"modal\" data-toggle=\"modal\" data-target=\"#editarModalPessoa\" class=\"btn btn-primary rounded-circle editarModalPessoas\" value=" + index + "><i class=\"fas fa-pen\"></i></i></button>\n                            <button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-danger rounded-circle excluirPessoas\" value=" + index + "><i class=\"fas fa-trash\"></i></button>\n                        </div>\n                    </div>\n                </div>\n               ";
                });
                mostrandoPessoas.innerHTML = listaPessoas_1;
            }
            else {
                mostrandoPessoas.innerHTML = "\n                <div class=\"list-group-item list-group-item-action\">\n                    <div class=\"d-flex w-100 justify-content-between\">\n                        <h5 class=\"mb-1\">Cadastre pelo menos uma pessoa</h5>\n                    </div>\n                </div>\n                ";
            }
            // Botão - Excluir Pessoas
            var excluirPessoas = document.getElementsByClassName('excluirPessoas');
            // Ação - Excluir Pessoas
            for (var i = 0; i < excluirPessoas.length; i++) {
                excluirPessoas[i].addEventListener('click', function () {
                    Sorteador.removePessoa(parseInt(this.value));
                });
            }
            // Botão para abrir modal EditarPessoas
            var editarModalPessoas = document.getElementsByClassName('editarModalPessoas');
            var _loop_1 = function (i) {
                editarModalPessoas[i].addEventListener('click', function () {
                    var btnEditarPessoas = document.getElementById('editarPessoa');
                    var nomeEditarPessoa = document.getElementById('nomeEditarPessoa');
                    var idadeEditarPessoa = document.getElementById('idadeEditarPessoa');
                    var perfilEditarPessoa = document.getElementById('perfilEditarPessoa');
                    var pessoaEditada = Sorteador.getPessoas()[i];
                    nomeEditarPessoa.value = pessoaEditada.getNome();
                    idadeEditarPessoa.value = pessoaEditada.getIdade().toString();
                    perfilEditarPessoa.value = pessoaEditada.getPerfil();
                    btnEditarPessoas.value = this.value;
                });
            };
            for (var i = 0; i < editarModalPessoas.length; i++) {
                _loop_1(i);
            }
        });
        var editarPessoas = document.getElementById('editarPessoa');
        editarPessoas.addEventListener('click', function () {
            var index = parseInt(document.getElementById('editarPessoa').value);
            var nome = document.getElementById('nomeEditarPessoa').value;
            var idade = document.getElementById('idadeEditarPessoa').value;
            var perfil = document.getElementById('perfilEditarPessoa').value;
            var pessoa = new SortApp.Pessoa(nome, parseInt(idade), perfil);
            Sorteador.editPessoa(index, pessoa);
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
