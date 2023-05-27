describe('Page Crud PFE Intern', () => {
    let saveintern = {}
    beforeEach(() => {
        // get the login function from commands
        cy.loginMed();
    });

    it('should Add PFE Intern', function () {
        cy.visit('/InsertPFEIntern/')
        cy.wait(1000)
        cy.getByData('add_summerintern').click();
        cy.getByData('intern_title').type("test");
        cy.getByData('intern_description').type("test");
        cy.getByData('intern_company').type("test");
        cy.getByData('intern_country').type("Tunisia").click();
        cy.get('[data-test="intern_technologies"]').click(); // Open the dropdown

        cy.get('.p-multiselect-panel .p-multiselect-item').contains('Angular').click();
        cy.get('.p-multiselect-panel .p-multiselect-item').contains('React').click();
        cy.getByData('submit-add-btn').click();

        cy.get('.go3958317564').should("contain", "PFE Internship  Created successfully !")
        cy.get('body').click(100, 100);
    })
    // it('should check if Intern is added', function () {
    //     cy.request({
    //         method: 'GET', url: Cypress.env('urlBackend') + '/internship/'+window.localStorage.getItem('intern_id')
    //     }).then((response) => {
    //         expect(response.body).to.have.property('title', 'test');
    //         expect(response.body).to.have.property('description', 'test');
    //         expect(response.body).to.have.property('company', 'test');
    //         expect(response.body).to.have.property('country', 'Tunisia');
    //         expect(response.body).to.have.property('technologies', 'Angular,React');
    //
    //     })
    // });

    it('should Edit PFE Intern', function () {
        cy.visit('/InsertPFEIntern/')
        cy.wait(1000)
        cy.get('.p-col-6 > [data-test="add_summerintern"]').click();
        cy.getByData('intern_title').type("edited");
        cy.getByData('intern_description').type("edited");
        cy.getByData('intern_company').type("edited");
        cy.getByData('intern_country').type("France").click();
        cy.get('[data-test="intern_technologies"]').click(); // Open the dropdown

        cy.get('.p-multiselect-panel .p-multiselect-item').contains('NodeJS').click();
        cy.get('.p-multiselect-panel .p-multiselect-item').contains('Python').click();
        cy.getByData('submit-add-btn').click();


        cy.get('body').click(100, 100);

    })

    it('should Delete PFE Intern', function () {
        cy.visit('/InsertPFEIntern/')
        cy.wait(1000)
        cy.getByData('delete-intern').click({ force: true });
        cy.getByData('deletepfebtn').click({ force: true });

        cy.get('.go3958317564').should("contain", "Internship deleted successfully!")
        cy.get('body').click(100, 100);
    })



    // it('should not get the deleted PFE Intern', function () {
    //     cy.visit('/PFEIntern/')
    //     cy.wait(1000)
    //     cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(1)').should("not.contain", "edited")
    //     cy.get('body').click(100, 100);
    // })
})