describe('login Front page', () => {
    it('sign in successfully as admin', () => {
        cy.visit('/');
        cy.location('pathname').should("eq", "/login");

        cy.get('[data-test="login"]').type("23232323");
        cy.get('[data-test="password"]').type("23232323");

        cy.get('[data-test="connect"]').click();
       // cy.getToast().should('exist')




        cy.location('pathname').should("eq", "/accueil");
    });

    it('sign in with invalid alumni ', function () {
        cy.visit('/');
        cy.location('pathname').should("eq", "/login");

        cy.get('[data-test="login"]').type("test@gmail.com");
        cy.get('[data-test="password"]').type("test@gmail.com");

        cy.get('[data-test="connect"]').click();
        cy.location('pathname').should("eq", "/login");
    });
    it('should sign in with valid club', function () {
        cy.visit('/');
        cy.location('pathname').should("eq", "/login");

        cy.get('[data-test="login"]').type("Kay");
        cy.get('[data-test="password"]').type("7nv1vw9d0");
        cy.get('[data-test="isclub"]').click();
        cy.get('[data-test="connect"]').click();
        cy.location('pathname').should("eq", "/accueil");
    });

    it('should sign in with banned club', function () {
        cy.visit('/');
        cy.location('pathname').should("eq", "/login");

        cy.get('[data-test="login"]').type("Melek");
        cy.get('[data-test="password"]').type("7nv1vw9d0");
        cy.get('[data-test="isclub"]').click();
        cy.get('[data-test="connect"]').click();
        cy.location('pathname').should("eq", "/login");
    });

});
