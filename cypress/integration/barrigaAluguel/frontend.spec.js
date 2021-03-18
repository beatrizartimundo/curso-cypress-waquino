/// <reference types="cypress"/>

import loc from '../../support/locators'
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'

describe('Work with alerts', () => {
    after(() => {
        cy.clearLocalStorage()
    })
    before(() => {


        //teste para garantir que não esta considerando o rest, somente mock



    })
    beforeEach(() => {
        buildEnv()
        cy.login('madruga@uol.com.br', 'senhateste')
        cy.get(loc.MENU.HOME).click()
        //cy.resetApp()

    })
    it('should create a count', () => {
       
        cy.route({
            method: 'post',
            url: '/contas',
            response: { "id": 3, "nome": "Conta x", "visivel": true, "usuario_id": 1 }
        }).as('saveConta')

        cy.acessarMenuConta()

        cy.route({
            method: 'get',
            url: '/contas',
            response: [
                { "id": 1, "nome": "carteira", "visivel": true, "usuario_id": 1 },
                { "id": 2, "nome": "Conta para alterar", "visivel": true, "usuario_id": 1 },
                { "id": 3, "nome": "Conta mesmo nome", "visivel": true, "usuario_id": 1 },
                { "id": 3, "nome": "Conta x", "visivel": true, "usuario_id": 1 }
            ]
        }).as('contasSave')
        cy.inserirConta("Conta x")

        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')

    })
    it('should update a count', () => {
       

        cy.route({
            method: 'put',
            url: '/contas/**',
            response: { "id": 2, "nome": "Conta maio", "visivel": true, "usuario_id": 1 }
        })
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()

        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
        cy.get(loc.CONTAS.NOME_CONTA)
            .clear()
            .type('Conta maio')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')

    })
    it('should create a count with same name', () => {
        cy.route({
            method: 'post',
            url: '/contas',
            response: { "error": "Já existe uma conta com esse nome!" },
            status: 400
        }).as('saveContaSameName')

        cy.acessarMenuConta()
        cy.inserirConta('Conta mesmo nome')
        cy.get(loc.MESSAGE).should('contain', '400')
    })
    it('should create a movement account', () => {
        cy.route({
            method: 'post',
            url: '/transacoes',
            response: { "id": 436482, "descricao": "desc", "envolvido": "desc", "observacao": null, "tipo": "REC", "data_transacao": "2021-03-15T03:00:00.000Z", "data_pagamento": "2021-03-15T03:00:00.000Z", "valor": "150.00", "status": false, "conta_id": 472535, "usuario_id": 13508, "transferencia_id": null, "parcelamento_id": null }
        })
        cy.route({
            method: 'get',
            url: '/extrato/**',
            response: 'fixture:movementAccount'
        })

        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Description')
        cy.get(loc.MOVIMENTACAO.VALOR).type('20')
        cy.get(loc.MOVIMENTACAO.ENVOLVIDO).type('desc')
        //ajustar esse ponto
        cy.get('select').select('carteira')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
        cy.get(loc.EXTRATO.LINHAS).should('have.length', 6)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA('Description', '20')).should('exist')
    })
    it('should get balance', () => {
        
       cy.route({
        method: 'get',
        url: '/transacoes/**',
        response: {
            "conta": "Conta para saldo",
            "id": 435281,
             "descricao": "Movimentacao 1, calculo saldo",
            "envolvido": "CCC", 
            "observacao": null,
            "tipo": "REC", 
            "data_transacao": "2021-03-14T03:00:00.000Z",
            "data_pagamento": "2021-03-15T03:00:00.000Z",
            "valor": "3500.00", 
            "status": true,
            "conta_id": 472524, 
            "usuario_id": 13508,
            "transferencia_id": null,
             "parcelamento_id": null
        }
   })
   cy.route({
    method: 'put',
    url: '/transacoes/**',
    response: {
        "conta": "Conta para saldo",
        "id": 435281,
         "descricao": "Movimentacao 1, calculo saldo",
        "envolvido": "CCC", 
        "observacao": null,
        "tipo": "REC", 
        "data_transacao": "2021-03-14T03:00:00.000Z",
        "data_pagamento": "2021-03-15T03:00:00.000Z",
        "valor": "3500.00", 
        "status": true,
        "conta_id": 472524, 
        "usuario_id": 13508,
        "transferencia_id": null,
         "parcelamento_id": null
    }
})
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO('Conta para saldo')).should('contain', '4.034')
        cy.get(loc.MENU.EXTRATO).click()
        
        cy.xpath(loc.EXTRATO.FN_XP_EDIT('Movimentacao 1, calculo saldo')).click()

        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value','Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO('Conta para saldo')).should('contain', '4.034,00')
    })
    it('should remove a transaction', () => {
        cy.route({
            method: 'delete',
            url: '/transacoes/**',
            response:{},
            status:204
        }).as('del')
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVE('Description')).click()
        cy.get(loc.MESSAGE).should('contain', 'Movimentação removida com sucesso!')
    })
    it('Should validate data send to create an account', () => {
        const reqStub = cy.stub()
        cy.route({
            method: 'post',
            url: '/contas',
            response: { "id": 3, "nome": "Conta x", "visivel": true, "usuario_id": 1 },
            //modo 2 de validação
            // onRequest:req =>{
            //     console.log(req)
            //     expect(req.request.body.nome).to.be.empty
            //     expect(req.request.headers).to.have.property('Authorization')
            // }
            //modo 3 validação
            onRequest:reqStub

        }).as('saveConta')

        cy.acessarMenuConta()

        cy.route({
            method: 'get',
            url: '/contas',
            response: [
                { "id": 1, "nome": "carteira", "visivel": true, "usuario_id": 1 },
                { "id": 2, "nome": "Conta para alterar", "visivel": true, "usuario_id": 1 },
                { "id": 3, "nome": "Conta mesmo nome", "visivel": true, "usuario_id": 1 },
                { "id": 3, "nome": "Conta x", "visivel": true, "usuario_id": 1 }
            ]
        }).as('contasSave')

        cy.inserirConta('{CONTROL}')
        //modo 1 validação
        // cy.wait('@saveConta').its('request.body.nome').should('not.be.empty')
        cy.wait('@saveConta').then(()=>{
           // console.log(reqStub.args[0][0])
           expect(reqStub.args[0][0].request.body.nome).to.be.empty
            expect(reqStub.args[0][0].request.headers).to.have.property('Authorization')
        })
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    });
    it('Should verify colors', () => {
        cy.route({
            method: 'get',
            url: '/extrato/**',
            response: [
    {"conta":"carteira","id":436482,"descricao":"Description","envolvido":"desc","observacao":null,"tipo":"REC","data_transacao":"2021-03-15T03:00:00.000Z","data_pagamento":"2021-03-15T03:00:00.000Z","valor":"20.00","status":false,"conta_id":472535,"usuario_id":13508,"transferencia_id":null,"parcelamento_id":null},
    {"conta":"Conta com movimentacao","id":435280,"descricao":"Movimentacao de conta","envolvido":"BBB","observacao":null,"tipo":"REC","data_transacao":"2021-03-14T03:00:00.000Z","data_pagamento":"2021-03-14T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":472523,"usuario_id":13508,"transferencia_id":null,"parcelamento_id":null},
    {"conta":"Conta para saldo","id":435281,"descricao":"Movimentacao 1, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"DESP","data_transacao":"2021-03-14T03:00:00.000Z","data_pagamento":"2021-03-14T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":472524,"usuario_id":13508,"transferencia_id":null,"parcelamento_id":null},
    {"conta":"Conta para saldo","id":435282,"descricao":"Movimentacao 2, calculo saldo","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2021-03-14T03:00:00.000Z","data_pagamento":"2021-03-14T03:00:00.000Z","valor":"-1000.00","status":true,"conta_id":472524,"usuario_id":13508,"transferencia_id":null,"parcelamento_id":null},
    ]

        })    
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Description')).should('have.class','receitaPendente')
        //verificação de classe, de acordo com a classe a cor é alterada
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Movimentacao de conta')).should('have.class','receitaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Movimentacao 1, calculo saldo')).should('have.class','despesaPendente')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Movimentacao 2, calculo saldo')).should('have.class','despesaPaga')
    });

    it('should be responsive', () => {
        cy.get('[data-test=menu-home]').should('exist').and('be.visible')
        cy.viewport(500,700)
        cy.get('[data-test=menu-home]').should('exist').and('not.be.visible')
        cy.viewport('iphone-5')
        cy.get('[data-test=menu-home]').should('exist').and('not.be.visible')
        cy.viewport('ipad-2')
        cy.get('[data-test=menu-home]').should('exist').and('be.visible')
    });
})