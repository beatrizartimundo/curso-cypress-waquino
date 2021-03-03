import loc from './locators'

Cypress.Commands.add('acessarMenuConta',()=>{
    cy.get(loc.MENU.SETTINGS).click({force: true})
    cy.get(loc.MENU.CONTAS).click({force: true})
})

Cypress.Commands.add('inserirConta', conta =>{
    cy.get(loc.CONTAS.NOME_CONTA).type(conta)
    cy.get(loc.CONTAS.BTN_SALVAR).click({force: true})
})