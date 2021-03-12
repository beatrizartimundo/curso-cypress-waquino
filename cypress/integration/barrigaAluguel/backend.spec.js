/// <reference types="cypress"/>
import dayjs from 'dayjs';
import moment from 'moment';


describe('Work with alerts', ()=>{
    
// let token

    
    before(()=>{
        //cy.login('madruga@uol.com.br','madruga123')
        //pega o token e passa para todas as requisiçoes
        cy.getToken('madruga@uol.com.br','madruga123')
        //com a função que sobrescreve não necessita mais pegar o token aqui e fazer a chamada um a um
            // .then(tkn =>{
            //     token = tkn
            // })
            
    })
    beforeEach(()=>{
        
       // cy.resetApp()
       cy.resetRest()

    })
    it('should create a count', () =>{
         
        cy.request({

            url:'https://barrigarest.wcaquino.me/contas',
            method:'post',
            // headers: { Authorization: `JWT ${token}`},
            body:{
                    nome: "Conta rest 3"
                    }
            }).as('response')
        
        cy.get('@response').then(res =>{
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome','Conta rest 3')
        })

    })
        
       
    it('should update a count', () =>{
        cy.request({
            method:'GET',
            url:'/contas',
            // headers: { Authorization: `JWT ${token}`},
            qs:{
                nome:'Conta para alterar'
            }
        }).then(res =>{

            cy.request({
                url:`/contas/${res.body[0].id}`,
                method:'put',
                // headers: { Authorization: `JWT ${token}`},
                body:{
                        nome: "Conta saldo atual"
                    }
                }).as('response')
            
            cy.get('@response').its('status').should('be.equal',200)
            cy.get('@response').then(resp =>{
                expect(resp.body).to.have.property('id')
                expect(resp.body).to.have.property('nome','Conta saldo atual')
                })
            })

        })
    
    it('should create a count with same name', () =>{
        cy.request({

            url:'https://barrigarest.wcaquino.me/contas',
            method:'post',
            // headers: { Authorization: `JWT ${token}`},
            body:{
                    nome: "Conta mesmo nome"
                    },
                    //para verificar errors
                    failOnStatusCode: false        
            }).as('response')
        
        cy.get('@response').then(res =>{
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal("Já existe uma conta com esse nome!")
            
        })

    })
    it('should create a movement account', () =>{
        cy.getAccountByName('Conta com movimentacao')
        .then(contaId =>{

            cy.request({
                
                method:'post',
                url:'/transacoes',
                // headers: { Authorization: `JWT ${token}`},
                body:{
                    conta_id: contaId,
                    data_pagamento: dayjs().format("DD/MM/YYYY"),
                    data_transacao: moment().format("DD/MM/YYYY"),
                    descricao: "abc",
                    envolvido: "env",
                    status: false,
                    tipo: "REC",
                    valor: "1000"
                    }
                }).as('response')
            
            cy.get('@response').its('status').should('be.equal',201)
            cy.get('@response').its('body.id').should('exist')
            
            })
    })
    it('should get balance', () =>{
        cy.request({
                
            method:'get',
            url:'/saldo',
            // headers: { Authorization: `JWT ${token}`},
        }).then(res =>{
            let saldoConta = null
            res.body.forEach(count =>{
                if(count.conta === 'Conta para saldo')
                {saldoConta = count.saldo}
            })
            expect(saldoConta).to.be.equal('534.00')
        })
        cy.request({
            method:'GET',
            url:'/transacoes',
            // headers: { Authorization: `JWT ${token}`},
            qs:{descricao:'Movimentacao 1, calculo saldo'}
        }).then(res =>{
            
            cy.request({
                                
                method:'put',
                url:`/transacoes/${res.body[0].id}`,
                // headers: { Authorization: `JWT ${token}`},
                body:{
                    conta_id: res.body[0].conta_id,
                    data_pagamento:moment(res.body[0].data_pagamento).format('DD/MM/YYYY') ,
                    data_transacao:moment(res.body[0].data_transacao).format('DD/MM/YYYY') ,
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    status: true,
                    tipo:res.body[0].tipo ,
                    valor: res.body[0].valor
                }
            }).its('status').should('be.equal',200)
        }) 
        cy.request({
                
            method:'get',
            url:'/saldo',
            // headers: { Authorization: `JWT ${token}`},
        }).then(res =>{
            let saldoConta = null
            res.body.forEach(count =>{
                if(count.conta === 'Conta para saldo')
                {saldoConta = count.saldo}
            })
            expect(saldoConta).to.be.equal('4034.00')
        })   
        
    })
    it('should remove a transaction', () =>{
        cy.getMovimentByName('Movimentacao para exclusao')
        .then(contaId =>{
            cy.request({
                                
                method:'delete',
                url:`/transacoes/${contaId}`,
                // headers: { Authorization: `JWT ${token}`},
            }).its('status').should('be.equal',204)  
        })     
    })
})    