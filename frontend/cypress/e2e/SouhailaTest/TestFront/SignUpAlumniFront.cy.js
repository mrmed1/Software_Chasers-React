

describe('Sign Up alumni coté FrontEnd', () => {

  it('Sign Up with valide data ', () => {
    cy.visit('/signup/');
    cy.get('[data-test="email"]').type("frontttt@gmail.com");
    cy.get('[data-test="pwd"]').type("123456");
    cy.get('[data-test="login"]').type("frontttt");
    cy.get('[data-test="nom"]').type("front");
    cy.get('[data-test="prenom"]').type("front");
  //  cy.getByData("dob").type("05/17/1993").click({ force: true });
    // Ouvrir le calendrier de la date de naissance
    cy.get('[data-test="dob"]').click();
    cy.get(':nth-child(3) > :nth-child(5) > span').click({ force: true });
    // Sélectionner la date de naissance




    cy.get('[data-test="phone"]').type("55478632");
    cy.get('[data-test="level"]').type("4");
    cy.get('[data-test="class"]').type("cim");
    cy.get('[data-test="promotion"]').type("2014");
//    cy.getByData("doh").type("12/17/2023");

    // Ouvrir le calendrier de la date de naissance
    cy.get('[data-test="doh"]').click();
    // Sélectionner la date de naissance

    cy.get(':nth-child(3) > :nth-child(5) > span').click({ force: true });

    //cy.getByData("dog").type("04/17/2023");
    // Ouvrir le calendrier de la date de naissance
    cy.get('[data-test="dog"]').click();
    cy.get(':nth-child(3) > :nth-child(5) > span').click({ force: true });


    cy.get('[data-test="send"]').click();
    cy.visit('/login');
  })



/*
  it('Sign Up with invalide data ', () => {
    cy.visit('/signup/');
    cy.get('[data-test="email"]').type("front@gmail.com");
    cy.get('[data-test="pwd"]').type("123456");
    cy.get('[data-test="login"]').type("front");
    cy.get('[data-test="nom"]').type("front");
    cy.get('[data-test="prenom"]').type("front");
    cy.get('[data-test="dob"]').clear().type("05/17/1993");
    cy.get('[data-test="phone"]').type("55478632");
    cy.get('[data-test="level"]').type("4");
    cy.get('[data-test="class"]').type("cim");
    cy.get('[data-test="promotion"]').type("2014");
    cy.get('[data-test="doh"]').clear().type("12/17/2023");
    cy.get('[data-test="dog"]').clear().type("04/17/2023");
    cy.get('[data-test="send"]').click();
    cy.location('pathname').should("eq", "/signup/");
  })
*/

/*
  it('Cancel / Back ',()=>{
    cy.visit('/signup/');
    cy.get('[data-test="cancel"]').click();
    cy.url().should('include', '/login');

  })*/
})
