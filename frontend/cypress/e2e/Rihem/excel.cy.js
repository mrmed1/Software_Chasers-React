import {TOKEN_KEY} from "../../../src/Config/config";

http://127.0.0.1:3001//api/dg/importStudent/

     
describe("--PFA test api --", () => {    
    let token;
    let id;
    let tokenHeader
    let url= Cypress.env("urlBackend") 
    before(() => {
  
      // get the login function from commands
      // cy.wait(1000);
      // token = cy.login_as_adminclub().then((r) => {
      //   token = r;
        
      //   tokenHeader = `Bearer ${r}`;
      // });
      cy.loginMed(); 
      cy.wait(1500); 
      cy.window().then((win) => { 
          token = win.localStorage.getItem(TOKEN_KEY); 
      }); 
    });
it("Should can't add excel  ", () => {
    cy.wait(1000);
    cy.request({
      method: "POST",
      url: `${url}/importStudentv`,
      headers: {
        Authorization: tokenHeader,
      },

      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(404);
    });     
  });
  
});
