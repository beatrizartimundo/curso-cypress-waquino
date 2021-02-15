/// <reference types="cypress"/>

describe('Work with basics elements', ()=>{
    //antes de executar os testes abaixo execute esse trecho
    // before(()=>{
    //     cy.visit('http://www.wcaquino.me/cypress/componentes.html')
    // })
    //antes de cada teste executa esse trecho
    beforeEach(()=>{
        cy.visit('http://www.wcaquino.me/cypress/componentes.html')
    })

    it('Text', () => {
        //cy.visit('http://www.wcaquino.me/cypress/componentes.html')
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })

    it('Links', () =>{
        //cy.visit('http://www.wcaquino.me/cypress/componentes.html')
        cy.get('a').first().click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        cy.reload()
        cy.get('#resultado').should('have.text', 'Status: Nao cadastrado')
        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
    })
    it('TextFields', ()=>{

        cy.get('#formNome').type("Maria")
        cy.get('#formNome').should('have.value', "Maria")

        cy.get('#elementosForm\\:sugestoes')
            .type('textarea')
            .should('have.value', 'textarea')

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
            .type('???')

        cy.get('[data-cy=dataSobrenome]')
            .type('Testes{backspace}{backspace} Silva')
            .should('have.value', 'Test Silva')

        cy.get('#elementosForm\\:sugestoes')
            .clear()    
            .type('Erro{selectall}acerto',{delay:100})
            .should('have.value', 'acerto')



    })

    it('RadioButton', ()=>{
        cy.get('#formSexoFem')
            .click()
            .should('be.checked')

        cy.get('#formSexoMasc')
            .should('not.be.checked')

        cy.get("[name='formSexo']").should('have.length',2)
    })

    it('Checkbox', () =>{
        cy.get('#formComidaPizza')
            .click()
            .should('be.checked')

        cy.get('[name=formComidaFavorita]').click({multiple:true})
        cy.get('formComidaPizza').should('not.be.checked')
        cy.get('#formComidaCarne').should('be.checked')
    })

    it('Combobox', () =>{
        cy.get('[data-test=dataEscolaridade]')
            .select('mestrado')
            .should('have.value', 'mestrado')

            //validar as opções que estão dentro do combo
            cy.get('[data-test=dataEscolaridade] option')
                .should('have.length', 8)
            cy.get ('[data-test=dataEscolaridade] option').then($arr =>{
                // guarda os elementos nesse array
                const values = []
                $arr.each(function () {
                    values.push(this.innerHTML)
                })
                expect(values).to.include.members(["Superior","Mestrado"])
            })
    })

    it.only('MultipleCombo',()=>{
        cy.get('[data-testid=dataEsportes]')
            .select(['natacao','Karate'])

            //todo validar opções do combo multiplo

        cy.get('[data-testid=dataEsportes]').then($el =>{
            expect($el.val()).to.be.deep.equal(['natacao','Karate'])
            expect($el.val()).to.have.length(2)
        })   
        cy.get('[data-testid=dataEsportes]')
            .invoke('val')
            .should('eql',['natacao','Karate'])
    })

})





// describe('Work with basics elements', ()=>{
//    // antes de executar os testes abaixo execute esse trecho
//     before(()=>{
//         cy.visit('http://www.wcaquino.me/cypress/frame.html')
//     })
//     it('externo', () =>{
//     })

// })