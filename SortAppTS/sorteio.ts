namespace SortApp{
    export class Sorteio{
        private pessoas : Array<Pessoa> = [];

        getPessoas() : Array<Pessoa> {
            return this.pessoas;
        }

        addPessoa( pessoa : Pessoa ) : void {
            this.pessoas.push(pessoa);
        }

        sortearPessoa () : Pessoa {
           var min = 0;
           var max = Math.floor( this.pessoas.length - 1 );
           var pessoaSorteada = Math.floor( Math.random() * ( max - min + 1 ) ) + min;
           return this.pessoas[pessoaSorteada];
        }
    }
}
