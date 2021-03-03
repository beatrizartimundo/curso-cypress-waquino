/// <reference types="cypress"/>



describe('Work with alerts', ()=>{
    
    beforeEach(()=>{
        cy.visit('http://barrigareact.wcaquino.me')
    })

    it('should try to register an existent user', () =>{
        cy.get(':nth-child(2) > .nav-link').click()
        cy.get('.jumbotron > :nth-child(1) > .form-control').type('Seu madruga pagador')
        cy.get('.input-group > .form-control').type('madruga@uol.com.br')
        cy.get(':nth-child(3) > .form-control').type('madruga123')
        cy.get('.btn').click({timeout:8000})
        cy.get('.toast-message').should('have.text',"Erro: Error: Request failed with status code 500")
    })
    it('should create a new user', () =>{
        const random = Math.random()

        cy.get(':nth-child(2) > .nav-link').click()
        cy.get('.jumbotron > :nth-child(1) > .form-control').type('Seu madruga pagador')
        cy.get('.input-group > .form-control').type(`${random}@uol.com`)
        cy.get(':nth-child(3) > .form-control').type('madruga123')
        cy.get('.btn').click({timeout:8000})
        cy.get('.toast-message').should('have.text',"Usuário adicionado com sucesso")
        
    })
    it('should login with sucess', ()=>{
        cy.get('.input-group > .form-control').type('madruga@uol.com.br')
        cy.get(':nth-child(2) > .form-control').type('madruga123')
        cy.get('.btn').click()
        cy.get('.toast-message').should('have.text','Bem vindo, Seu madruga pagador!')

    })
    
})