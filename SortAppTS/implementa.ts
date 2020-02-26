namespace SortApp {
    document.addEventListener('DOMContentLoaded', function () {
        let Sorteador = new Sorteio;

        let cadastrarPessoa = < HTMLButtonElement > document.getElementById("cadastrarPessoa");

        cadastrarPessoa.addEventListener('click', function () {
            var nome = ( < HTMLInputElement > document.getElementById('nomePessoa')).value;
            var idade = ( < HTMLInputElement > document.getElementById('idadePessoa')).value;
            var perfil = ( < HTMLTextAreaElement > document.getElementById('perfilPessoa')).value;
            let pessoa = new Pessoa(nome, parseInt(idade), perfil);
            Sorteador.addPessoa(pessoa);
        });

        let btnCadastrarModalPessoa = < HTMLButtonElement > document.getElementById("btnCadastrarModalPessoa");

        btnCadastrarModalPessoa.addEventListener('click', function () {
            ( < HTMLInputElement > document.getElementById('nomePessoa')).value = '';
            ( < HTMLInputElement > document.getElementById('idadePessoa')).value = '';
            ( < HTMLTextAreaElement > document.getElementById('perfilPessoa')).value = '';
        });

        let mostrarPessoas = < HTMLButtonElement > document.getElementById("btnMostrarPessoas");

        mostrarPessoas.addEventListener('click', function () {
            let mostrandoPessoas = < HTMLDivElement > document.getElementById('mostrandoPessoas');
            let pessoas = Sorteador.getPessoas();
            if (pessoas.length > 0) {
                let listaPessoas = '';
                pessoas.forEach(function (pessoa) {
                    listaPessoas += `
                <a href="#" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">` + pessoa.getNome() + `</h5>
                        <small class="text-muted">` + pessoa.getIdade() + ` ano(s)</small>
                    </div>
                    <p class="mb-1">
                        ` + pessoa.getPerfil() + `
                    </p>
                </a>
               `
                })
                mostrandoPessoas.innerHTML = listaPessoas;
            }else{
                mostrandoPessoas.innerHTML = `
                <a href="#" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">Cadastre pelo menos uma pessoa</h5>
                    </div>
                </a>
                `;
            }
        });

        let sorteio = < HTMLButtonElement > document.getElementById('btnSorteio');

        sorteio.addEventListener('click', function () {
            let pessoaSorteadaHeading = < HTMLHeadingElement > document.getElementById('pessoaSorteada');
            if (Sorteador.sortearPessoa()) {
                let pessoaSorteada = Sorteador.sortearPessoa().getNome();
                pessoaSorteadaHeading.innerHTML = pessoaSorteada;
            } else {
                pessoaSorteadaHeading.innerHTML = 'Cadastre pelo menos 1 pessoa';
            }
        });
    })

}