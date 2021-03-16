/// <reference types="cypress"/>


import loc from '../../support/locators'
import '../../support/commandsContas'


describe('Work with alerts', ()=>{
    
    before(()=>{
        cy.login('madruga@uol.com.br','madruga123')
        
        // cy.visit('http://barrigareact.wcaquino.me')
        // cy.get(loc.LOGIN.USER).type('madruga@uol.com.br')
        // cy.get(loc.LOGIN.PASSWORD).type('madruga123')
        // cy.get(loc.LOGIN.BTN_LOGIN).click()
        // cy.get(loc.MESSAGE).should('have.text','Bem vindo, Seu madruga pagador!')
      
            
    })
    beforeEach(()=>{
        cy.get(loc.MENU.HOME).click()
        cy.resetApp()

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
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
        cy.get(loc.CONTAS.NOME_CONTA)
        .clear()
        .type('Conta maio')
        cy.get(loc.CONTAS.BTN_SALVAR).click({force:true})
        cy.get(loc.MESSAGE).should('contain','Conta atualizada com sucesso!')

    })
    it('should create a count with same name', () =>{
        cy.acessarMenuConta()
        cy.inserirConta('Conta mesmo nome')
        cy.get(loc.MESSAGE).should('contain','400')
    })
    it('should create a movement account', () =>{
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Description')
        cy.get(loc.MOVIMENTACAO.VALOR).type('20')
        cy.get(loc.MOVIMENTACAO.ENVOLVIDO).type('desc')
        //ajustar esse ponto
        cy.get('select').select('Conta para movimentacoes')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain','sucesso')
        cy.get(loc.EXTRATO.LINHAS).should('have.length',7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA('Description','20')).should('exist')
    })
    it('should get balance', () =>{
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO('Conta para saldo')).should('contain',534)
        cy.get(loc.MENU.EXTRATO).click({force:true})
        cy.xpath(loc.EXTRATO.FN_XP_EDIT('Movimentacao 1, calculo saldo')).click()
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain','sucesso')
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO('Conta para saldo')).should('contain',534)
    })
    it('should remove a transaction', () =>{
        cy.get(loc.MENU.EXTRATO).click({force:true})
        cy.xpath(loc.EXTRATO.FN_XP_REMOVE('exclusao')).click({force:true})
        cy.get(loc.MESSAGE).should('contain', 'Movimentação removida com sucesso!')
    })
})