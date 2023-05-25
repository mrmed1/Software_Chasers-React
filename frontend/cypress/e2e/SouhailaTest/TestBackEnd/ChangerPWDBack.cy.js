const jwt = require('react-jwt');
 function getUserIdFromToken(token){
  console.log('token :',token)
  const decodedToken =jwt.decodeToken(token);
  console.log('token decoded :',decodedToken._id);
  const userId = decodedToken._id;
  console.log(userId)
  return userId;
};

let userId;
let currentPassword;
let newPasswordValide = '20800800';
let passwordInvalide = '30400400';

describe('Changer PWD User Connected', () => {

  const userInfo = {
    login: '20400400',
    password: '20400400',
    type: 'person'
    //type:'club'
  }

    const updateduserInfo = {
        login: userInfo.login,
        password: newPasswordValide,
        type: userInfo.type,
    };

  before(() => {
    // Effectuer la connexion
    cy.request({
      method: 'POST',
      url: Cypress.env('urlBackend') + '/auth',
      body: userInfo,
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body).to.exist;

      userId = getUserIdFromToken(resp.body);
      currentPassword = userInfo.password;

      console.log('userId :', userId);
      console.log('currentPassword :', currentPassword);
      Cypress.env('token', resp.body);
    });
  });

  //done successfully save data of user connected
  it("Stocke les données de l'utilisateur connecté", () => {
    // Vérifier que les informations nécessaires sont stockées
    expect(userId).to.exist;
    expect(currentPassword).to.exist;
  });

    //done successfully change password with valide data
/*
  it('Change PWD User Connected with valide data  ', () => {
    cy.request({
      method: 'POST',
      url: Cypress.env('urlBackend') + '/admin/change-password/',
      headers: {
        authorization: `Bearer ${Cypress.env('token')}`,
      },
      body: {
        currentPassword: currentPassword,
        newPassword: newPasswordValide,
        _id: userId,
      },
    }).then((resp) => {
      expect(resp.status).to.eq(200);
    });

  });
*/

    // waitiing....
  it('Modifie le mot de passe de l utilisateur connecté avec currentpassword invalide', () => {
    // Modifier le mot de passe avec un mot de passe invalide
    cy.request({
      method: "POST",
      url: Cypress.env('urlBackend') + '/admin/change-password/',
      body: {
        currentPassword: "20900700",
        newPassword: passwordInvalide,
        _id: userId,
      },
        failOnStatusCode: false, // Permet à la requête de renvoyer une erreur
    }).then((resp) => {
        expect(resp.status).to.eq(400);
        expect(response.body).to.have.property('message', 'Invalid password');

    });
  });

    //done successfully connected with new pwd
/*
  it("Connecte l'utilisateur avec le nouveau mot de passe", () => {
    // Effectuer la connexion avec le nouveau mot de passe

    cy.request({
        method: "POST",
        url: Cypress.env('urlBackend') + '/auth',
        body: updateduserInfo,
        }).then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body).to.exist;

    }
    );


  })
*/

    //done successfully echec connected with old pwd
/*
    it('Fail to login with old password',  () =>{
        cy.request({
            method: "POST",
            url: Cypress.env('urlBackend') + '/auth',
            body: userInfo,
            failOnStatusCode: false, // Permet à la requête de renvoyer une erreur
        }).then((resp) => {
            expect(resp.status).to.eq(400);
            expect(resp.body).to.exist;

        }
        );

    });
*/


});
