/// <reference types="cypress"/>

describe('Cypress basics', ()=>{

    it.only('Should visit a page and assert title', () =>{
        cy.visit('http://www.wcaquino.me/cypress/componentes.html')

        cy.title().should('be.equal','Campo de Treinamento')
        cy.title().debug().should('contain','Campo')

        cy.title()
        .should('be.equal', 'Campo de Treinamento')
        .and('contain','Campo')

        //TODO imprimir o log no console
        //escrever o titulo do texto
//para que ele não fique tentando troca should por then
       // cy.title().should(title => {
        let syncTitle
        
        cy.title().then(title => {
            console.log(title)

            cy.get('#formNome').type(title)

            syncTitle = title
        })

        cy.get('[data-cy=dataSobrenome]').then($el =>{
            $el.val(syncTitle)
        })

        cy.get('#elementosForm\\:sugestoes').then($el =>{
            cy.wrap($el).type(syncTitle)
        })
    })

    it('Should find and interact with and element', ()=>{

        cy.visit('http://www.wcaquino.me/cypress/componentes.html')
       //ao clicar no botão o conteudo tem que mudar para obrigado 
        cy.get('#buttonSimple').click()
        cy.get('#buttonSimple').should('have.value', 'Obrigado!')

    })
})