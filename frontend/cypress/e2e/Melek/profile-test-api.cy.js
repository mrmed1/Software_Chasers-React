describe("Profile Api Test", () => {
  let token;
  let tokenHeader;
  let idGanikas = "63a6090c1a0834a51ac5246e";
  const API_URL = Cypress.env("baseUrl") + "/Persons";
  let updatedGnikas;
  let accound;
  let Url = Cypress.env("baseUrl");
  before(() => {
    // get the login function from commands
    cy.wait(1000);
    token = cy.login_as_student().then((r) => {
      token = r;
      tokenHeader = `Bearer ${r}`;
    });
    cy.fixture("person.json").then((data) => {
      updatedGnikas = data.updatedStudent;
      console.log("updatedGnikas", data);
    });
  });

  it("Should Connect to get The profile account", () => {
    cy.request({
      method: "GET",
      url: `${API_URL}/${idGanikas}`,

      failOnStatusCode: false,
    }).then((resp) => {
      console.log(resp);
      expect(resp.status).to.eq(403);
    });
  });

  it("Should give back the account  ", () => {
    cy.wait(1000);
    cy.request({
      method: "GET",
      url: `${API_URL}/${idGanikas}`,
      headers: {
        Authorization: tokenHeader,
      },

      failOnStatusCode: false,
    }).then((resp) => {
      accound= resp.body
      idGanikas=accound._id
      expect(resp.status).to.eq(200);
    });
  });

  it("it should update the Profile   ", () => {
    cy.wait(1000);

    cy.wait(1000);

    cy.request({
      method: "PUT",
      url: `${API_URL}/${idGanikas}`,
      headers: {
        Authorization: tokenHeader,
      },
      body: updatedGnikas,
      failOnStatusCode: false,
    }).then((resp) => {
      console.log("Update", resp);
      expect(resp.status).to.eq(200);
      expect(resp.body._id).to.eq(updatedGnikas._id);
      expect(resp.body.role).to.eq(updatedGnikas.role);
      expect(resp.body.firstname).to.eq(updatedGnikas.firstname);
      expect(resp.body.login).to.eq(updatedGnikas.login);
      expect(resp.body.lastname).to.eq(updatedGnikas.lastname);
      expect(resp.body.email).to.eq(updatedGnikas.email);
     
    });
  });

  it("it should Toglle the Account visibility  ", () => {

    cy.wait(1000);

    cy.request({
      method: "PUT",
      url: `${Url}/student/visibility/${idGanikas}`,
      headers: {
        Authorization: tokenHeader,
      },
   
      failOnStatusCode: false,
    }).then((resp) => {
     
      expect(resp.status).to.eq(200);
      expect(resp.body.isPublic).to.eq(!accound.isPublic);
     
     
    });
  });


});
