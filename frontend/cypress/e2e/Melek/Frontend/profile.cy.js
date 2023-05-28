const reactUrl = "http://localhost:3000";
  const GanikasToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2E2MDkwYzFhMDgzNGE1MWFjNTI0NmUiLCJyb2xlIjoiU1RVREVOVCIsImlzUmVzcG9uc2libGUiOmZhbHNlLCJpYXQiOjE2ODQ5NTE1MTN9.UytgYPI8REsty1Kk3xeE6-hc2cwFa3M2wRx7dqEUbxk";
  let Ganikas;

  let idGanikas = "63a6090c1a0834a51ac5246e";
  const API_URL = Cypress.env("urlBackend") + "/Persons";describe("Profile Page ", () => {
  

  beforeEach(() => {
    //  cy.clearToken();
    //    --- connect as ganikas
    cy.request({
      method: "GET",
      url: `${API_URL}/${idGanikas}`,
      headers: {
        Authorization: `Bearer ${GanikasToken}`,
      },

      failOnStatusCode: false,
    }).then((resp) => {
      Ganikas = resp.body;  

      expect(resp.status).to.eq(200);
    });
    localStorage.setItem("jwtToken", GanikasToken);

    cy.visit(`${reactUrl}/students/profile`);
  });

  it("displays Ganikas information", () => {
    cy.wait(1000);
    cy.getById("logintext").should("have.text", "Ganikas");
    cy.getByData("fullnameText").should(
      "have.text",
      `${Ganikas?.firstname} ${Ganikas?.lastname}`
    );
  });

  it("show errors on password unmatch ", () => {
    cy.get(":nth-child(3) > .content > .blue").click();
    cy.get(":nth-child(1) > :nth-child(1) > .ui > input").clear().type("Melek");
    cy.get(":nth-child(1) > :nth-child(2) > .ui > input").clear().type("SAADI");
    cy.get(".form > :nth-child(1) > :nth-child(3) > .ui > input")
      .clear()
      .type("saadimelek@gmail.com");
    cy.get(":nth-child(2) > :nth-child(1) > .ui > input")
      .clear()
      .type("Ganikas");
    cy.get(":nth-child(2) > :nth-child(2) > .ui > input")
      .clear()
      .type("pdnejoh00");
    cy.get(":nth-child(2) > :nth-child(3) > .ui > input")
      .clear()
      .type("pdnejoh0ss0");
    cy.get(".form > :nth-child(4) > .ui").click();
    
    cy.get('.go3958317564').should("contain", "Oups Password Unmatched  !")
    cy.get("body").type("{esc}");


    
    
    
  });

  it("Update Ganikas information", () => {
    cy.get(":nth-child(3) > .content > .blue").click();
    cy.get(":nth-child(1) > :nth-child(1) > .ui > input").clear().type("Melek");
    cy.get(":nth-child(1) > :nth-child(2) > .ui > input").clear().type("SAADI");
    cy.get(".form > :nth-child(1) > :nth-child(3) > .ui > input")
      .clear()
      .type("saadimelek@gmail.com");
    cy.get(":nth-child(2) > :nth-child(1) > .ui > input")
      .clear()
      .type("Ganikas");
    cy.get(":nth-child(2) > :nth-child(2) > .ui > input")
      .clear()
      .type("pdnejoh00");
    cy.get(":nth-child(2) > :nth-child(3) > .ui > input")
      .clear()
      .type("pdnejoh00");
    cy.get(".form > :nth-child(4) > .ui").click();

    cy.wait(2000);
    cy.get("body").click();
    cy.getById("logintext").should("have.text", "Ganikas");
    cy.getByData("fullnameText").should("have.text", `Melek SAADI`);
  });

  it("Toggle The account visibility ", () => {
    cy.getByData("toggleVisibility").click(); // Click on the button
    cy.wait(1000);
    if (Ganikas?.isPublic) {
      cy.get(":nth-child(9) > .red").should("exist"); // Assert that the button with class '.green' exists
    } else {
      cy.get(":nth-child(9) > .green").should("exist"); // Assert that the button with class '.green' exists
    }
    cy.wait(1000);
  });



});


 