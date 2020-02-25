"use strict";
var SortApp;
(function (SortApp) {
    var Pessoa = /** @class */ (function () {
        //Construtor
        function Pessoa(nome, idade, perfil) {
            this.nome = nome;
            this.idade = idade;
            this.perfil = perfil;
        }
        //Getters
        Pessoa.prototype.getNome = function () {
            return this.nome;
        };
        Pessoa.prototype.getIdade = function () {
            return this.idade;
        };
        Pessoa.prototype.getPerfil = function () {
            return this.perfil;
        };
        return Pessoa;
    }());
    SortApp.Pessoa = Pessoa;
})(SortApp || (SortApp = {}));
