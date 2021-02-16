/// <reference types="cypress"/>

describe('Work with basics elements', ()=>{
    //antes de executar os testes abaixo execute esse trecho
    before(()=>{
        cy.visit('http://www.wcaquino.me/cypress/componentes.html')
    })
    //antes de cada teste executa esse trecho
    beforeEach(()=>{
        cy.reload()
    })

    it('using jquery' , () =>{
        cy.get(':nth-child(1) > :nth-child(3) > [type="button"]')
        //navega entre os elementos pelas tags html utilizando a busca jquery
        cy.get('table#tabelaUsuarios tbody >tr:eq(0) td:nth-child(3)')

        cy.get('[onclick*=\'Francisco\']')
        cy.get("[onclick*='Francisco']")
        cy.get('#tabelaUsuarios td:contains(\'Doutorado\'):eq(0) ~ td:eq(3) > input')
        cy.get('#tabelaUsuarios tr:contains(\'Doutorado\'):eq(0) td:eq(6) input')
    })

    it('using xpath', () => {
        cy.xpath('//input[contains(@onclick, \'Francisco\')]')
        cy.xpath("//table[@id='tabelaUsuarios']//td[contains(., 'Francisco')]/..//input[@type='text']")
        cy.xpath("//td[contains(., 'Usuario A')]/following-sibling::td[contains(., 'Mestrado')]/..//input[@type='text']").type('funciona')
    })
})
