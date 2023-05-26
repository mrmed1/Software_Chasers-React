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

  describe("Experience ! ", () => {

    it("it can Create new Experience ", () => {

      cy.wait(1000);
     cy.get(':nth-child(1) > .content > .pencil').click();

      cy.getByData("jobTitle").type("Software Developer");
      cy.getByData("companyName").type("ABC Company");

      cy.getByData("jobType").click();
      cy.contains("div[role='option']", "Engineering").click();

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
      cy.get(`[data-test="experienceModal-Software Developer"]`).click();
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
      cy.get(`[data-test="deleteExperienceModal-Software Developer Updated"]`).click();
    
      cy.get(".primary").click();
      cy.get("body").type("{esc}");

      // Assert that the experience is no longer present in the UI
      cy.contains("h2", "Software Developer Updated").should("not.exist"); 
    });
  })
  describe("Education ! ", () => {
    it("it can Create new Experience ", () => {
      cy.get(':nth-child(2) > .content > .pencil').click();
      cy.wait(1000)
      cy.getByData("diploma").type("Bachelor's Degree");
      cy.getByData("university").type("ABC University");
      cy.getByData("startDate").type("2022-01-01");
      cy.getByData("endDate").type("2022-12-31");

      const selectedClubs = ["Orenda", "IGA"];
      selectedClubs.forEach((club) => {
        cy.getByData("clubs").click();
        cy.contains("div[role='option']", club).click();
      });

      cy.getByData("savingEducation").click()
      cy.wait(1000)
      cy.get("body").type("{esc}");

      cy.contains("h2", "Bachelor's Degree");
      cy.contains("strong", "ABC University");
      cy.contains("from 2022-01-01 to 2022-12-31");

    });

    it("it can update Education", () => {
      // Click on the pencil icon of the second education item
      cy.get(`[data-test="educationModal-Bachelor's Degree"]`).click();
      cy.wait(1000);
      cy.getByData("diploma").type(" Updated");
      cy.getByData("university").clear().type("Updated ABC University");
      cy.getByData("startDate").clear().type("2023-01-01");
      cy.getByData("endDate").clear().type("2023-12-31");
      cy.getByData("clubs").click();
      cy.contains("div[role='option']", "J2I").click();
    
   
  
    
      // Click the submit button to save the updates
     
      cy.getByData("savingEducation").click();
      cy.wait(1000);
      cy.get("body").type("{esc}");
    
     
      cy.contains("h2", "Bachelor's Degree Updated");
      cy.contains("strong", "Updated ABC University");
      cy.contains("from 2023-01-01 to 2023-12-31");
    });
    
it("it can delete that  Education", () => {
 

  cy.get(`[data-test="deleteEducationModal-Bachelor's Degree Updated"]`).click();
       cy.get(".primary").click();
        cy.get("body").type("{esc}");

        cy.contains("h2", "Bachelor's Degree Updated").should("not.exist");
        cy.contains("strong", "Updated ABC University").should("not.exist");
        cy.contains("from 2023-01-01 to 2023-12-31").should("not.exist");
})


  });

  describe("Skills ! ",()=>{

    it("Should add skills !",()=>{

      cy.getById('SkillsModal').click()
      cy.getById('SKILLSlIST').click()
      const selectedSkills = ["Vue.js", "Docker"];
     selectedSkills.forEach((skill) => {
    cy.contains("div[role='option']", skill).click();
  })

  
  cy.get('button[data-test="addSkills"]').click({ force: true });
  cy.wait(1000);
  cy.get("body").type("{esc}");


        cy.contains(".skills__list-item", "vue").should("be.visible");
        cy.contains(".skills__list-item", "docker").should("be.visible");
    })

    it("Should delete the  skills added  !",()=>{
      cy.wait(1000); // Adjust the wait time as needed
      cy.getByData(`Deleteskill-vue`).click();
      cy.get('.primary').click()
     cy.wait(1000);
    cy.get("body").type("{esc}");

    //-----------
    cy.getByData(`Deleteskill-docker`).click();
    cy.get('.primary').click()
   cy.wait(1000);
   cy.get("body").type("{esc}");

   cy.contains(".skills__list-item", "vue").should("not.exist");
   cy.contains(".skills__list-item", "docker").should("not.exist");



        
    })



  })


});
