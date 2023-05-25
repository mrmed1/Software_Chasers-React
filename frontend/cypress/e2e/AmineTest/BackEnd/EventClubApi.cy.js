import { faker } from "@faker-js/faker";
describe("Event Api Test", () => {
  let token;
  let savedEventClub;
  let EventClubUpdated;
  let currentUniv;
  let participants = [];
  let StudentId;
  let Url = Cypress.env("baseUrl");

  before(() => {
    // get the login function from commands

    cy.loginAsClub("ClubTest", "10101010");

    cy.window().then((win) => {
      token = win.localStorage.getItem("token");
    });

    cy.getUniv();

    cy.window().then((win) => {
      currentUniv = win.localStorage.getItem("UnivId");
    });

    for (let i = 0; i < 3; i++) {
      cy.addStudent();
      cy.window().then((win) => {
        StudentId = win.localStorage.getItem("StudentId");
      });
      let Student = {
        person: StudentId,
        Date: faker.date.past(),
        status: "inProgress",
      };
      participants.push(Student);
      cy.deletePerson();
    }
  });

  context("Event Club section", () => {
    it("should add an Event Club", () => {
      const data = {
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
        domain: faker.lorem.word(),
        startDate: faker.date.future(),
        endDate: faker.date.future(),
        eventDate: faker.date.future(),
        participant: [],
        numberOfPlaces: faker.datatype.number(),
        link: faker.internet.url(),
        location: faker.lorem.word(),
        univId: currentUniv,
      };
      console.log(data);
      cy.request({
        method: "POST",
        url: `${Url}/eventClub`,
        body: data,
        headers: { Authorization: `Bearer ${token}` },
      }).then((resp) => {
        expect(resp.status).to.equal(201);
        console.log("Event", resp.body);
        expect(resp.body.name).to.eq(data.name);
        expect(resp.body.description).to.eq(data.description);
        expect(resp.body.domain).to.eq(data.domain);
        expect(resp.body.numberOfPlaces).to.eq(data.numberOfPlaces);
        expect(resp.body.link).to.eq(data.link);
        expect(resp.body.location).to.eq(data.location);
        expect(resp.body.univId).to.eq(data.univId);

        const eventDate = data.eventDate.toISOString();
        expect(resp.body.eventDate).to.eq(eventDate);

        const endDate = data.endDate.toISOString();
        expect(resp.body.endDate).to.eq(endDate);

        const startDate = data.startDate.toISOString();
        expect(resp.body.startDate).to.eq(startDate);

        expect(resp.body._id).to.exist;

        savedEventClub = resp.body;
      });
    });
    it("should the eventClub Club login to be the same as the logged-in Club", () => {
      cy.request({
        method: "GET",
        url: `${Url}/eventClub/${savedEventClub._id}`,
        headers: { Authorization: `Bearer ${token}` },
      }).then((resp) => {
        expect(resp.status).to.equal(200);
        console.log("Event Update", resp.body);
        expect(resp.body.club_id.login).to.eq("ClubTest");
      });
    });

    it("should update the  event Club added ", () => {
      const data = {
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
        domain: faker.lorem.word(),
        startDate: faker.date.future(),
        endDate: faker.date.future(),
        eventDate: faker.date.future(),
        participant: participants,
        numberOfPlaces: faker.datatype.number(),
        link: faker.internet.url(),
        location: faker.lorem.word(),
        univId: currentUniv,
      };

      cy.request({
        method: "PUT",
        url: `${Url}/eventClub/${savedEventClub._id}`,
        body: data,
        headers: { Authorization: `Bearer ${token}` },
      }).then((resp) => {
        expect(resp.status).to.equal(200);
        console.log("Event Update", resp.body);
        expect(resp.body.name).to.eq(data.name);
        expect(resp.body.description).to.eq(data.description);
        expect(resp.body.domain).to.eq(data.domain);
        expect(resp.body.numberOfPlaces).to.eq(data.numberOfPlaces);
        expect(resp.body.link).to.eq(data.link);
        expect(resp.body.location).to.eq(data.location);
        expect(resp.body.univId).to.eq(data.univId);

        const eventDate = data.eventDate.toISOString();
        expect(resp.body.eventDate).to.eq(eventDate);

        const endDate = data.endDate.toISOString();
        expect(resp.body.endDate).to.eq(endDate);

        const startDate = data.startDate.toISOString();
        expect(resp.body.startDate).to.eq(startDate);

        EventClubUpdated = resp.body;
      });
    });

    it("should get event Club by id after the update", () => {
      cy.request({
        method: "GET",
        url: `${Url}/eventClub/${savedEventClub._id}`,
        headers: { Authorization: `Bearer ${token}` },
      }).then((resp) => {
        expect(resp.status).to.equal(200);
        console.log("Event Update", resp.body);
        expect(resp.body.name).to.eq(EventClubUpdated.name);
        expect(resp.body.description).to.eq(EventClubUpdated.description);
        expect(resp.body.domain).to.eq(EventClubUpdated.domain);
        expect(resp.body.numberOfPlaces).to.eq(EventClubUpdated.numberOfPlaces);
        expect(resp.body.link).to.eq(EventClubUpdated.link);
        expect(resp.body.location).to.eq(EventClubUpdated.location);
        expect(resp.body.univId).to.eq(EventClubUpdated.univId);
        expect(resp.body.club_id.login).to.eq("ClubTest");

        const eventDate = EventClubUpdated.eventDate;
        expect(resp.body.eventDate).to.eq(eventDate);

        const endDate = EventClubUpdated.endDate;
        expect(resp.body.endDate).to.eq(endDate);

        const startDate = EventClubUpdated.startDate;
        expect(resp.body.startDate).to.eq(startDate);
      });
    });

    it("should get all  event Club ", () => {
      cy.request({
        method: "GET",
        url: `${Url}/eventClub`,
        headers: { Authorization: `Bearer ${token}` },
      }).then((resp) => {
        expect(resp.status).to.equal(200);

        const index = resp.body.findIndex(
          (obj) => obj._id === savedEventClub._id
        );
        expect(index).to.not.equal(-1);
      });
    });

    it("should delete an event Club", () => {
      cy.request({
        method: "DELETE",
        url: `${Url}/eventClub/${savedEventClub._id}`,
        headers: { Authorization: `Bearer ${token}` },
      }).then((resp) => {
        expect(resp.status).to.equal(200);
      });

      cy.request({
        method: "GET",
        url: `${Url}/eventClub`,
        headers: { Authorization: `Bearer ${token}` },
      }).then((resp) => {
        expect(resp.status).to.equal(200);
        const index = resp.body.findIndex(
          (obj) => obj._id === savedEventClub._id
        );
        expect(index).to.equal(-1);
      });
    });

    it("should fail to get event Club by id after delete", () => {
      cy.request({
        method: "GET",
        url: `${Url}/eventClub/${savedEventClub._id}`,
        headers: { Authorization: `Bearer ${token}` },
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.equal(404);
      });
    });
  });
});
