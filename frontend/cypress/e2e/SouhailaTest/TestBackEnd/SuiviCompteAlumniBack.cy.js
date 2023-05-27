

let emailWaition="test@gmail.com";
let emailValide="souhaila.aouaouri199777779@gmail.com";
let emailInvalide="souhaila@gmail.com";
let emailInexistente="nouser@gmail.com";

describe("Suivi Etat Compte Alumni", () => {

  it("Suivi Compte Alumni Valide", () => {

    cy.request({
      method: 'POST',
      url: Cypress.env('urlBackend') + '/student/isvalid',
      body: {
        email: emailValide,
      },
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body).to.exist;
      console.log('Etat de votre compte est validé =>', resp.body);
    });

  });
  it("Suivi Compte Alumni Invalide", () => {

    cy.request({
      method: 'POST',
      url: Cypress.env('urlBackend') + '/student/isvalid',
      body: {
        email: emailInvalide,
      },
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body).to.exist;
      console.log('Etat de votre compte est invalide/Rejeter =>', resp.body);
    });

  });
  it("Suivi Compte Alumni Waition", () => {

    cy.request({
      method: 'POST',
      url: Cypress.env('urlBackend') + '/student/isvalid',
      body: {
        email: emailWaition,
      },
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body).to.exist;
      console.log('Etat de votre compte est en attend =>', resp.body);});

  });
  it("Suivi Compte Alumni n'existe pas", () => {

    cy.request({
      method: 'POST',
      url: Cypress.env('urlBackend') + '/student/isvalid',
      body: {
        email: emailInexistente,
      },
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(404);
      console.log('Cette email n existe pas ');
    });

  });

})