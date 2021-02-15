/// <reference types="cypress"/>



describe('Work with alerts', ()=>{
    
    before(()=>{
        cy.visit('http://www.wcaquino.me/cypress/componentes.html')
    })
    beforeEach(() => {
        cy.reload()
    })

    it("Alert", () =>{
        cy.get('#alert').click()
        //pega a mensagem do alert
        cy.on('window:alert', msg => {
            console.log(msg)
            //verifica a msg
            expect(msg).to.be.equal('Alert Simples')
        })
    })
      //iniciado um mock
      
      it('Alert com mock', ()=> {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)

        cy.get('#alert').click().then(() =>{
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        
        })
    })

    it.only('Confirm', ()=> {
        cy.on('window:confirm', msg =>{
            expect(msg).to.be.equal('Confirm Simples')
            
        })
        cy.on('window:alert', msg =>{
            expect(msg).to.be.equal('Confirmado')
        })
        cy.get('#confirm').click() 
        
    })

    it.only('Deny', ()=> {
        cy.on('window:confirm', msg =>{
            expect(msg).to.be.equal('Confirm Simples')
            return false
        })
        cy.on('window:alert', msg =>{
            expect(msg).to.be.equal('Negado')
        })
        cy.get('#confirm').click() 
        
    })
    it.only('Prompt', ()=> {

        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('22')
        })
        cy.on('window:confirm', msg =>{
            expect(msg).to.be.equal('Era 22?')
            
        })
        cy.on('window:alert', msg =>{
            expect(msg).to.be.equal(':D')
        })
        ;cy.get('#prompt').click() 
        
        
    })

    
})
    
    
