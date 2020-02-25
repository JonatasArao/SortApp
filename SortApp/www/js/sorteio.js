"use strict";
var SortApp;
(function (SortApp) {
    var Sorteio = /** @class */ (function () {
        function Sorteio() {
            this.pessoas = [];
        }
        Sorteio.prototype.getPessoas = function () {
            return this.pessoas;
        };
        Sorteio.prototype.addPessoa = function (pessoa) {
            this.pessoas.push(pessoa);
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
