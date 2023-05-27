import {TOKEN_KEY} from "../../../src/Config/config";

const jwt = require('react-jwt');

function getUserIdFromToken(token) {
    const decodedToken = jwt.decodeToken(token);
    const userId = decodedToken._id;
    return userId;
};


describe('Test API Crud PFE Intern', () => {

    let currentUniv;
    let token;
    let userId;
    let saveInternship;
    before(() => {
        cy.request({
            method: 'GET', url: Cypress.env('urlBackend') + '/univ/get/currentUnivYear',
        }).then((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body).to.exist;
            currentUniv = resp.body;
        });
    })


    beforeEach(() => {
        cy.loginMed();

        cy.window().then((win) => {
            token = win.localStorage.getItem(TOKEN_KEY);
            userId = getUserIdFromToken(token);
        });
    })
    it('should Add PFE Intern', function () {
        console.log(userId)
        cy.request({
            method: 'POST',
            url: Cypress.env('urlBackend') + '/Internship',
            body: {
                "title": "PFE Intern",
                "description": "PFE Intern",
                "createdBy": userId,
                studentsId: userId,
                technologyId: ['Angular', 'React', 'Spring'],
                "country": "France",
                "company": "Medtech",
                "type": "PFE",
                univId: currentUniv._id,
            },
            headers: {'Authorization': `Bearer ${token}`},
        }).then((resp) => {
            expect(resp.status).to.eq(201);
            expect(resp.body).to.exist;
            expect(resp.body).to.have.property('title', 'PFE Intern');
            expect(resp.body).to.have.property('description', 'PFE Intern');
            expect(resp.body).to.have.property('createdBy', userId);
            expect(resp.body).to.have.property('country', 'France');
            expect(resp.body).to.have.property('company', 'Medtech');
            expect(resp.body).to.have.property('type', 'PFE');
            expect(resp.body).to.have.property('univId', currentUniv._id);
            saveInternship = resp.body;
        });
    })
    it('should Get PFE Intern by Id', function () {
        cy.request({
            method: 'GET',
            url: Cypress.env('urlBackend') + '/Internship/' + saveInternship._id,
            headers: {'Authorization': `Bearer ${token}`},
        }).then((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body).to.exist;
            expect(resp.body).to.have.property('title', 'PFE Intern');
            expect(resp.body).to.have.property('description', 'PFE Intern');
            expect(resp.body).to.have.property('createdBy', userId);
            expect(resp.body).to.have.property('country', 'France');
            expect(resp.body).to.have.property('company', 'Medtech');
            expect(resp.body).to.have.property('type', 'PFE');
        })
    })

    it('should Update PFE Intern', function () {
        cy.request({
            method: 'PUT',
            url: Cypress.env('urlBackend') + '/Internship/' + saveInternship._id,
            body: {
                "title": "Updated PFE Intern",
                "description": "Updated PFE Intern",
                "createdBy": userId,
                studentsId: userId,
                technologyId: ['Vue', 'Node JS', 'Python'],
                "country": "Germany",
                "company": "Sopra",
                "type": "PFE",
                univId: currentUniv._id,
            },
            headers: {'Authorization': `Bearer ${token}`},
        }).then((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body).to.exist;
            expect(resp.body).to.have.property('title', 'Updated PFE Intern');
            expect(resp.body).to.have.property('description', 'Updated PFE Intern');
            expect(resp.body).to.have.property('createdBy', userId);
            expect(resp.body).to.have.property('country', 'Germany');
            expect(resp.body).to.have.property('company', 'Sopra');
            expect(resp.body).to.have.property('type', 'PFE');
            expect(resp.body).to.have.property('univId', currentUniv._id);
        })
    })
    it('should Delete PFE Intern', function () {
        cy.request({
            method: 'DELETE',
            url: Cypress.env('urlBackend') + '/Internship/' + saveInternship._id,
            headers: {'Authorization': `Bearer ${token}`},
        }).then((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body).to.exist;
        })
    })
    it('should Get All PFE Intern', function () {
        cy.request({
            method: 'GET',
            url: Cypress.env('urlBackend') + '/Internship',
            headers: {'Authorization': `Bearer ${token}`},
        }).then((resp) => {
                expect(resp.status).to.eq(200);
                expect(resp.body).to.exist;
                expect(resp.body).to.be.an('array');


            }
        )
    })
})

