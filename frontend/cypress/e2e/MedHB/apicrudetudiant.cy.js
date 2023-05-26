import {TOKEN_KEY} from "../../../src/Config/config";

describe('Crud Etudiant page', () => {
    let token;
    let saveuser;
    before(() => {
        // get the login function from commands

        cy.login();
        cy.wait(1500);
        cy.window().then((win) => {
            token = win.localStorage.getItem(TOKEN_KEY);
        });
    });

    it("Add student succefully", () => {
        cy.request(
            {
                method: 'POST',
                url: Cypress.env('urlBackend') + '/Persons',
                body: {
                    "lastname": "studentcypress",
                    "firstname": "studentcypress",
                    "email": "studentcypress@gmail.com",
                    "login": "studentcypress",
                    "password": "studentcypress",
                    "role": "STUDENT",
                    "level": 2,
                    "class": "ING",
                    "dob": "2023-05-26T14:29:57.421Z",
                    "phone": "string",
                    "isPublic": true,
                    "promotion": 2017,
                    "dog": "2023-05-26T14:29:57.421Z",
                    "doh": "2023-10-26T14:29:57.421Z",
                    "isValidate": 1,
                },
                headers: {'Authorization': `Bearer ${token}`},
            }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).not.to.be.null;
            expect(response.body).to.have.property('lastname', 'studentcypress');
            expect(response.body).to.have.property('firstname', 'studentcypress');
            expect(response.body).to.have.property('email', 'studentcypress@gmail.com')
            expect(response.body).to.have.property('login', 'studentcypress')
            expect(response.body).to.have.property('role', 'STUDENT')
            expect(response.body).to.have.property('level', '2')
            expect(response.body).to.have.property('class', 'ING')
            expect(response.body).to.have.property('dob', '2023-05-26T14:29:57.421Z')
            expect(response.body).to.have.property('phone', 'string')
            expect(response.body).to.have.property('isPublic', true)
            expect(response.body).to.have.property('promotion', '2017')
            expect(response.body).to.have.property('dog', '2023-05-26T14:29:57.421Z')
            expect(response.body).to.have.property('doh', '2023-10-26T14:29:57.421Z')
            expect(response.body).to.have.property('isValidate', 1)
            saveuser = response.body;
        })

    })
    it("Add student with same email",() => {
    cy.request(
            {
                method: 'POST',
                url: Cypress.env('urlBackend') + '/Persons',
                body: {
                    "lastname": "studentcypress",
                    "firstname": "studentcypress",
                    "email": "studentcypress@gmail.com",
                    "login": "studentcypress",
                    "password": "studentcypress",
                    "role": "STUDENT",
                    "level": 2,
                    "class": "ING",
                    "dob": "2023-05-26T14:29:57.421Z",
                    "phone": "string",
                    "isPublic": true,
                    "promotion": 2017,
                    "dog": "2023-05-26T14:29:57.421Z",
                    "doh": "2023-10-26T14:29:57.421Z",
                    "isValidate": 1,
                },
                headers: {'Authorization': `Bearer ${token}`},
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
    })
    it('should get student by id succfully ', () => {
        cy.request({
            method: 'GET',
            url: Cypress.env('urlBackend') + '/Persons/' + saveuser._id,
            headers: {'Authorization': `Bearer ${token}`},
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).not.to.be.null;
            expect(response.body).to.have.property('lastname', 'studentcypress');
            expect(response.body).to.have.property('firstname', 'studentcypress');
            expect(response.body).to.have.property('email', 'studentcypress@gmail.com')
            expect(response.body).to.have.property('login', 'studentcypress')
            expect(response.body).to.have.property('role', 'STUDENT')
            expect(response.body).to.have.property('level', '2')
            expect(response.body).to.have.property('class', 'ING')
            expect(response.body).to.have.property('dob', '2023-05-26T14:29:57.421Z')
            expect(response.body).to.have.property('phone', 'string')
            expect(response.body).to.have.property('isPublic', true)
            expect(response.body).to.have.property('promotion', '2017')
            expect(response.body).to.have.property('dog', '2023-05-26T14:29:57.421Z')
            expect(response.body).to.have.property('doh', '2023-10-26T14:29:57.421Z')
            expect(response.body).to.have.property('isValidate', 1)
        });
    });
    it("Update student succefully", () => {
        cy.wait(2000);
        cy.request(
            {
                method: 'PUT',
                url: Cypress.env('urlBackend') + '/Persons/' + saveuser._id,
                body: {
                    "lastname": "studentcypressupdated",
                    "firstname": "studentcypressupdated",
                    "email": "studentcypressupdated@gmail.com",
                    "login": "studentcypressupdated",
                    "password": "studentcypressupdated",
                    "role": "STUDENT",
                    "level": 3,
                    "class": "CM",
                    "dob": "2023-05-26T14:29:57.421Z",
                    "phone": "string",
                    "isPublic": true,
                    "promotion": 2017,
                    "dog": "2023-05-26T14:29:57.421Z",
                    "doh": "2023-10-26T14:29:57.421Z",
                    "isValidate": 1,
                },

                headers: {'Authorization': `Bearer ${token}`}

            }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).not.to.be.null;
            expect(response.body).to.have.property('lastname', 'studentcypressupdated');
            expect(response.body).to.have.property('firstname', 'studentcypressupdated');
            expect(response.body).to.have.property('email', 'studentcypressupdated@gmail.com');
            expect(response.body).to.have.property('login', 'studentcypressupdated');
            expect(response.body).to.have.property('role', 'STUDENT');
            expect(response.body).to.have.property('level', '3');
            expect(response.body).to.have.property('class', 'CM');
            expect(response.body).to.have.property('dob', '2023-05-26T14:29:57.421Z');
            expect(response.body).to.have.property('phone', 'string');
            expect(response.body).to.have.property('isPublic', true);
            expect(response.body).to.have.property('promotion', '2017');
            expect(response.body).to.have.property('dog', '2023-05-26T14:29:57.421Z');
            expect(response.body).to.have.property('doh', '2023-10-26T14:29:57.421Z');
            expect(response.body).to.have.property('isValidate', 1);


        })
    })
    it("Delete student succefully", () => {
        cy.request(
            {
                method: 'DELETE',
                url: Cypress.env('urlBackend') + '/Persons/' + saveuser._id,
                headers: {'Authorization': `Bearer ${token}`}

            }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).not.to.be.null;

        })
    })

})



