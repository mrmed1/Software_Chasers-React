const reactUrl = "http://localhost:3000";
const GanikasToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2E2MDkwYzFhMDgzNGE1MWFjNTI0NmUiLCJyb2xlIjoiU1RVREVOVCIsImlzUmVzcG9uc2libGUiOmZhbHNlLCJpYXQiOjE2ODQ5NTE1MTN9.UytgYPI8REsty1Kk3xeE6-hc2cwFa3M2wRx7dqEUbxk";
let Ganikas;

let idGanikas = "63a6090c1a0834a51ac5246e";
const API_URL = Cypress.env("urlBackend") + "/Persons";
beforeEach(() => {
  //  cy.clearToken();
  //    --- connect as ganikas

  localStorage.setItem("jwtToken", GanikasToken);
  cy.visit(`${reactUrl}/students/profile`);
});
describe("CV Page ", () => {
  it("it can Create new Experience ", () => {
    cy.wait(1000);
    cy.get(":nth-child(1) > .content > .pencil").click();
    cy.getByData("jobTitle").type("Software Developer");
    cy.getByData("companyName").type("ABC Company");

    cy.getByData("jobType").click(); // Open the dropdown
    cy.contains("div[role='option']", "Engineering").click(); // Select the option by its text

    cy.getByData("startDate").type("2022-01-01");

    cy.getByData("endDate").type("2022-12-31");
    cy.getByData("competences").click(); // Open the dropdown

    const competences = ["HTML", "CSS", "Angular"];

    competences.forEach((competence) => {
      cy.contains("div[role='option']", competence).click(); // Select each option by its text
    });
    cy.getByData("placeHybride").click();

    cy.getByData("experienceDesctiption").type(
      "Worked on frontend development projects."
    );

    // Select "Hybride" radio button
    cy.getByData("experiencebtn").click();
    cy.wait(1000);
    cy.get("body").click();
    cy.get("body").type("{esc}");

    cy.contains("h2", "Software Developer");
    cy.contains("strong", "ABC Company");
    cy.contains("h4", "Worked on frontend development projects.");

    cy.contains("strong", "html, css, angular");
  });

  it("can update the added Experience", () => {
    cy.wait(1000);
    cy.get(':nth-child(6) > .header > [data-test="experienceModal"]')
      .last()
      .click();
    cy.wait(1000);
    // Update the fields with new values
    cy.getByData("jobTitle").type(" Updated");
    cy.getByData("companyName").clear().type("Updated ABC Company");
    cy.getByData("jobType").click(); // Open the dropdown
    cy.contains("div[role='option']", "Sales").click();
    // Update job type
    cy.getByData("startDate").clear().type("2023-01-01"); // Update start date
    cy.getByData("endDate").clear().type("2023-12-31"); // Update end date
    cy.getByData("competences").click(); // Open the dropdown

    // Clear existing competences and select new ones

    const updatedCompetences = ["React", "MySQL", "Java"];
    updatedCompetences.forEach((competence) => {
      cy.contains("div[role='option']", competence).click();
    });

    cy.getByData("placeHybride").click(); // Select "Hybride" radio button
    cy.getByData("experienceDesctiption").clear().type("Updated description"); // Update description

    cy.getByData("experiencebtn").click(); // Click the update button
    cy.wait(1000);
    cy.get("body").type("{esc}");

    // Assert the updated information
    cy.contains("h2", "Software Developer Updated");
    cy.contains("strong", "Updated ABC Company");
    cy.contains("h4", "Updated description");
    cy.contains("strong", "html, css, angular, react, mysql, javascript");
  });
  
  it("can delete the last Added Experience", () => {
    cy.get(
      ':nth-last-child(1) > .header > div > [data-test="deleteExperienceModal"]'
    ).click();
    cy.get(".primary").click();
    cy.get("body").type("{esc}");

    // Assert that the experience is no longer present in the UI
    cy.contains("h2", "Software Developer Updated").should("not.exist");
  });
});
