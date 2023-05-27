import {TOKEN_KEY} from "../../../src/Config/config";

describe('changepassword', () => {

    it('change password successfully', () => {
        cy.loginGeneral();
        cy.visit('/PwdUpdate');
        cy.getByData('currentPwd').type('20400400');
        cy.getByData('newPwd').type('20800800');
        cy.getByData('confirmedPwd').type('20800800');
        cy.getByData('submit').click();
        window.localStorage.removeItem(TOKEN_KEY);
        cy.wait(1500)
    })

    it('should not connect with old data', function () {
        cy.visit('/login');
        cy.getByData('login').type('20400400');
        cy.getByData('password').type('20400400');
        cy.get('[data-test="connect"]').click();
        cy.visit('/students');
        cy.location('pathname').should("eq", "/login");
    });

    it('should connect with new data', function () {
        cy.visit('/login');
        cy.getByData('login').type('20400400');
        cy.getByData('password').type('20800800');
        cy.get('[data-test="connect"]').click();
        cy.visit('/students');
        cy.location('pathname').should("eq", "/students");
    });
});

