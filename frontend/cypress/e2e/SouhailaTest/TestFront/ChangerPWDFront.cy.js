import {TOKEN_KEY} from "../../../../src/Config/config";

describe('Modification du mot de passe côté Frontend', () => {


    it('Modifie le mot de passe avec succès', () => {
        window.localStorage.removeItem(TOKEN_KEY);
        cy.loginGeneral();
        cy.wait(1000);
        cy.visit('http://localhost:3000/PwdUpdate/');
        cy.wait(1000);
        cy.getByData('currentPwd').type('20400400');
        cy.getByData('newPwd').type('20800800');
        cy.getByData('confirmedPwd').type('20800800');
        cy.getByData('save').click();
    });
    it('Succes login after changing pwd  ',()=>{
        window.localStorage.removeItem(TOKEN_KEY);
        cy.wait(1000);
        cy.visit('/login');
        cy.wait(1000);
        cy.getByData('login').type('20400400');
        cy.getByData('password').type('20800800');
        cy.get('[data-test="connect"]').click();
        cy.visit('/students');
        cy.location('pathname').should("eq", "/students");

        cy.wait(2000);
    })
});
