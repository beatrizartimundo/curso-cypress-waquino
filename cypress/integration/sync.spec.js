/// <reference types="cypress"/>

describe('Esperas', () =>{
    
    before(()=>{
        cy.visit('http://www.wcaquino.me/cypress/componentes.html')
    })
    
    beforeEach(()=>{
        cy.reload()
    })

    it('Deve aguardar elemento estar disponivel',()=>{
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funciona')
    })

    it.only('Deve fazer retrys', () =>{
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('exist')
        
    })

    it.only('Uso do find', () =>{

        cy.get('#buttonList').click()
        cy.get('#lista li')
            .find('span')
            .should('contain','Item 1')
        cy.get('#lista li span').should('contain','Item 2')
    
        cy.get('#buttonListDOM').click()
            cy.get('#lista li')
                .find('span')
                .should('contain','Item 1')
            cy.get('#lista li span').should('contain','Item 2')
        })

        it.only('Uso do timeout', () =>{
            // cy.get('#buttonDelay').click()
            // cy.get('#novoCampo',{timeout:1000}).should('exist')
            cy.get('#buttonListDOM').click()
            cy.get('#lista li span', {timeout:3000 })
                .should('have.length',1)
            cy.get('#lista li span')
                .should('have.length',2)


        })

        it.only('click retry', () =>{
            cy.get('#buttonCount')
            .click()
            .click()
            .should('have.value', '111')
        })

        it.only('should vs then', () =>{
            cy.get('#buttonListDOM').click()
            //busca um elemento html por isso utiliza o expect 
            cy.get('#lista li span').then($el =>{
                //quando tenta fazer com o should ele vai ficar em looping
            // cy.get('#lista li span').should($el =>{    
               // .should('have.length', 1)
                expect($el).to.have.length(1)
                cy.get('#buttonList')
              }) 
            // .and('have.id','buttonListDOM')
            

        })
})