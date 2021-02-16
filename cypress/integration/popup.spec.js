/// <reference types="cypress"/>



describe('Popup', ()=>{
   
    it("testar popup diretamente", () =>{
        cy.visit('http://www.wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        cy.on('window:alert', msg =>{
            expect(msg).to.be.equal('Click OK!')
        })
     })

    it("Deve verificar se o popup foi invocado", () =>{
        cy.visit('http://www.wcaquino.me/cypress/componentes.html')
        cy.window().then(win =>{
            cy.stub(win,'open').as('winOpen')
        })
        // esta fazendo a chamada, clicando
        cy.get('#buttonPopUp').click()
        // pega o que esta no stub
        cy.get('@winOpen').should('be.called')
        
            })
        
   

    describe('popup externo' , () => {
        
            beforeEach(() =>{
                cy.visit('http://www.wcaquino.me/cypress/componentes.html')
            })
            it('check popup url', () =>{
            cy.contains('Popup2')
                .should('have.prop', 'href')
                .and('equal', 'http://www.wcaquino.me/cypress/frame.html')
            })
        it('should acess popoup dinamically', () =>{
        //    pegando a url dinamicamente
            cy.contains('Popup2').then($a =>{
                const href = $a.prop('href')
                cy.visit(href)
                cy.get('#tfield').type('funciona')
            })
            
        })
        // mudando a forma de exibição da dom de nova pagina para mesma pagina
        it('should force link load on same page', () => {
            cy.contains('Popup2')
            .invoke('removeAttr', 'target')
            .click()
            cy.get('#tfield').type('funciona')

        })

    })

})