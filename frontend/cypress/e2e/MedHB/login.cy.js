import {TOKEN_KEY} from "../../../src/Config/config";

describe('Login Page', () => {
    it('Login succefully with person', () => {

        window.localStorage.removeItem("token")
        cy.request({
            method: 'POST',
            url: Cypress.env('urlBackend') + '/auth',
            body: {
                login: "23232323",
                password: "23232323",
                type: "person"
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).not.to.be.null;
            window.localStorage.setItem(TOKEN_KEY, response.body.token)
        })
    })
    it('Login succefully with invalid alumni', () => {

        window.localStorage.removeItem("token")
        cy.request({
            method: 'POST',
            url: Cypress.env('urlBackend') + '/auth',
            failOnStatusCode: false,
            body: {
                login: "test@gmail.com",
                password: "test@gmail.com",
                type: "person"
            }
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.eq("You are not validated yet");

        })
    })

    it('Login succefully with club', () => {

        window.localStorage.removeItem("token")
        cy.request({
            method: 'POST',
            url: Cypress.env('urlBackend') + '/auth',
            body: {
                login: "Kay",
                password: "7nv1vw9d0",
                type: "club"
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).not.to.be.null;

        })
    })
    it('Login succefully with banned club', () => {

        window.localStorage.removeItem("token")
        cy.request({
            method: 'POST',
            url: Cypress.env('urlBackend') + '/auth',
            failOnStatusCode: false,
            body: {
                login: "Melek",
                password: "7nv1vw9d0",
                type: "club"
            }
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.eq("You are banned");
        })

    })
})