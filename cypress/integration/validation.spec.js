/// <reference types="cypress"/>



describe('Work with alerts', ()=>{
    
    before(()=>{
        cy.visit('http://www.wcaquino.me/cypress/componentes.html')
    })
    beforeEach(() => {
        cy.reload()
    })

    it("validacao cadastro" , () => {

        cy.get('#formCadastrar').click()
        cy.on('window:alert', msg => {
            console.log(msg)
            //verifica a msg
            expect(msg).to.be.equal('Nome eh obrigatorio')
        })
          
    })
    it("cadastra nome" , () =>{
        cy.get('#formNome').type("Beatriz")
        cy.get('#formCadastrar').click()
        //pega a mensagem do alert
        cy.on('window:alert', msg => {
            console.log(msg)
            //verifica a msg
            expect(msg).to.be.equal('Sobrenome eh obrigatorio')
        })
    })
    it("cadastra nome e sobrenome" , () =>{
        cy.get('#formNome').type("Beatriz")
        cy.get('[data-cy=dataSobrenome]').type("Santos")
        cy.get('#formCadastrar').click()
        //pega a mensagem do aler
        cy.on('window:alert', msg => {
            console.log(msg)
            //verifica a msg
            expect(msg).to.be.equal('Sexo eh obrigatorio')
        })
    })
    it("cadastra completo" , () =>{
        cy.get('#formNome').type("Beatriz")
        cy.get('[data-cy=dataSobrenome]').type("Santos")
        cy.get('#formSexoFem').click()
        cy.get('#formCadastrar').click()
        //pega a mensagem do alerta
        cy.get('#resultado > :nth-child(1)').should('contain' , "Cadastrado!")
    })

    it("validando mensagens", () =>{

        const stub = cy.stub().as('alerta')
        cy.on('window:alert',stub)
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))

        cy.get('#formNome').type("Beatriz")
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))
        
        cy.get('[data-cy=dataSobrenome]').type("Santos")
        cy.get('#formCadastrar').click()
        //muda o indice da msg pra navegar entre as 3
            .then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))

        cy.get('#formSexoFem').click()
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('contain' , "Cadastrado!")
    })
    
})