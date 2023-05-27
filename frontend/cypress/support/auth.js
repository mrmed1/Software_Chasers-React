
Cypress.Commands.add('login_as_student',()=>{
    cy.request({
        method: 'POST',
        url:`${Cypress.env('urlBackend')}/auth/`,
        body:{
            login:'Ganikas',
            password:'pdnejoh00',
            type:'person',
        },
    }).then((resp=>{
        
       window.localStorage.setItem('token',resp.body)
       return resp.body
    }))
})

Cypress.Commands.add('login_as_Teacher',()=>{
    cy.request({
        method: 'POST',
        url:`${Cypress.env('urlBackend')}/auth/`,
        body:{
            login:'GanikasS',
            password:'pdnejoh00',
            type:'person',
        },
    }).then((resp=>{
        
       window.localStorage.setItem('token',resp.body)
       return resp.body
    }))
})
 
