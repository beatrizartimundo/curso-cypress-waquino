/// <reference types="cypress"/>


describe('Helpers...', () => {

    it('Wrap',() => {
        const obj = {nome:'User', idade:20 }
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property','nome')

        cy.visit('http://www.wcaquino.me/cypress/componentes.html');
        // cy.get('#formNome').then($el => {
        //     // $el.val('funciona via jquery')
        //     cy.wrap($el).type('funciona via cypress')
        // })
        const promise = new Promise((resolve,reject)=> {
            setTimeout(()=>{
                resolve(10)
            },500)
        })

        cy.get('#buttonSimple').then(()=> console.log('Encontrei o primeiro'))
        // promise.then(num =>console.log(num))
        cy.wrap(promise).then(ret => console.log(ret))
        cy.get('#buttonList').then(()=> console.log('Encontrei o segundo'))

        cy.wrap(1).should(num =>{
            return 2
        }).should('be.equal', 1)

    })

    it("its", ()=>{
        const obj = {nome:"User" , idade: 10}
        //pega as propriedades que estão dentro do objeto e valida se tem a propriedade abaixo
        cy.wrap(obj).should('have.property','nome','User')
        //pega somente a propriedade nome da listagem do obj que ja foi utilizada acima
        cy.wrap(obj).its('nome').should('be.equal','User');

        const obj2 = {nome:"User" , idade: 10 , endereco:{rua:'dos bobos'}}
        cy.wrap(obj2).its('endereco').should('have.property', 'rua')
        cy.wrap(obj2).its('endereco').its('rua').should('contain','bobos')
        cy.wrap(obj2).its('endereco.rua').should('contain','bobos')

        cy.visit('http://www.wcaquino.me/cypress/componentes.html');
        cy.title().its('length').should('be.equal',20)
    })

    it.only('Invoke', () =>{
        const getValue = () =>1;
        const soma = (a,b) => a+b;

        cy.wrap({fn:getValue}).invoke('fn').should('be.equal',1)
        //passa a função e seus parametros dentro do invoke, ele chama essa função e passa seus parametros
        cy.wrap({fn:soma}).invoke('fn',2,5).should('be.equal',7)
        
        cy.visit('http://www.wcaquino.me/cypress/componentes.html');
        cy.get('#formNome').invoke('val','Texto via invoque')
        cy.window().invoke('alert','Viu?')
        cy.get('#resultado')
        .invoke('html','<input type="button" value="hacked"/>')

    })
})