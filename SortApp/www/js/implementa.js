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
                    listaPessoas_1 += "\n                <div class=\"list-group-item list-group-item-action\">\n                    <div class=\"d-flex w-100 justify-content-between\">\n                        <h5 class=\"mb-1\">" + pessoa.getNome() + "</h5>\n                        <small class=\"text-muted\">" + pessoa.getIdade() + " ano(s)</small>\n                    </div>\n                    <div class=\"d-flex w-100 justify-content-between\">\n                        <p class=\"mb-1 mostraPerfil\">\n                            " + pessoa.getPerfil() + "\n                        </p>\n                        <div>\n                            <button type=\"button\" data-dismiss=\"modal\" data-toggle=\"modal\" data-target=\"#editarModalPessoa\" class=\"shadow-sm btn btn-primary rounded-circle editarModalPessoas\" value=" + index + "><i class=\"fas fa-pen\"></i></i></button>\n                            <button type=\"button\" data-dismiss=\"modal\" class=\"shadow-sm btn btn-danger rounded-circle excluirPessoas\" value=" + index + "><i class=\"fas fa-trash\"></i></button>\n                        </div>\n                    </div>\n                </div>\n               ";
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
        // Botão - Editar Pessoas
        var editarPessoas = document.getElementById('editarPessoa');
        // Ação - Editar Pessoas
        editarPessoas.addEventListener('click', function () {
            var index = parseInt(document.getElementById('editarPessoa').value);
            var nome = document.getElementById('nomeEditarPessoa').value;
            var idade = document.getElementById('idadeEditarPessoa').value;
            var perfil = document.getElementById('perfilEditarPessoa').value;
            var pessoa = new SortApp.Pessoa(nome, parseInt(idade), perfil);
            Sorteador.editPessoa(index, pessoa);
        });
        // Botão - Modal Salvar Pessoas
        var modalSalvarPessoas = document.getElementById('btnModalSalvarPessoas');
        // Ação - Modal Salvar Pessoas
        modalSalvarPessoas.addEventListener('click', function () {
            document.getElementById('nomeLista').value = '';
        });
        // Botão - Modal Salvar Pessoas
        var ExcluirTodasPessoas = document.getElementById('btnExcluirTodasPessoas');
        // Ação - Modal Salvar Pessoas
        ExcluirTodasPessoas.addEventListener('click', function () {
            Sorteador.removeTodasPessoas();
        });
        // Botão - Salvar Pessoas
        var salvarPessoas = document.getElementById('btnSalvarPessoas');
        // Ação - Salvar Pessoas
        salvarPessoas.addEventListener('click', function () {
            var pessoasString = localStorage.getItem('listaPessoas');
            var nome = document.getElementById('nomeLista').value;
            ;
            var lista = Sorteador.getPessoas();
            var listaPessoas = { nome: nome, lista: lista };
            if (pessoasString == null) {
                localStorage.setItem('listaPessoas', JSON.stringify([listaPessoas]));
            }
            else {
                var pessoasArray = JSON.parse(pessoasString);
                pessoasArray.push(listaPessoas);
                localStorage.setItem('listaPessoas', JSON.stringify(pessoasArray));
            }
        });
        // Botão - Mostrar Pessoas
        var modalCarregarPessoas = document.getElementById("btnModalCarregarPessoas");
        // Ação - Mostrar Pessoas
        modalCarregarPessoas.addEventListener('click', function () {
            var mostrandoLista = document.getElementById('mostrandoSaves');
            var listaPessoasString = localStorage.getItem('listaPessoas');
            if (listaPessoasString != null) {
                var listaPessoas_2 = '';
                var listaPessoasArray_1 = JSON.parse(listaPessoasString);
                listaPessoasArray_1.forEach(function (lista, index) {
                    listaPessoas_2 += "\n                <div class=\"list-group-item list-group-item-action\">\n                    <div class=\"d-flex w-100 justify-content-between\">\n                        <h5 class=\"mb-1\">" + lista.nome + "</h5>\n                        <div>\n                            <button type=\"button\" data-dismiss=\"modal\" class=\"shadow-sm btn btn-primary rounded-circle btnCarregarPessoas\" value=" + index + "><i class=\"fas fa-download\"></i></button>\n                            <button type=\"button\" data-dismiss=\"modal\" class=\"shadow-sm btn btn-success rounded-circle btnAtualizarPessoas\" value=" + index + "><i class=\"fas fa-upload\"></i></button>\n                            <button type=\"button\" data-dismiss=\"modal\" class=\"shadow-sm btn btn-danger rounded-circle btnExcluirListaPessoas\" value=" + index + "><i class=\"fas fa-trash\"></i></button>\n                        </div>\n                    </div>\n                </div>\n               ";
                });
                mostrandoLista.innerHTML = listaPessoas_2;
                // Botão - Carregar Lista de Pessoas
                var carregarPessoas = document.getElementsByClassName('btnCarregarPessoas');
                // Ação - Carregar Lista de Pessoas
                for (var i = 0; i < carregarPessoas.length; i++) {
                    carregarPessoas[i].addEventListener('click', function () {
                        var listaEscolhida = listaPessoasArray_1[parseInt(this.value)].lista;
                        listaEscolhida.forEach(function (pessoaLista) {
                            var pessoa = new SortApp.Pessoa(pessoaLista.nome, parseInt(pessoaLista.idade), pessoaLista.perfil);
                            Sorteador.addPessoa(pessoa);
                        });
                    });
                }
                // Botão - Carregar Lista de Pessoas
                var atualizarPessoas = document.getElementsByClassName('btnAtualizarPessoas');
                // Ação - Carregar Lista de Pessoas
                for (var i = 0; i < atualizarPessoas.length; i++) {
                    atualizarPessoas[i].addEventListener('click', function () {
                        listaPessoasArray_1[parseInt(this.value)].lista = Sorteador.getPessoas();
                        localStorage.setItem('listaPessoas', JSON.stringify(listaPessoasArray_1));
                    });
                }
                // Botão - Excluir Lista de Pessoas
                var excluirListaPessoas = document.getElementsByClassName('btnExcluirListaPessoas');
                // Ação - Carregar Lista de Pessoas
                for (var i = 0; i < excluirListaPessoas.length; i++) {
                    excluirListaPessoas[i].addEventListener('click', function () {
                        listaPessoasArray_1.splice(this.value, 1);
                        localStorage.setItem('listaPessoas', JSON.stringify(listaPessoasArray_1));
                    });
                }
                if (listaPessoasString == "[]") {
                    mostrandoLista.innerHTML = "\n                    <div class=\"list-group-item list-group-item-action\">\n                        <div class=\"d-flex w-100 justify-content-between\">\n                            <h5 class=\"mb-1\">Salve pelo menos uma lista</h5>\n                        </div>\n                    </div>\n                    ";
                }
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
