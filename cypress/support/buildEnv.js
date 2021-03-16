const buildEnv=() =>{

    cy.server()
        cy.route({
            method:'POST',
            url:'/signin',
            response:{
                id:22222,
                nome:"usuario mock",
                token:"um token qualquer"
            }
        }).as('signin')

        cy.route({
            method:"get",
            url:"/saldo",
            response:[{"conta_id":472523,"conta":"Conta com movimentacao","saldo":"-1500.00"},
            {"conta_id":472524,"conta":"Conta para saldo","saldo":"4034.00"},
            {"conta_id":472525,"conta":"Conta para extrato","saldo":"-120.00"}]
        }).as('saldo')

        cy.route({
            method:'get',
            url:'/contas',
            response:[
                {"id":1,"nome":"carteira","visivel":true,"usuario_id":1},
                {"id":2,"nome":"Conta para alterar","visivel":true,"usuario_id":1},
                {"id":3,"nome":"Conta mesmo nome","visivel":true,"usuario_id":1}]
        }).as('contas')
        cy.route({
            method: 'get',
            url: '/extrato/**',
            response: 'fixture:movementAccount'
        }).as('extrato')

}
export default buildEnv

//Overriding responses will be added in a future release
        // cy.intercept( 'POST','/signin',(req) => {
        //     const { body } = responses.shift()
        //     req.reply(
        //     body ={
        //         id:22222,
        //         nome:"usuario mock",
        //         token:"um token qualquer"
        //     }
        // )}).as('signin')
        //cy.wait('@signin').its('response.statusCode').should('eq', 200);