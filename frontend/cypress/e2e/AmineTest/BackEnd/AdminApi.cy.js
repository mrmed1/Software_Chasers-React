import { faker } from "@faker-js/faker";
describe("Admin Api Test", () => {
  let token;
  let savedAdmin;
  let AdminUpdated;

  let Url = Cypress.env("baseUrlBack");

  before(() => {
    // get the login function from commands

    cy.login();
    cy.wait(2000);
    cy.window().then((win) => {
      token = win.localStorage.getItem("token");
    });
  });

  context("Admin section", () => {
    it("should add Admin", () => {
      const data = {
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.imei(),
        role: "ADMIN",
        dob: faker.date.past(),
        access:[]
      };

      cy.request({
        method: "POST",
        url: `${Url}/Persons`,
        body: data,
        headers: { Authorization: `Bearer ${token}` },
      }).then((resp) => {
        expect(resp.status).to.equal(201);
        console.log("Event", resp.body);
        expect(resp.body.firstname).to.eq(data.firstname);
        expect(resp.body.lastname).to.eq(data.lastname);
        expect(resp.body.phone).to.eq(data.phone);
        expect(resp.body.login).to.eq(data.phone);
        expect(resp.body.role).to.eq(data.role);
        const expectedDate = data.dob.toISOString();
        expect(resp.body.dob).to.eq(expectedDate);
        expect(resp.body._id).to.exist;
        expect(resp.body.access).to.eql(data.access);
        savedAdmin = resp.body;
        cy.wait(2000);
      });
    });

    it("should update the event added ", () => {
      const data = {
        firstname: faker.person.firstName(),
        lastname: faker.person.firstName(),
        email: faker.internet.email(),
        login: savedAdmin.login,
        password: savedAdmin.password,
        phone: faker.phone.imei(),
        role: "ADMIN",
        access:["MANAGEEVENTS","MANAGESTUDENT"],
        dob: faker.date.past(),
      };

      cy.request({
        method: "PUT",
        url: `${Url}/Persons/${savedAdmin._id}`,
        body: data,
        headers: { Authorization: `Bearer ${token}` },
      }).then((resp) => {
        expect(resp.status).to.equal(200);
        console.log("ADmin", resp.body);
        console.log(resp.body.access, data.access);
        expect(resp.body.firstname).to.eq(data.firstname);
        expect(resp.body.lastname).to.eq(data.lastname);
        expect(resp.body.phone).to.eq(data.phone);
        expect(resp.body.login).to.eq(data.login);
        expect(resp.body.password).to.eq(savedAdmin.password);
        expect(resp.body.access).to.eql(data.access);

    
        expect(resp.body.role).to.eq(data.role);

        const expectedDate = data.dob.toISOString();
        expect(resp.body.dob).to.eq(expectedDate);

        AdminUpdated = resp.body;
      });
    });
    it("should get all Admin ", () => {
      cy.request({
        method: "GET",
        url: `${Url}/Persons`,
        headers: { Authorization: `Bearer ${token}` },
      }).then((resp) => {
        expect(resp.status).to.equal(200);

        const index = resp.body.findIndex((obj) => obj._id === savedAdmin._id);
        expect(index).to.not.equal(-1);
      });
    });
    it("Get Admin by id ", () => {
      cy.request({
        method: "GET",
        url: `${Url}/Persons/${savedAdmin._id}`,
        headers: { Authorization: `Bearer ${token}` },
      }).then((resp) => {
        expect(resp.status).to.equal(200);

        expect(resp.body.lastname).to.eq(AdminUpdated.lastname);
        expect(resp.body.firstname).to.eq(AdminUpdated.firstname);
        expect(resp.body.phone).to.eq(AdminUpdated.phone);

        expect(resp.body.login).to.eq(AdminUpdated.login);
        expect(resp.body.password).to.eq(AdminUpdated.password);
        expect(resp.body.role).to.eq(AdminUpdated.role);
        expect(resp.body.dob).to.eq(AdminUpdated.dob);
      });
    });

    it("should delete Admin", () => {
      cy.request({
        method: "DELETE",
        url: `${Url}/Persons/${savedAdmin._id}`,
        headers: { Authorization: `Bearer ${token}` },
      }).then((resp) => {
        expect(resp.status).to.equal(200);
      });
      cy.wait(2000);
      cy.request({
        method: "GET",
        url: `${Url}/Persons`,
        headers: { Authorization: `Bearer ${token}` },
      }).then((resp) => {
        expect(resp.status).to.equal(200);
        const index = resp.body.findIndex((obj) => obj._id === savedAdmin._id);
        expect(index).to.equal(-1);
      });
    });

    it("GEt Admin by id after delete", () => {
      cy.wait(2000);
      cy.request({
        method: "GET",
        url: `${Url}/Admin/${savedAdmin._id}`,
        headers: { Authorization: `Bearer ${token}` },
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.equal(404);
      });
    });
  });
});
