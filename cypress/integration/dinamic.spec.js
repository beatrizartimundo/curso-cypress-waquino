/// <reference types="cypress"/>

describe('Dinamic tests', () =>{
    beforeEach(()=>{
        cy.visit('http://www.wcaquino.me/cypress/componentes.html')
    })

    const foods = ['Carne','Frango','Pizza','Vegetariano']
    foods.forEach(food => {
     

        it(`Cadastro com comida ${food}`, () =>{
            cy.get('#formNome').type('Usuario')
            cy.get('#formSobrenome').type('qualquer')
            cy.get('#formSexoFem').click()
            //busca o caminho com xpath, o precedinng sibling busca qual parte vc quer
            cy.xpath(`//label[contains(.,${food})]/preceding-sibling::input`)
            
            cy.get('#formEscolaridade').select('Doutorado')
            cy.get('#formEsportes').select('Corrida')
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
        })
    });
})