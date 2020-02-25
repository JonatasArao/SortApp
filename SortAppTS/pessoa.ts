namespace SortApp{
    export class Pessoa{
        //Atributos
        private nome : string;
        private idade : number;
        private perfil : string;
        
        //Construtor
        constructor(nome : string, idade : number, perfil : string){
            this.nome = nome;
            this.idade = idade;
            this.perfil = perfil;
        }

        //Getters
        getNome() : string {
            return this.nome;
        }

        getIdade() : number {
            return this.idade;
        }

        getPerfil() : string {
            return this.perfil;
        }

    }
}