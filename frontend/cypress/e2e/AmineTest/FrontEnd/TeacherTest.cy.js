import { faker } from "@faker-js/faker";

describe("Crud Teacher Test", () => {
  let Url = "http://localhost:3000/enseignant";
  let savedTeacher;
  let updatedTeacher;


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

    cy.contains("Add Enseignant", { timeout: 100000 }).should("exist"); // Increased timeout to 10 seconds
  });

  context("Add Teacher  section", () => {
   it("Should show add Teacher Dialog and the add button disabled byDefault", () => {
      cy.wait(3000);
      cy.contains("Add Enseignant").should("exist");
      cy.getByData("FirstAdd-button").click();
      cy.wait(2000);
      cy.getById("AddDialog").should("exist");
      cy.getByData("add-button").should("exist").and("be.disabled");
    });

    it("Should add Event Successfully", () => {
      cy.getByData("FirstAdd-button").click();
       savedTeacher = {
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.imei(),
        dob: faker.date.past(),
        isPublic: true,
        isResponsible: true
      };
     
      cy.getByData("firstname").type(savedTeacher.firstname);
      cy.getByData("lastname").type(savedTeacher.lastname);
      cy.getByData("email").type(savedTeacher.email);
      cy.getByData("phone").type(savedTeacher.phone);
     
      cy.getByData("dob").type(savedTeacher.dob.toISOString().split("T")[0]);
      
      if (savedTeacher.isPublic) {
        cy.getByData("isPublic").click();
      }
      
      if (savedTeacher.isResponsible) {
        cy.getByData("isResponsible").click();
      }
    
     
     
  

      cy.getByData("add-button").should("exist").and("not.be.disabled");
      cy.getByData("add-button").click();
      cy.getById("AddDialog").should("not.exist");
      cy.contains("Add Enseignant", { timeout: 100000 }).should("exist"); // Increased timeout to 10 seconds

      clickUntilDisabled();
      cy.getByData("event-row").contains(savedTeacher.firstname).should("exist");
      cy.getByData("event-row").contains(savedTeacher.lastname).should("exist");

      cy.getByData("event-row").contains(savedTeacher.email).should("exist");

      cy.getByData("event-row").contains(savedTeacher.phone).should("exist");
    });
  it("Should not add Teacher with missing attributes", () => {
      cy.getByData("FirstAdd-button").click();
  
      cy.getByData("firstname").type(savedTeacher.firstname);
      cy.getByData("lastname").type(savedTeacher.lastname);
      cy.getByData("dob").type(savedTeacher.dob.toISOString().split("T")[0]);

      cy.getByData("add-button").should("exist").and("be.disabled");
      cy.getByData("add-button").click({ force: true });
      cy.getById("AddDialog").should("exist");
    });

    it("Should not add Teacher after canceling", () => {
        cy.getByData("FirstAdd-button").click();
        cy.getByData("firstname").type(savedTeacher.firstname);
        cy.getByData("lastname").type(savedTeacher.lastname);
        cy.getByData("email").type(savedTeacher.email);
        cy.getByData("phone").type(savedTeacher.phone);
       
        cy.getByData("dob").type(savedTeacher.dob.toISOString().split("T")[0]);
        
        if (savedTeacher.isPublic) {
          cy.getByData("isPublic").click();
        }
        
        if (savedTeacher.isResponsible) {
          cy.getByData("isResponsible").click();
        }
      ;

        cy.getByData("cancel-button").click();
        cy.wait(1500);
        cy.getById("AddDialog").should("not.exist");
  
        cy.contains("Add Enseignant", { timeout: 100000 }).should("exist"); // Increased timeout to 10 seconds

      clickUntilDisabled();
      cy.wait(1500);
      cy.getByData("event-row").each(($row) => {
        cy.wrap($row).should("not.have.text", savedTeacher.firstname); // Verify that the event name is not present in any event row
        cy.wrap($row).should("not.have.text", savedTeacher.lastname); // Verify that the event type is not present in any event row
        cy.wrap($row).should("not.have.text", savedTeacher.email); // Verify that the event date is not present in any event row
        cy.wrap($row).should("not.have.text", savedTeacher.phone); // Verify that the event description is not present in any event row
      });
      
      });
           
  });
  context("Details Teacher Section",()=>{
   
    it("Should show details Teacher Dialog", () => {
 
     
      cy.wait(2500);
      clickUntilDisabled();
      cy.wait(2500);
      cy.getByData("event-row")
        .contains(savedTeacher.email)
        .parent()
        .click();
    
      cy.getById("DetailsDialog").should("exist");
      

      cy.getById("firstname").should("have.text", savedTeacher.firstname);
      cy.getById("lastname").should("have.text", savedTeacher.lastname);
      cy.getById("email").should("have.text", savedTeacher.email);
      cy.getById("phone").should("have.text", savedTeacher.phone);
      cy.getById("login").should("have.text", savedTeacher.phone);

     
    });
    
  })

  context("Edit Teacher Section", () => {
    it("Should edit an Teacher and show the new details", () => {

      updatedTeacher = {
       firstname: faker.name.firstName(),
       lastname: faker.name.lastName(),
       email: faker.internet.email(),
       phone: faker.phone.imei(),
       dob: faker.date.past(),
       isPublic: false,
       isResponsible: false
     };
    
     


      clickUntilDisabled();
  
      cy.getByData("event-row")
        .contains(savedTeacher.email)
        .parent()
        .find("[data-test='FirstEdit-button']")
        .click();
  
      cy.getById("EditDialog").should("exist");
  
      cy.getByData("firstname").clear().type(updatedTeacher.firstname);
      cy.getByData("lastname").clear().type(updatedTeacher.lastname);
      cy.getByData("email").clear().type(updatedTeacher.email);
      cy.getByData("phone").clear().type(updatedTeacher.phone);
     
      cy.getByData("dob").clear().type(updatedTeacher.dob.toISOString().split("T")[0]);
    
  
      cy.getByData("save-button").should("exist").and("not.be.disabled");
      cy.getByData("save-button").click();
  
      cy.contains("Add Enseignant", { timeout: 100000 }).should("exist"); // Increased timeout to 10 seconds
      cy.wait(2500);
      clickUntilDisabled();
      cy.wait(2500);
   
      cy.getByData("event-row")
        .contains(updatedTeacher.email)
        .parent()
        .click();
        cy.wait(2500);
      cy.getById("DetailsDialog").should("exist");

    

    cy.getById("firstname").should("have.text", updatedTeacher.firstname);
    cy.getById("lastname").should("have.text", updatedTeacher.lastname);
    cy.getById("email").should("have.text", updatedTeacher.email);
    cy.getById("phone").should("have.text", updatedTeacher.phone);
    cy.getById("login").should("have.text", savedTeacher.phone);
    
   
    });
  });
  
  

  
  context("Delete Teacher  section", () => {
    it("Should show delete Teacher Dialog", () => {
      clickUntilDisabled();

      cy.getByData("event-row").contains(updatedTeacher.email)
        .parent()
        .find("[data-test='FirstDelete-button']")
        .click();

      cy.getById("DeleteDialog").should("exist");
    });

    it("Should not  delete the  Teacher  after canceling", () => {
      clickUntilDisabled();

      cy.getByData("event-row")
        .contains(updatedTeacher.email)
        .parent()
        .find("[data-test='FirstDelete-button']")
        .click();
      cy.getById("DeleteDialog").should("exist");

      cy.getByData("deleteCancel-button").click();
      cy.wait(1500);
      cy.getById("DeleteDialog").should("not.exist");

      cy.getByData("event-row").each(($row) => {
        cy.wrap($row).should("not.have.text", updatedTeacher.email); // Verify that the event name is not present in any event row
         });
    });

    it("Should delete Teacher Successfully", () => {
      clickUntilDisabled();

      cy.getByData("event-row")
        .contains(updatedTeacher.email, { timeout: 100000 })
        .parent()
        .find("[data-test='FirstDelete-button']")
        .click();
      cy.getById("DeleteDialog").should("exist");
      cy.getByData("delete-button").click();
      cy.contains("Add Enseignant", { timeout: 100000 }).should("exist"); // Increased timeout to 10 seconds

      clickUntilDisabled();
      cy.getByData("event-row").each(($row) => {
        cy.wrap($row).should("not.have.text", updatedTeacher.email); // Verify that the event name is not present in any event row
         });
    });
  });


});
