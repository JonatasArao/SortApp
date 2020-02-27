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
                        <h5 class="mb-1">${pessoa.getNome()}</h5>
                        <small class="text-muted">${pessoa.getIdade()} ano(s)</small>
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                        <p class="mb-1 mostraPerfil">
                            ${pessoa.getPerfil()}
                        </p>
                        <div>
                            <button type="button" data-dismiss="modal" data-toggle="modal" data-target="#editarModalPessoa" class="shadow-sm btn btn-primary rounded-circle editarModalPessoas" value=${index}><i class="fas fa-pen"></i></i></button>
                            <button type="button" data-dismiss="modal" class="shadow-sm btn btn-danger rounded-circle excluirPessoas" value=${index}><i class="fas fa-trash"></i></button>
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
        
        // Botão - Editar Pessoas
        let editarPessoas = < HTMLButtonElement > document.getElementById('editarPessoa');
        // Ação - Editar Pessoas
        editarPessoas.addEventListener('click', function(){
            let index = parseInt(( < HTMLButtonElement > document.getElementById('editarPessoa') ).value);
            let nome = ( < HTMLButtonElement > document.getElementById('nomeEditarPessoa') ).value;
            let idade = ( < HTMLButtonElement > document.getElementById('idadeEditarPessoa') ).value;
            let perfil = ( < HTMLButtonElement > document.getElementById('perfilEditarPessoa') ).value;

            let pessoa = new Pessoa(nome, parseInt(idade), perfil);
            Sorteador.editPessoa(index,pessoa);
        });

        // Botão - Modal Salvar Pessoas
        let modalSalvarPessoas = < HTMLButtonElement > document.getElementById('btnModalSalvarPessoas');
        // Ação - Modal Salvar Pessoas
        modalSalvarPessoas.addEventListener('click', function(){
           ( < HTMLInputElement > document.getElementById('nomeLista') ).value = '';
        });

        // Botão - Modal Salvar Pessoas
        let ExcluirTodasPessoas = < HTMLButtonElement > document.getElementById('btnExcluirTodasPessoas');
        // Ação - Modal Salvar Pessoas
        ExcluirTodasPessoas.addEventListener('click', function(){
           Sorteador.removeTodasPessoas();
        });

        // Botão - Salvar Pessoas
        let salvarPessoas = < HTMLButtonElement > document.getElementById('btnSalvarPessoas');
        // Ação - Salvar Pessoas
        salvarPessoas.addEventListener('click', function(){
            let pessoasString = localStorage.getItem('listaPessoas');
            let nome = ( < HTMLButtonElement > document.getElementById('nomeLista') ).value;;
            let lista = Sorteador.getPessoas();
            let listaPessoas = { nome, lista }
            if(pessoasString == null){
                localStorage.setItem('listaPessoas', JSON.stringify([listaPessoas]));
            }else{
                let pessoasArray = JSON.parse(pessoasString);
                pessoasArray.push(listaPessoas);
                localStorage.setItem('listaPessoas', JSON.stringify(pessoasArray));
            }
        });

        // Botão - Mostrar Pessoas
        let modalCarregarPessoas = < HTMLButtonElement > document.getElementById("btnModalCarregarPessoas");
        // Ação - Mostrar Pessoas
        modalCarregarPessoas.addEventListener('click', function () {
            let mostrandoLista = < HTMLDivElement > document.getElementById('mostrandoSaves');
            let listaPessoasString = localStorage.getItem('listaPessoas');
            if (listaPessoasString != null) {
                let listaPessoas = '';
                let listaPessoasArray = JSON.parse(listaPessoasString);
                listaPessoasArray.forEach(function (lista, index) {
                    listaPessoas += `
                <div class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${lista.nome}</h5>
                        <div>
                            <button type="button" data-dismiss="modal" class="shadow-sm btn btn-primary rounded-circle btnCarregarPessoas" value=${index}><i class="fas fa-download"></i></button>
                            <button type="button" data-dismiss="modal" class="shadow-sm btn btn-success rounded-circle btnAtualizarPessoas" value=${index}><i class="fas fa-upload"></i></button>
                            <button type="button" data-dismiss="modal" class="shadow-sm btn btn-danger rounded-circle btnExcluirListaPessoas" value=${index}><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
               `
                })
                mostrandoLista.innerHTML = listaPessoas;

                // Botão - Carregar Lista de Pessoas
                let carregarPessoas = document.getElementsByClassName('btnCarregarPessoas');
                // Ação - Carregar Lista de Pessoas
                for(let i = 0; i < carregarPessoas.length; i++){
                    carregarPessoas[i].addEventListener('click',function(this){
                        let listaEscolhida = listaPessoasArray[parseInt(this.value)].lista;
                        listaEscolhida.forEach(function(pessoaLista){
                            let pessoa = new Pessoa(pessoaLista.nome,parseInt(pessoaLista.idade),pessoaLista.perfil);
                            Sorteador.addPessoa(pessoa);
                        });
                    });
                }

                // Botão - Carregar Lista de Pessoas
                let atualizarPessoas = document.getElementsByClassName('btnAtualizarPessoas');
                // Ação - Carregar Lista de Pessoas
                for(let i = 0; i < atualizarPessoas.length; i++){
                    atualizarPessoas[i].addEventListener('click',function(this){
                        listaPessoasArray[parseInt(this.value)].lista = Sorteador.getPessoas();
                        localStorage.setItem('listaPessoas', JSON.stringify(listaPessoasArray));
                    });
                }

                 // Botão - Excluir Lista de Pessoas
                 let excluirListaPessoas = document.getElementsByClassName('btnExcluirListaPessoas');
                 // Ação - Carregar Lista de Pessoas
                 for(let i = 0; i < excluirListaPessoas.length; i++){
                     excluirListaPessoas[i].addEventListener('click',function(this){
                         listaPessoasArray.splice(this.value, 1);
                         localStorage.setItem('listaPessoas', JSON.stringify(listaPessoasArray));
                     });
                 }
                 if(listaPessoasString == "[]"){
                    mostrandoLista.innerHTML = `
                    <div class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">Salve pelo menos uma lista</h5>
                        </div>
                    </div>
                    `;
                }
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