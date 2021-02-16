/// <reference types="cypress"/>



describe('iframe', ()=>{
   

    it("preencher campo de texto", () =>{
        cy.visit('http://www.wcaquino.me/cypress/componentes.html')
        cy.get('#frame1').then(iframe =>{
           const body = iframe.contents().find('body')
           //não esta sendo gerenciado pelo cypress para ser faz wrap

           cy.wrap(body).find('#tfield')
           .type('funciona?')
           .should('have.value', 'funciona?')
        
        cy.on('window:alert', msg =>{
            expect(msg).to.be.equal('Alert Simples')
        })
        // cy.wrap(body).find('#otherButton').click()
    })
})
    it("testar frame diretamente", () =>{
        cy.visit('http://www.wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        cy.on('window:alert', msg =>{
            expect(msg).to.be.equal('Click OK!')
        })
    })
})

