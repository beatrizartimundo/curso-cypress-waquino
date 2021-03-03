/// <reference types="cypress"/>



describe('Work with alerts', ()=>{
    
    before(()=>{
        cy.visit('http://www.wcaquino.me/cypress/componentes.html')
    })
    // beforeEach(() => {
    //     cy.reload()

    it('Going back to the past',()=>{
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain','25/02/2021')

        const dt = new Date(2012,3,10,15,23,50)
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain','10/04/2012')
    })

    it.only('Goes to the future', () =>{
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').then(t =>{
            const number = parseInt(t)
            cy.wrap(number).should('gt',1614250821786)
        })
        //reseta o tempo para 0 começa em 1970~
        cy.clock()
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').then(t =>{
            const number = parseInt(t)
            cy.wrap(number).should('lte',0)
        })

        // cy.wait(1000)
        // cy.get('#buttonTimePassed').click()
        // cy.get('#resultado > span').invoke('text').then(t =>{
        //     const number = parseInt(t)
        //     cy.wrap(number).should('gte',1000)
        // })

        cy.tick(5000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').then(t =>{
            const number = parseInt(t)
            cy.wrap(number).should('gte',5000)
        })


        
    })
})