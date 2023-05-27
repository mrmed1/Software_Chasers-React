describe('Page Crud Summer Intern', () => {
    let saveintern = {}
    beforeEach(() => {
        // get the login function from commands
        cy.loginMed();
    });

    it('should Add Summer Intern', function () {
        cy.visit('/SummerIntern/')
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

        cy.get('.go3958317564').should("contain", "SUMMER Internship  Created successfully !")
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

    it('should Edit Summer Intern', function () {
        cy.visit('/SummerIntern/')
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

    it('should Delete Summer Intern', function () {
        cy.visit('/SummerIntern/')
        cy.wait(1000)
        cy.getByData('delete-summerintern').click({ force: true });
        cy.get('.go3958317564').should("contain", "Internship deleted successfully !")
        cy.get('body').click(100, 100);
    })

    // it('should not get the deleted Summer Intern', function () {
    //     cy.visit('/SummerIntern/')
    //     cy.wait(1000)
    //     cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(1)').should("not.contain", "edited")
    //     cy.get('body').click(100, 100);
    // })
})