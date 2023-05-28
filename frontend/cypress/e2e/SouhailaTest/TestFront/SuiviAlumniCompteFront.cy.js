
let emailWaiting="test@gmail.com";
let emailValide="souhaila.aouaouri199777779@gmail.com";
let emailInvalide="souhaila@gmail.com";
let emailInexistente="nouser@gmail.com";

describe('Suivi etat compte alumni coté FrontEnd', () => {

    it('Suivi compte alumni valide', () => {
       cy.visit('/SuiviEtatCompteAllumni');
        cy.get('[data-test="email"]').type(emailValide);
        cy.get('[data-test="send"]').click();
        cy.get('[data-test="resultat"]').should('be.visible');
    })

    it('Suivi compte alumni invalide', () => {
        cy.visit('/SuiviEtatCompteAllumni');

        cy.get('[data-test="email"]').type(emailInvalide);
        cy.get('[data-test="send"]').click();
        cy.get('[data-test="resultat"]').should('be.visible');
    })

    it('Suivi compte alumni waiting', () => {
        cy.visit('/SuiviEtatCompteAllumni');

        cy.get('[data-test="email"]').type(emailWaiting);
        cy.get('[data-test="send"]').click();
        cy.get('[data-test="resultat"]').should('be.visible');
    })

    it('Suivi compte alumni Inexistente', () => {
        cy.visit('/SuiviEtatCompteAllumni');

        cy.get('[data-test="email"]').type(emailInexistente);
        cy.get('[data-test="send"]').click();
        cy.get('[data-test="resultat"]').should('be.visible');
    })

    it('Cancel / Back ',()=>{
        cy.visit('/SuiviEtatCompteAllumni');
        cy.get('[data-test="cancel"]').click();
        cy.url().should('include', '/login');

    })

})
