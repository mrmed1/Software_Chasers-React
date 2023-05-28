import { faker } from "@faker-js/faker";

describe("Crud Event Test", () => {
  let Url = "http://localhost:3000/event";
  let eventName;
  let eventType
  let eventDescription;
  let eventDateDate;
  let isoDate;
  let EventUpdated={};
  
 
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

    cy.contains("Add Event", { timeout: 100000 }).should("exist"); // Increased timeout to 10 seconds
  });

  context("Add Event  section", () => {
   it("Should show add Event Dialog and the add button disabled byDefault", () => {
      cy.wait(3000);
      cy.contains("Add Event").should("exist");
      cy.getByData("FirstAdd-button").click();
      cy.wait(2000);
      cy.getById("AddDialog").should("exist");
      cy.getByData("add-button").should("exist").and("be.disabled");
    });

    it("Should add Event Successfully", () => {
      cy.getByData("FirstAdd-button").click();
      const name = faker.lorem.word();

      cy.getByData("name").type(name);
      eventName = name;
      const type = faker.lorem.word();
      eventType=type;
      cy.getByData("type").type(type);
      const description = faker.lorem.sentence();
      eventDescription=description;
      cy.getByData("description").type(description);
      const Date = faker.date.future();
      const eventDateToAdd = Date.toISOString().split("T")[0];
      isoDate=eventDateToAdd;
      cy.getByData("eventDate").type(eventDateToAdd);
     
      const eventDate = Date.toLocaleDateString();
      eventDateDate=eventDate;

      cy.getByData("add-button").should("exist").and("not.be.disabled");
      cy.getByData("add-button").click();
      cy.getById("AddDialog").should("not.exist");
      cy.contains("Add Event", { timeout: 100000 }).should("exist"); // Increased timeout to 10 seconds

      clickUntilDisabled();
      cy.getByData("event-row").contains(name).should("exist");
      cy.getByData("event-row").contains(type).should("exist");

      cy.getByData("event-row").contains(eventDate).should("exist");

      cy.getByData("event-row").contains(description).should("exist");
    });
  it("Should not add Event with missing attributes", () => {
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
    it("Should not add Event after canceling", () => {
        cy.getByData("FirstAdd-button").click();
        const name = faker.lorem.word();

        cy.getByData("name").type(name);
        const type = faker.lorem.word();
        cy.getByData("type").type(type);
        const description = faker.lorem.sentence();
        cy.getByData("description").type(description);
        const Date = faker.date.future();
        const eventDateToAdd = Date.toISOString().split("T")[0];
        cy.getByData("eventDate").type(eventDateToAdd);
       
      const eventDate = Date.toLocaleDateString();

        cy.getByData("cancel-button").click();
        cy.wait(1500);
        cy.getById("AddDialog").should("not.exist");
  
        cy.contains("Add Event", { timeout: 100000 }).should("exist"); // Increased timeout to 10 seconds

      clickUntilDisabled();
      cy.wait(1500);
      cy.getByData("event-row").each(($row) => {
        cy.wrap($row).should("not.have.text", name); // Verify that the event name is not present in any event row
        cy.wrap($row).should("not.have.text", type); // Verify that the event type is not present in any event row
        cy.wrap($row).should("not.have.text", eventDate); // Verify that the event date is not present in any event row
        cy.wrap($row).should("not.have.text", description); // Verify that the event description is not present in any event row
      });
      
      });
           
  });
  context("Details Event Section",()=>{
   
    it("Should show details Event Dialog", () => {
      let currentUniv;
    
      clickUntilDisabled();
    
      cy.getByData("event-row")
        .contains(eventName)
        .parent()
        .click();
    
      cy.getById("DetailsDialog").should("exist");
      
      cy.getUniv();
    
      cy.window().then((win) => {
        cy.wait(2500); // Adjust the wait time as needed
        currentUniv = win.localStorage.getItem("UnivName");
        cy.log(currentUniv); // Log the currentUniv value to see if it is correctly retrieved
      });
    
      cy.getById("name").should("have.text", eventName);
      cy.getById("type").should("have.text", eventType);
      cy.getById("description").should("have.text", eventDescription);
      cy.getById("eventDate").should("have.text", eventDateDate);
      cy.getById("univId").then(($element) => {
        expect($element.text()).to.eq(currentUniv); // Use the retrieved currentUniv value in the assertion
      });
    });
    
  })

  context("Edit Event Section", () => {
    it("Should edit an Event and show the new details", () => {
      clickUntilDisabled();
  
      cy.getByData("event-row")
        .contains(eventName)
        .parent()
        .find("[data-test='FirstEdit-button']")
        .click();
  
      cy.getById("EditDialog").should("exist");
  
      const name = faker.lorem.word();
      cy.getByData("name").clear().type(name);
      EventUpdated.eventName = name;
  
      const type = faker.lorem.word();
      cy.getByData("type").clear().type(type);
      EventUpdated.eventType = type;
  
      const description = faker.lorem.sentence();
      cy.getByData("description").clear().type(description);
      EventUpdated.eventDescription = description;
  
      const Date = faker.date.future();
      const eventDateToAdd = Date.toISOString().split("T")[0];
      cy.getByData("eventDate").clear().type(eventDateToAdd);
  
      const eventDate = Date.toLocaleDateString();
      EventUpdated.eventDateDate = eventDate;
  
      cy.getByData("save-button").should("exist").and("not.be.disabled");
      cy.getByData("save-button").click();
  
      cy.contains("Add Event", { timeout: 100000 }).should("exist"); // Increased timeout to 10 seconds
      cy.wait(2500);
      clickUntilDisabled();
      cy.wait(2500);
      let currentUniv;
      cy.getByData("event-row")
        .contains(EventUpdated.eventName)
        .parent()
        .click();
        cy.wait(2500);
      cy.getById("DetailsDialog").should("exist");
  
      cy.getUniv();
  
      cy.window().then((win) => {
        cy.wait(2500); // Adjust the wait time as needed
        currentUniv = win.localStorage.getItem("UnivName");
        cy.log(currentUniv); // Log the currentUniv value to see if it is correctly retrieved
      });
  
      cy.getById("name").should("have.text", EventUpdated.eventName);
      cy.getById("type").should("have.text", EventUpdated.eventType);
      cy.getById("description").should("have.text", EventUpdated.eventDescription);
      cy.getById("eventDate").should("have.text", EventUpdated.eventDateDate);
      cy.getById("univId").then(($element) => {
        expect($element.text()).to.eq(currentUniv); // Use the retrieved currentUniv value in the assertion
      });
    });
  });
  
  

  
  context("Delete Event  section", () => {
   
    it("Should not  delete the  Event  after canceling", () => {
      clickUntilDisabled();

      cy.getByData("event-row")
        .contains(EventUpdated.eventName)
        .parent()
        .find("[data-test='FirstDelete-button']")
        .click();
      cy.getById("DeleteDialog").should("exist");

      cy.getByData("deleteCancel-button").click();
      cy.wait(1500);
      cy.getById("DeleteDialog").should("not.exist");

      cy.getByData("event-row").each(($row) => {
        cy.wrap($row).should("not.have.text", EventUpdated.eventName); // Verify that the event name is not present in any event row
         });
    });

    it("Should delete Event Successfully", () => {
      clickUntilDisabled();

      cy.getByData("event-row")
        .contains(EventUpdated.eventName, { timeout: 100000 })
        .parent()
        .find("[data-test='FirstDelete-button']")
        .click();
      cy.getById("DeleteDialog").should("exist");
      cy.getByData("delete-button").click();
      cy.contains("Add Event", { timeout: 100000 }).should("exist"); // Increased timeout to 10 seconds

      clickUntilDisabled();
      cy.getByData("event-row").each(($row) => {
        cy.wrap($row).should("not.have.text", EventUpdated.eventName); // Verify that the event name is not present in any event row
         });
    });
  });


});
