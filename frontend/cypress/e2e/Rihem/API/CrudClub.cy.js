import {TOKEN_KEY} from "../../../../src/Config/config";
const jwt = require('react-jwt');
function getUserIdFromToken(token){
  console.log('token :',token)
  const decodedToken =jwt.decodeToken(token);
  console.log('token decoded :',decodedToken._id);
  const userId = decodedToken._id;
  console.log(userId)
  return userId;
};
describe("Crud Club page", () => {
  let token;
  let idClub;
  let tokenHeader


  let url= Cypress.env("urlBackend")
  before(() => {

    // get the login function from commands
    // cy.wait(1000);
    // token = cy.login_as_adminclub().then((r) => {
    //   token = r;

    //   tokenHeader = Bearer ${r};
    // });
    cy.loginMed();
    cy.wait(1500);
    cy.window().then((win) => {
      token = win.localStorage.getItem(TOKEN_KEY);
      //idClub=getUserIdFromToken(token)
    });
  });


  it("add  Club ", () => {
    const newResource = {
      name: "test test",
      email: "test test",
      dac: "2001-01-01", //dac: new Date(),
      // login: "23232323",
      // password: "23232323",

      responsible: "63c71d15175639e9d184351d",

      president: "63c720b9d758cfe6e91ccf71", //l'identifiant du président

      members: ["63c720b9d758cfe6e91ccf71"], //les identifiants des membres
      is_banned: false,
      list_signals: [],
    };
    cy.wait(1000);

    cy.request({
      method: "POST",
      url: `${url}/Club`,

      body: newResource,
      headers: {'Authorization': `Bearer ${token}`},

      //failOnStatusCode: false,
    }).then((resp) => {
      idClub=resp.body._id
      expect(resp.status).to.eq(201);
    });
  });
  it(" get All Club list", () => {
    cy.request({
      method: "GET",
      url: `${url}/Club`,
      headers: {'Authorization': `Bearer ${token}`},

      // failOnStatusCode: false,
    }).then((resp) => {

      expect(resp.status).to.eq(200);
    });
  });
//   it.only("Should  Update CLUB as a Admin  ", () => {

//     const updatedClub = {

//    // email: "test test",


//     //password: "$2b$10$cN675bcBCn9mWhTQXXrft.Q6xbJgGqWj/mgRW78TjkwJe/nbFVtYS",


//    // login : "Melek",


//     name: "Rihem",
//     email: "test test",
//     dac: "2002-02-02", //dac: new Date(),
//     // login: "23232323",
//     // password: "23232323",

//     responsible: "63c71aa5a1dca6cd584cc9fb",
//     president: "6430be534390cd7773aebde9", //l'identifiant du président

//     members: ["63c720b9d758cfe6e91ccf71"], //les identifiants des membres
//     is_banned: true,
//     list_signals: [],
//       };
//       cy.wait(1000);
//       cy.request({
//         method: "PUT",
//         url: ${url}/Club/${idClub},
//         body : updatedClub,

//         headers: {'Authorization': `Bearer ${token}`}



//     //failOnStatusCode: false,
//   }).then((resp) => {

//     expect(resp.status).to.eq(200);
//   });
// });




  it("Should Update CLUB as an Admin", () => {
    const updatedClub = {
      name: "Rihem",
      email: "test test",
      dac: "2002-02-02",
      responsible: "63c71aa5a1dca6cd584cc9fb",
      president: "6430be534390cd7773aebde9",
      members: ["63c720b9d758cfe6e91ccf71"],
      is_banned: true,
      list_signals: [],
    };

    cy.wait(1000);

    cy.request({
      method: "PUT",
      url: `${url}/Club/${idClub}`,
      body: updatedClub,
      headers: { Authorization: `Bearer ${token}` },
    }).then((resp) => {
      expect(resp.status).to.eq(200);
    });
  });
  it("Delete CLUB as an Admin", () => {
    cy.wait(1000);
    cy.request({
      method: "DELETE",
      url: `${url}/Club/${idClub}`,
      headers: { 'Authorization': `Bearer ${token}` }
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body).not.to.be.null;
    });
  });
});