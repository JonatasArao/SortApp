namespace SortApp{
    export class Sorteio{
        private pessoas : Array<Pessoa> = [];

        getPessoas() : Array<Pessoa> {
            this.pessoas.sort(function(a, b) {
                return a.getNome() < b.getNome() ? -1 : (a.getNome() > b.getNome()) ? 1 : 0;
            });
            return this.pessoas;
        }

        addPessoa( pessoa : Pessoa ) : void {
            this.pessoas.push(pessoa);
        }

        removePessoa (index : number ) : void {
            this.pessoas.splice(index, 1);
        }

        removeTodasPessoas () : void {
            this.pessoas = [];
        }

        editPessoa ( index : number, pessoa : Pessoa) : void {
            this.pessoas[index] = pessoa;
        }

        sortearPessoa () : Pessoa {
           var min = 0;
           var max = Math.floor( this.pessoas.length - 1 );
           var pessoaSorteada = Math.floor( Math.random() * ( max - min + 1 ) ) + min;
           return this.pessoas[pessoaSorteada];
        }
    }
}
