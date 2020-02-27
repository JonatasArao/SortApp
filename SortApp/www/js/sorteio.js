"use strict";
var SortApp;
(function (SortApp) {
    var Sorteio = /** @class */ (function () {
        function Sorteio() {
            this.pessoas = [];
        }
        Sorteio.prototype.getPessoas = function () {
            this.pessoas.sort(function (a, b) {
                return a.getNome() < b.getNome() ? -1 : (a.getNome() > b.getNome()) ? 1 : 0;
            });
            return this.pessoas;
        };
        Sorteio.prototype.addPessoa = function (pessoa) {
            this.pessoas.push(pessoa);
        };
        Sorteio.prototype.removePessoa = function (index) {
            this.pessoas.splice(index, 1);
        };
        Sorteio.prototype.editPessoa = function (index, pessoa) {
            this.pessoas[index] = pessoa;
        };
        Sorteio.prototype.sortearPessoa = function () {
            var min = 0;
            var max = Math.floor(this.pessoas.length - 1);
            var pessoaSorteada = Math.floor(Math.random() * (max - min + 1)) + min;
            return this.pessoas[pessoaSorteada];
        };
        return Sorteio;
    }());
    SortApp.Sorteio = Sorteio;
})(SortApp || (SortApp = {}));
