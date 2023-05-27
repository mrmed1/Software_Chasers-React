

describe("Verifier Alumni", () => {

    it("Accepter Alumni", () => {

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
    it("Rejeter Alumni", () => {

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

})