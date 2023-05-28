import {TOKEN_KEY} from "../../../src/Config/config";

const jwt = require('react-jwt');

function getUserIdFromToken(token) {
    const decodedToken = jwt.decodeToken(token);
    const userId = decodedToken._id;
    return userId;
};


describe('Test API Crud Summer Intern', () => {

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
    it('should Add Summer Intern', function () {
        console.log(userId)
        cy.request({
            method: 'POST',
            url: Cypress.env('urlBackend') + '/Internship',
            body: {
                "title": "Summer Intern",
                "description": "Summer Intern",
                "createdBy": userId,
                studentsId: userId,
                technologyId: ['Angular', 'React', 'Spring'],
                "country": "France",
                "company": "Medtech",
                "type": "SUMMER",
                univId: currentUniv._id,
            },
            headers: {'Authorization': `Bearer ${token}`},
        }).then((resp) => {
            expect(resp.status).to.eq(201);
            expect(resp.body).to.exist;
            expect(resp.body).to.have.property('title', 'Summer Intern');
            expect(resp.body).to.have.property('description', 'Summer Intern');
            expect(resp.body).to.have.property('createdBy', userId);
            expect(resp.body).to.have.property('country', 'France');
            expect(resp.body).to.have.property('company', 'Medtech');
            expect(resp.body).to.have.property('type', 'SUMMER');
            expect(resp.body).to.have.property('univId', currentUniv._id);
            saveInternship = resp.body;
        });
        })
    it('should Get Summer Intern by Id', function () {
        cy.request({
            method: 'GET',
            url: Cypress.env('urlBackend') + '/Internship/' + saveInternship._id,
            headers: {'Authorization': `Bearer ${token}`},
        }).then((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body).to.exist;
            expect(resp.body).to.have.property('title', 'Summer Intern');
            expect(resp.body).to.have.property('description', 'Summer Intern');
            expect(resp.body).to.have.property('createdBy', userId);
            expect(resp.body).to.have.property('country', 'France');
            expect(resp.body).to.have.property('company', 'Medtech');
            expect(resp.body).to.have.property('type', 'SUMMER');
        })
    })

    it('should Update Summer Intern', function () {
        cy.request({
            method: 'PUT',
            url: Cypress.env('urlBackend') + '/Internship/' + saveInternship._id,
            body: {
                "title": "Updated Summer Intern",
                "description": "Updated Summer Intern",
                "createdBy": userId,
                studentsId: userId,
                technologyId: ['Vue', 'Node JS', 'Python'],
                "country": "Germany",
                "company": "Sopra",
                "type": "SUMMER",
                univId: currentUniv._id,
            },
            headers: {'Authorization': `Bearer ${token}`},
        }).then((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body).to.exist;
            expect(resp.body).to.have.property('title', 'Updated Summer Intern');
            expect(resp.body).to.have.property('description', 'Updated Summer Intern');
            expect(resp.body).to.have.property('createdBy', userId);
            expect(resp.body).to.have.property('country', 'Germany');
            expect(resp.body).to.have.property('company', 'Sopra');
            expect(resp.body).to.have.property('type', 'SUMMER');
            expect(resp.body).to.have.property('univId', currentUniv._id);
        })
    })
    it('should Delete Summer Intern', function () {
        cy.request({
            method: 'DELETE',
            url: Cypress.env('urlBackend') + '/Internship/' + saveInternship._id,
            headers: {'Authorization': `Bearer ${token}`},
        }).then((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body).to.exist;
        })
    })
    it('should Get All Summer Intern', function () {
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

