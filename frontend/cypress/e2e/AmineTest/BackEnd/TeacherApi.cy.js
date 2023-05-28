 
import { faker } from '@faker-js/faker';
describe("Teacher Api Test", () => {
  let token;
  let savedTeacher;
  let TeacherUpdated;
 
  let Url=Cypress.env('urlBackend')

  before(() => {
    // get the login function from commands
    
    cy.login();
    cy.wait(2000);
    cy.window().then((win) => {
      token = win.localStorage.getItem("token");
    });
  });

  context("Teacher section", () => {
    it("should add Teacher", () => {
     
    
    
      const data = {
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.imei(),
        role: "TEACHER",
        dob: faker.date.past(),
        isPublic: true,
        isResponsible: true
      };
 
      cy.request({
        method: "POST",
        url: `${Url}/Persons`,
        body: data,
        headers: { 'Authorization': `Bearer ${token}` },
      }).then((resp) => {
        expect(resp.status).to.equal(201);
        console.log("Event", resp.body);
        expect(resp.body.firstname).to.eq(data.firstname);
        expect(resp.body.lastname).to.eq(data.lastname);
        expect(resp.body.phone).to.eq(data.phone);
        expect(resp.body.login).to.eq(data.phone);
        expect(resp.body.role).to.eq(data.role);
        expect(resp.body.isPublic).to.eq(data.isPublic);
        expect(resp.body.isResponsible).to.eq(data.isResponsible);
        const expectedDate = data.dob.toISOString();
        expect(resp.body.dob).to.eq(expectedDate);
        expect(resp.body._id).to.exist;

        savedTeacher = resp.body;
        cy.wait(2000);
      });
    });


    it("should update the event added ", () => {
      const data = {
        firstname: faker.person.firstName(),
        lastname: faker.person.firstName(),
        email: faker.internet.email(),
        login:savedTeacher.login,
        password: savedTeacher.password,
        phone:faker.phone.imei(),
        role: "TEACHER",  
        dob :faker.date.past(),
        isPublic: false,
        isResponsible: false
      };
 
        
      cy.request({
        method: "PUT",
        url: `${Url}/Persons/${savedTeacher._id}`,
        body: data,
        headers: { 'Authorization': `Bearer ${token}` },
      }).then((resp) => {
       
        expect(resp.status).to.equal(200);
        console.log("Event", resp.body);
        expect(resp.body.firstname).to.eq(data.firstname);
        expect(resp.body.lastname).to.eq(data.lastname);
        expect(resp.body.phone).to.eq(data.phone);
     
        expect(resp.body.role).to.eq(data.role);
        expect(resp.body.isPublic).to.eq(data.isPublic);
        expect(resp.body.isResponsible).to.eq(data.isResponsible);
        const expectedDate = data.dob.toISOString();
        expect(resp.body.dob).to.eq(expectedDate);
    

        TeacherUpdated = resp.body;
         
      });
    });
 it("should get all Teacher ", () => {
     
    cy.request({
      method: "GET",
      url: `${Url}/Persons`,
      headers: { 'Authorization': `Bearer ${token}` },
    
    }).then((resp) => {
      expect(resp.status).to.equal(200);
     
      const index = resp.body.findIndex(
        (obj) => obj._id === savedTeacher._id 
      );
      expect(index).to.not.equal(-1);
    });
  });
  it("Get Teacher by id ", () => {
    
    cy.request({
      method: "GET",
      url: `${Url}/Persons/${savedTeacher._id}`,
      headers: { 'Authorization': `Bearer ${token}` },
    }).then((resp) => {

      expect(resp.status).to.equal(200);
     
      expect(resp.body.lastname).to.eq(TeacherUpdated.lastname);
      expect(resp.body.firstname).to.eq(TeacherUpdated.firstname);
      expect(resp.body.phone).to.eq(TeacherUpdated.phone);
      expect(resp.body.role).to.eq(TeacherUpdated.role);
      expect(resp.body.isPublic).to.eq(TeacherUpdated.isPublic);
      expect(resp.body.isResponsible).to.eq(TeacherUpdated.isResponsible);
 
        expect(resp.body.dob).to.eq(TeacherUpdated.dob);
       
    });
  });
 
    it("should delete Teacher", () => {
      cy.request({
        method: "DELETE",
        url: `${Url}/Persons/${savedTeacher._id}`,
        headers: { 'Authorization': `Bearer ${token}` },
      }).then((resp) => {
        expect(resp.status).to.equal(200);
      });
      cy.wait(2000);
      cy.request({
        method: "GET",
        url: `${Url}/Persons`,
        headers: { 'Authorization': `Bearer ${token}` },
      }).then((resp) => {
        expect(resp.status).to.equal(200);
        const index = resp.body.findIndex((obj) => obj._id === savedTeacher._id);
        expect(index).to.equal(-1);
      });
    });

  it("GEt Teacher by id after delete", () => {
      cy.wait(2000);
      cy.request({
        method: "GET",
        url: `${Url}/Persons/${savedTeacher._id}`,
        headers: { 'Authorization': `Bearer ${token}` },
        failOnStatusCode: false
        
      }).then((resp) => {
       
       
        expect(resp.status).to.equal(404);
      
    
        
      });
    }); 
  });



});
