import {TOKEN_KEY} from "../../../src/Config/config";
let user = {};
describe('CRUD Front', () => {
    beforeEach(() => {
        // get the login function from commands
        cy.loginMed();
    });
    it('should Add student', function () {
        cy.visit('/students');
        cy.wait(2000);
        //cy.get('[data-test="edit-btn-63a59d68f841a3c7e8f542e6"]').click({ force: true }); // get textfield
        cy.getByData('add-btn').click({force: true});
        cy.getByData('add-lastname').type("test");
        cy.getByData('add-firstname').type("test");
        cy.getByData('add-email').type("testcypress@gmail.com");
        cy.getByData('add-phone').type("12345678");
        cy.getByData('add-login').type("test");
        cy.getByData('add-password').type("test");
        cy.getByData('add-level').type(1);
        cy.getByData('add-class').type("ING");
        cy.getByData('add-dob').type("05/15/2023");
        cy.getByData('add-submit').click();
        cy.get('.go3958317564').should("contain", "Student Added Successfully")
        cy.wait(2000);

    });


    it('check if student is added', function () {
        cy.request({
            method: 'GET', url: Cypress.env('urlBackend') + '/student/Byemail/testcypress@gmail.com'
        }).then((response) => {
            expect(response.body).to.have.property('lastname', 'test');
            expect(response.body).to.have.property('firstname', 'test');
            expect(response.body).to.have.property('email', 'test@gmail.com');
            expect(response.body).to.have.property('phone', '12345678');
            expect(response.body).to.have.property('login', 'test');
            expect(response.body).to.have.property('level', '1');
            expect(response.body).to.have.property('class', 'ING');
            expect(response.body).to.have.property('dob', '2023-05-14T23:00:00.000Z');
            user = response.body;

        })
    })
    it('should not add exit student', function () {
        cy.visit('/students');
        cy.wait(2000);
        cy.getByData('add-btn').click({force: true});
        cy.getByData('add-lastname').type("test");
        cy.getByData('add-firstname').type("test");
        cy.getByData('add-email').type("testcypress@gmail.com");
        cy.getByData('add-phone').type("12345678");
        cy.getByData('add-login').type("test");
        cy.getByData('add-password').type("test");
        cy.getByData('add-level').type(1);
        cy.getByData('add-class').type("ING");
        cy.getByData('add-dob').type("05/15/2023");
        cy.getByData('add-submit').click();
        cy.get('.go3958317564').should("contain", "Request failed with status code 400")
        cy.wait(2000);
    });
    it('should Edit Student', function () {
        cy.visit('/students');
        cy.wait(2000);
        console.log(user)
        cy.getByData('edit-btn-'+user._id).click({force: true});
        cy.getByData('edit-lastname-'+user._id).clear().type("testeditstudent");
        cy.getByData('edit-firstname-'+user._id).clear().type("testeditstudent");
        cy.getByData('edit-email-'+user._id).clear().type("testeditstudent@gmail.com");
        cy.getByData('edit-phone-'+user._id).clear().type("98989898");
        cy.getByData('edit-class-'+user._id).clear().type("IM");
        cy.getByData('edit-level-'+user._id).clear().type(3);
        cy.getByData('save-edit-btn-'+user._id).click();
        cy.wait(2000);
    });

    it('check if student is edited', function () {
        cy.request({
            method: 'GET', url: Cypress.env('urlBackend') + '/student/Byemail/testeditstudent@gmail.com'
        }).then((response) => {
            expect(response.body).to.have.property('lastname', 'testeditstudent');
            expect(response.body).to.have.property('firstname', 'testeditstudent');
            expect(response.body).to.have.property('email', 'testeditstudent@gmail.com');
            expect(response.body).to.have.property('phone', '98989898');
            expect(response.body).to.have.property('level', '3');
            expect(response.body).to.have.property('class', 'IM');
            user = response.body;
            cy.wait(2000);
        })
    })
    it('should Delete Student', function () {
        cy.visit('/students');
        cy.wait(2000);
        cy.getByData('delete-btn-'+user._id).click({force: true});
        cy.wait(2000);
        cy.getByData('delete-confirm-btn').click({force: true});
        cy.wait(2000);
    })
})