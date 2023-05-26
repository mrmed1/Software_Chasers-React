 
import { faker } from '@faker-js/faker';
describe("Event Api Test", () => {
  let token;
  let saveEvent;
  let EventUpdated;
  let currentUniv;
  let Url=Cypress.env('baseUrlBack')

  before(() => {
    // get the login function from commands
    cy.wait(6000);
    cy.login();
    cy.wait(2000);
    cy.window().then((win) => {
      token = win.localStorage.getItem("token");
    });
  });

  context("Event section", () => {
    it("should add event", () => {
      cy.getUniv();
      cy.wait(2000);
      cy.window().then((win) => {
        currentUniv = win.localStorage.getItem("UnivId");
      });
      console.log(currentUniv);
      const data = {
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
        type: faker.lorem.word(),
        univId: currentUniv,
        eventDate: faker.date.future(),
      };
console.log(data);
      cy.request({
        method: "POST",
        url: `${Url}/Event`,
        body: data,
        headers: { 'Authorization': `Bearer ${token}` },
      }).then((resp) => {
        expect(resp.status).to.equal(201);
        console.log("Event", resp.body);
        expect(resp.body.name).to.eq(data.name);
        expect(resp.body.description).to.eq(data.description);
        expect(resp.body.type).to.eq(data.type);
        expect(resp.body.univId).to.eq(data.univId);
        const expectedDate = data.eventDate.toISOString();
        expect(resp.body.eventDate).to.eq(expectedDate);
        expect(resp.body._id).to.exist;

        saveEvent = resp.body;
        cy.wait(2000);
      });
    });


    it("should update the event added ", () => {
      const data = {
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
        type: faker.lorem.word(),
        univId: currentUniv,
        eventDate: faker.date.future(),
      };
        
      cy.request({
        method: "PUT",
        url: `${Url}/Event/${saveEvent._id}`,
        body: data,
        headers: { 'Authorization': `Bearer ${token}` },
      }).then((resp) => {
       
       
        expect(resp.status).to.equal(200);
        console.log("Event Update", resp.body);
        expect(resp.body.name).to.eq(data.name);
        expect(resp.body.description).to.eq(data.description);
        expect(resp.body.type).to.eq(data.type);
        expect(resp.body.univId).to.eq(data.univId);
        const expectedDate = data.eventDate.toISOString();
        expect(resp.body.eventDate).to.eq(expectedDate);
        EventUpdated = resp.body;
         
      });
    });
 it("should get all Event ", () => {
     
    cy.request({
      method: "GET",
      url: `${Url}/Event`,
      headers: { 'Authorization': `Bearer ${token}` },
    
    }).then((resp) => {
      expect(resp.status).to.equal(200);
     
      const index = resp.body.findIndex(
        (obj) => obj._id === saveEvent._id 
      );
      expect(index).to.not.equal(-1);
    });
  });
  it("Get Event by id ", () => {
    
    cy.request({
      method: "GET",
      url: `${Url}/Event/${saveEvent._id}`,
      headers: { 'Authorization': `Bearer ${token}` },
    }).then((resp) => {

      expect(resp.status).to.equal(200);
      console.log('EventUpdated',EventUpdated)
      console.log("resp.body",resp.body)
      expect(resp.body.name).to.eq(EventUpdated.name);
        expect(resp.body.description).to.eq(EventUpdated.description);
        expect(resp.body.type).to.eq(EventUpdated.type);
        expect(resp.body.univId).to.eq(EventUpdated.univId);
   
        expect(resp.body.eventDate).to.eq(EventUpdated.eventDate);
       
    });
  });
    
    it("should delete Event", () => {
      cy.request({
        method: "DELETE",
        url: `${Url}/Event/${saveEvent._id}`,
        headers: { 'Authorization': `Bearer ${token}` },
      }).then((resp) => {
        expect(resp.status).to.equal(200);
      });
      cy.wait(2000);
      cy.request({
        method: "GET",
        url: `${Url}/Event`,
        headers: { 'Authorization': `Bearer ${token}` },
      }).then((resp) => {
        expect(resp.status).to.equal(200);
        const index = resp.body.findIndex((obj) => obj._id === saveEvent._id);
        expect(index).to.equal(-1);
      });
    });

    it("GEt event by id after delete", () => {
      cy.wait(2000);
      cy.request({
        method: "GET",
        url: `${Url}/Event/${saveEvent._id}`,
        headers: { 'Authorization': `Bearer ${token}` },
        failOnStatusCode: false
        
      }).then((resp) => {
       
       
        expect(resp.status).to.equal(404);
      
    
        
      });
    });
  });



});
