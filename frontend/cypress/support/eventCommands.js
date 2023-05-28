 
 

Cypress.Commands.add('login',()=>{
    cy.request({
        method: 'POST',
        url:Cypress.env('urlBackend') + '/auth',
        body:{
            login:'23232323',
            password:'23232323',
            type:'person',
        },
    }).then((resp=>{
     
       window.localStorage.setItem('token',resp.body)
    }))

  })
  Cypress.Commands.add('loginAsAdmin',()=>{
    cy.visit('/');
 

    cy.get('[data-test="login"]').type("23232323");
    cy.get('[data-test="password"]').type("23232323");

    cy.get('[data-test="connect"]').click();
  

  })

  Cypress.Commands.add('loginAsGanikas',()=>{
    cy.visit('/');
 

    cy.get('[data-test="login"]').type("Ganikas");
    cy.get('[data-test="password"]').type("pdnejoh00");

    cy.get('[data-test="connect"]').click();
  

  })

  //add Commands to get all Univ and find the Univ isCurrent == true
  Cypress.Commands.add('getUniv',()=>{
    cy.request({
      method: 'GET',
      url:Cypress.env('urlBackend')+'/univ',
      headers:{

        'Authorization': 'Bearer '+window.localStorage.getItem('token')

        }
        }).then((resp=>{
          console.log(resp.body);
          const Univs=resp.body;
        
          const univ=Univs.find((univ)=>univ.isCurrent);  
          window.localStorage.setItem('UnivId',univ._id) 
          window.localStorage.setItem('UnivName',univ.name) 

          }))


  })
 