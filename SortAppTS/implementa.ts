namespace SortApp {
    document.addEventListener('DOMContentLoaded', function () {
        // Instanciando Classe de Sorteio
        let Sorteador = new Sorteio;

        // Botão - Cadastrar Pessoa
        let cadastrarPessoa = < HTMLButtonElement > document.getElementById("cadastrarPessoa");
        // Ação - Cadastrar Pessoa
        cadastrarPessoa.addEventListener('click', function () {
            let nome = ( < HTMLInputElement > document.getElementById('nomePessoa')).value;
            let idade = ( < HTMLInputElement > document.getElementById('idadePessoa')).value;
            let perfil = ( < HTMLTextAreaElement > document.getElementById('perfilPessoa')).value;
            let pessoa = new Pessoa(nome, parseInt(idade), perfil);
            Sorteador.addPessoa(pessoa);
        });

        // Botão - Modal Cadastrar Pessoa
        let btnCadastrarModalPessoa = < HTMLButtonElement > document.getElementById("btnCadastrarModalPessoa"); 
        // Ação - Modal Cadastrar Pessoa
        btnCadastrarModalPessoa.addEventListener('click', function () {
            ( < HTMLInputElement > document.getElementById('nomePessoa')).value = '';
            ( < HTMLInputElement > document.getElementById('idadePessoa')).value = '';
            ( < HTMLTextAreaElement > document.getElementById('perfilPessoa')).value = '';
        });

        // Botão - Mostrar Pessoas
        let mostrarPessoas = < HTMLButtonElement > document.getElementById("btnMostrarPessoas");
        // Ação - Mostrar Pessoas
        mostrarPessoas.addEventListener('click', function () {
            let mostrandoPessoas = < HTMLDivElement > document.getElementById('mostrandoPessoas');
            let pessoas = Sorteador.getPessoas();
            if (pessoas.length > 0) {
                let listaPessoas = '';
                pessoas.forEach(function (pessoa, index) {
                    listaPessoas += `
                <div class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">` + pessoa.getNome() + `</h5>
                        <small class="text-muted">` + pessoa.getIdade() + ` ano(s)</small>
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                        <p class="mb-1">
                            ` + pessoa.getPerfil() + `
                        </p>
                        <div>
                            <button type="button" data-dismiss="modal" data-toggle="modal" data-target="#editarModalPessoa" class="btn btn-primary rounded-circle editarModalPessoas" value=`+ index +`><i class="fas fa-pen"></i></i></button>
                            <button type="button" data-dismiss="modal" class="btn btn-danger rounded-circle excluirPessoas" value=`+ index +`><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
               `
                })
                mostrandoPessoas.innerHTML = listaPessoas;
            }else{
                mostrandoPessoas.innerHTML = `
                <div class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">Cadastre pelo menos uma pessoa</h5>
                    </div>
                </div>
                `;
            }
            
            // Botão - Excluir Pessoas
            let excluirPessoas = document.getElementsByClassName('excluirPessoas');
            // Ação - Excluir Pessoas
            for(let i = 0; i < excluirPessoas.length; i++){
                excluirPessoas[i].addEventListener('click',function(this){
                    Sorteador.removePessoa(parseInt(this.value));
                })
            }

            // Botão para abrir modal EditarPessoas
            let editarModalPessoas = document.getElementsByClassName('editarModalPessoas');
            for(let i = 0; i < editarModalPessoas.length; i++){
                editarModalPessoas[i].addEventListener('click',function(this){
                    let btnEditarPessoas = < HTMLButtonElement > document.getElementById('editarPessoa');
                    let nomeEditarPessoa = < HTMLButtonElement > document.getElementById('nomeEditarPessoa');
                    let idadeEditarPessoa = < HTMLButtonElement > document.getElementById('idadeEditarPessoa');
                    let perfilEditarPessoa = < HTMLButtonElement > document.getElementById('perfilEditarPessoa');
                    let pessoaEditada = Sorteador.getPessoas()[i];

                    nomeEditarPessoa.value = pessoaEditada.getNome();
                    idadeEditarPessoa.value = pessoaEditada.getIdade().toString();
                    perfilEditarPessoa.value = pessoaEditada.getPerfil();
                    
                    btnEditarPessoas.value = this.value;
                })
            }
        });
        
        let editarPessoas = < HTMLButtonElement > document.getElementById('editarPessoa');
        editarPessoas.addEventListener('click', function(){
            let index = parseInt(( < HTMLButtonElement > document.getElementById('editarPessoa') ).value);
            let nome = ( < HTMLButtonElement > document.getElementById('nomeEditarPessoa') ).value;
            let idade = ( < HTMLButtonElement > document.getElementById('idadeEditarPessoa') ).value;
            let perfil = ( < HTMLButtonElement > document.getElementById('perfilEditarPessoa') ).value;

            let pessoa = new Pessoa(nome, parseInt(idade), perfil);
            Sorteador.editPessoa(index,pessoa)
        });

        // Botão - Salvar Pessoas
        let salvarPessoas = < HTMLButtonElement > document.getElementById('btnSalvarPessoas');
        // Ação - Salvar Pessoas
        salvarPessoas.addEventListener('click', function(){
            localStorage.setItem('listaPessoas', JSON.stringify(Sorteador.getPessoas()));
        });
        
        // Botão - Carregar Pessoas
        let carregarPessoas = < HTMLButtonElement > document.getElementById('btnCarregarPessoas');
        // Ação - Carregar Pessoas
        carregarPessoas.addEventListener('click', function(){
            let pessoasString = localStorage.getItem('listaPessoas');
            if(pessoasString != null){
                let pessoasArray = JSON.parse(pessoasString);
                pessoasArray.forEach(function(pessoaArray){
                    let pessoa = new Pessoa(pessoaArray.nome, parseInt(pessoaArray.idade), pessoaArray.perfil);
                    Sorteador.addPessoa(pessoa); 
                });
            }
        });

        // Botão - Sorteio de Pessoas
        let sorteio = < HTMLButtonElement > document.getElementById('btnSorteio');
        // Ação - Sorteio de Pessoas
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