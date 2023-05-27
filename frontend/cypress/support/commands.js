// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import {TOKEN_KEY} from "../../src/Config/config";

Cypress.Commands.add("getByData", (selector) => {
    return cy.get(`[data-test=${selector}]`)
})
Cypress.Commands.add('getToast', () => {
    return cy.get('.uniquetest .toast');
});

Cypress.Commands.add("login", () => {
    cy.request({
        method: 'POST', url: Cypress.env('urlBackend') + '/auth', body: {
            login: "23232323",
            password: "23232323",
            type: "person"
        }
    }).then((response) => {
        window.localStorage.setItem(TOKEN_KEY, response.body)
    })
})

Cypress.Commands.add("getByName", (selector) => {
  return cy.get(`[name=${selector}]`);
});
Cypress.Commands.add("getById", (selector) => {
  return cy.get(`[id=${selector}]`);
});



Cypress.Commands.add("loginGeneral", () => {
    cy.request({
        method: 'POST', url: Cypress.env('urlBackend') + '/auth', body: {
            login: "20400400",
            password: "20400400",
            type: "person"
        }
    }).then((response) => {
        window.localStorage.setItem(TOKEN_KEY, response.body)
    })
})

