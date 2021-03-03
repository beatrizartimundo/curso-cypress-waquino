/// <reference types="cypress"/>


import loc from '../../support/locators'
import '../../support/commandsContas'


describe('Work with alerts', ()=>{
    
    before(()=>{
        cy.login('madruga@uol.com.br','madruga123')
        cy.resetApp()
        // cy.visit('http://barrigareact.wcaquino.me')
        // cy.get(loc.LOGIN.USER).type('madruga@uol.com.br')
        // cy.get(loc.LOGIN.PASSWORD).type('madruga123')
        // cy.get(loc.LOGIN.BTN_LOGIN).click()
        // cy.get(loc.MESSAGE).should('have.text','Bem vindo, Seu madruga pagador!')
    
        
            
    })
    it('should create a count', () =>{
        //vira um metodo apos add o comando personalizado
        cy.acessarMenuConta()
        // cy.get(loc.MENU.SETTINGS).click()
        // cy.get(loc.MENU.CONTAS).click()
        cy.inserirConta("Conta x")
        // cy.get(loc.CONTAS.NOME_CONTA).type("Conta x")
        // cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain','Conta inserida com sucesso')
        
    })
    it('should update a count', () =>{
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        // cy.get('tbody > tr > :nth-child(1)').should('contain','Conta fevereiro')
        // cy.get(':nth-child(2) > :nth-child(2) > .fa-edit').click()
        cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()
        cy.get(loc.CONTAS.NOME_CONTA)
        .clear()
        .type('Conta maio')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain','Conta atualizada com sucesso!')

    })
    it('should create a count with same name', () =>{
        cy.acessarMenuConta()
        cy.inserirConta('Conta maio')
        cy.get(loc.MESSAGE).should('contain','400')
    })
})