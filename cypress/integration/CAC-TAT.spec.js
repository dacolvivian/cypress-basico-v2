/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    //Exercício 1- Aula 2
    beforeEach(function() {
        cy.visit ('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  
    })

    it('Preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste.'
       //Exercício Extra 1- Aula 2 
        cy.get('#firstName').type('Vivian')
        cy.get('#lastName').type('Dacol')
        cy.get('#email').type('qavivian@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})//Zeramos o delay de 10 ms para 0, assim o texto grande é colado rapidamente;
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    //Exercício Extra 2- Aula 2
        cy.get('#firstName').type('Vivian')
        cy.get('#lastName').type('Dacol')
        cy.get('#email').type('qavivian@gmail,com')//e-mail inválido
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('campo telefone continua vazio quando prenchido com um valor não-numérico', function(){
     //Exercício Extra 3- Aula 2 
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value', '') //encadeamento da função

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    //Exercício Extra 4- Aula 2
        cy.get('#firstName').type('Vivian')
        cy.get('#lastName').type('Dacol')
        cy.get('#email').type('qavivian@gmail.com')
        cy.get('#phone-checkbox').check()//marquei o checkbox 'telefone' o que torna o campo obrigatório, porém não preenchi o mesmo.
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it ('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
     //Exercício Extra 5- Aula 2
        cy.get('#firstName')
        .type('Vivian')
        .should('have.value','Vivian')
        .clear()
        .should('have.value', '')

        cy.get('#lastName')
        .type('Dacol')
        .should('have.value','Dacol')
        .clear()
        .should('have.value', '')

        cy.get('#email')
        .type('qavivian@gmail.com')
        .should('have.value','qavivian@gmail.com')
        .clear()
        .should('have.value', '')

        cy.get('#phone')
        .type('11973744077')
        .should('have.value', '11973744077')
        .clear()
        .should('have.value', '') 
        
        cy.get('#open-text-area')//Campo a mais incluido.
        .type('Estou com problemas e preciso de ajuda para resolve-los.')
        .should('have.value', 'Estou com problemas e preciso de ajuda para resolve-los.')
        .clear()
        .should('have.value', '')
    
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function (){
    //Exercício Extra 6- Aula 2
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
    //Exercício Extra 7- Aula 2
         cy.fillMandatoryFieldsAndSubmit()//Comando customizado recem criado: preenche os campos obrigatórios e submete o formulário.
         cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function (){
    //Exercício 1- Aula 3
         cy.get('#product')
         .select('YouTube')
         .should('have.value', 'youtube')//Letra minuscula, pois estamos validando o valor e não o texto (no html o campo valor está minusculo)
    
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
    //Exercício Extra 1- Aula 3
        const mento = 'mentoria'// criação de variável pois o valor do select e da verificação são iguais
         cy.get('#product')
         .select(mento)
         .should('have.value', mento)
    })

     it('seleciona um produto (Blog) por seu índice', function(){
    //Exercício Extra 2- Aula 3
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')//No elemento 2 sempre deve passar como está no campo 'valor' do html.

     })

     it('marca o tipo de atendimento "Feedback"', function(){
    //Exercício 1- Aula 4
        cy.get('input [type="radio"], [value="feedback"]')
        .check()
        .should('have.value', 'feedback')
     
     })
     it('marca cada tipo de atendimento', function(){
  
        cy.get('input[type="radio"]')
          .should('have.length', 3)//Verifica se tem três opções.
          .each(function($radio) {//O each recebe uma função de callback que recebe como parâmetro cada um dos elementos que foi selecionado.
            cy.wrap($radio).check()// Empacotar
            cy.wrap($radio).should('be.checked')

          })
         
     })
    it('marca ambos checkboxes, depois desmarca o último', function(){
    //Exercício- Aula 5
        cy.get('input[type="checkbox"]')
        .check()//Quando tem mais de um elemento, ele seleciona todos. 
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
            
       })
     
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {//.should está passando como argumento o elemento input que pegamos no get.
            expect($input[0].files[0].name).to.equal('example.json')//Verificação de que o primeiro elemento retornado do input (o objeto files) é igual ao example.json

        })


    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json',{action:'drag-drop'})
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
    })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')//Pegar a fixture como 'example' e dando o nome como'sampleFile'> meu 'alias'.
        cy.get('input[type="file"]')
          .selectFile('@sampleFile')//Quando passa o alias, precisa inserir o @// Ao inves de passar todo o caminho, informamos o alias dado
          .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
    })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        
        cy.get('#privacy a').should('have.attr', 'target', '_blank')//Pegamos o link que está dentro do id privacy e verificamos que ele tem o target blank, ou seja, irá abrir em outra aba, pois o elemento que tem o target blank abre nova aba.


    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')//Nossa TAG a (explicação na aula) está dentro do elemento com id privacy.
          .invoke('removeAttr', 'target')//Removendo esse atributo a pagina de privacidade é aberta na mesma aba dos testes.
          .click()

        cy.contains('Talking About Testing').should('be.visible')//Sendo assim é possível fazer uma validação.
    })

    
})
