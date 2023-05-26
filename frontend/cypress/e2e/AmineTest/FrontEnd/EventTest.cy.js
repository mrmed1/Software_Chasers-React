import { faker } from "@faker-js/faker";

describe("Crud Event Test", () => {
 
  let Url ="http://localhost:3001/event";
  let lastEventName;
  const clickUntilDisabled = () => {
    cy.get("[data-testid='KeyboardArrowRightIcon']")
      .should("exist")
      .then(($icon) => {
        const isDisabled = $icon.closest("button").hasClass("Mui-disabled");
        if (!isDisabled) {
          cy.wrap($icon).click({ force: true });
          clickUntilDisabled();
        }
      });
  };
  beforeEach(() => {
    window.localStorage.removeItem("token");
    cy.loginAsAdmin();
    cy.wait(3000);
    cy.visit(Url);
  });

  context("Add Event  section", () => {
    it("Should show add Event Dialog and the add button disabled byDefault", () => {
        cy.wait(2000);
      cy.getByData("FirstAdd-button").click();
      cy.wait(2000);
      cy.getById("AddDialog").should("exist");
      cy.getByData("add-button").should("exist").and("be.disabled");
    });

    it("Should add Event Successfully", () => {
      cy.visit(Url);
      cy.getByData("FirstAdd-button").click();
      const name = faker.lorem.word();

      cy.getByData("name").type(name);
      lastEventName = name;
      const type = faker.lorem.word();
      cy.getByData("type").type(type);
      const description = faker.lorem.sentence();
      cy.getByData("description").type(description);
      const Date = faker.date.future();
      const eventDateToAdd = Date.toISOString().split("T")[0];
      cy.getByData("eventDate").type(eventDateToAdd);

      const eventDate = Date.toLocaleDateString();

      cy.getByData("add-button").should("exist").and("not.be.disabled");
      cy.getByData("add-button").click();
      cy.getById("AddDialog").should("not.exist");

  
      clickUntilDisabled();
      cy.getByData("event-row").contains(name).should("exist");
      cy.getByData("event-row").contains(type).should("exist");

      cy.getByData("event-row").contains(eventDate).should("exist");

      cy.getByData("event-row").contains(description).should("exist");
    });
    /* it("Should not add Event with missing attributes", () => {
      cy.visit(Url);
      cy.getByData("FirstAdd-button").click();
      const name = faker.lorem.word();

      cy.getByData("name").type(name);
      const type = faker.lorem.word();
      cy.getByData("type").type(type);

      const Date = faker.date.future();
      const eventDateToAdd = Date.toISOString().split("T")[0];
      cy.getByData("eventDate").type(eventDateToAdd);

      cy.getByData("add-button").should("exist").and("be.disabled");
      cy.getByData("add-button").click({ force: true });
      cy.getById("AddDialog").should("exist");
    });
*/
  });
  context("Delete Event  section", () => {
    it("Should show delete Event Dialog", () => {
      cy.visit(Url);

      clickUntilDisabled();

      cy.getByData("event-row")
        .contains(lastEventName)
        .parent()
        .find("[data-test='FirstDelete-button']")
        .click();
      cy.getById("DeleteDialog").should("exist");
    });

    it("Should delete Event Successfully", () => {
      cy.visit(Url);

      
      clickUntilDisabled();

      cy.getByData("event-row")
        .contains(lastEventName)
        .parent()
        .find("[data-test='FirstDelete-button']")
        .click();
      cy.getById("DeleteDialog").should("exist");
    cy.getByData("delete-button").click();
    cy.wait(1000);
      clickUntilDisabled();
      cy.getByData("event-row").contains(lastEventName).should("not.exist");
    });
  });
});
