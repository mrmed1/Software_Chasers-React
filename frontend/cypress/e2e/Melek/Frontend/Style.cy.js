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
    cy.request({
        method: "GET",
        url: `${API_URL}/${idGanikas}`,
        headers: {
          Authorization: `Bearer ${GanikasToken}`,
        },
  
        failOnStatusCode: false,
      }).then((resp) => {
        Ganikas= resp.body
    
        expect(resp.status).to.eq(200);
      });
    cy.visit(`${reactUrl}/students/profile`);

  });
  describe("ToogleStyle",()=>{



    it("should toggle the Style Button",()=>{
       

          cy.wait(2000)
          
          
         
          if (Ganikas?.style === "light") {
            cy.getByData("toggleStyleBtn").click();
            cy.get("[data-test='card']").each((card) => {
              cy.wrap(card).should("have.css", "background-color", "rgb(35, 40, 62)");
            });
            cy.get("[data-test='header']").each((header) => {
              cy.wrap(header).should("have.css", "color", "rgb(205, 205, 255)");

            });
              
   

         
        } else {
            cy.getByData("toggleStyleBtn").click();
            cy.get("[data-test='card']").each((card) => {
              cy.wrap(card).should("not.have.css", "background-color", "rgb(35, 40, 62)");
            });
            cy.get("[data-test='header']").each((header) => {
              cy.wrap(header).should("not.have.css", "color", "rgb(205, 205, 255)");
            });
         

            
          }
          
   
    })
  })