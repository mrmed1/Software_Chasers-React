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

describe('Changer PWD User Connected', () => {
  const userInfo = {
    login: '20400400',
    password: '20400400',
    type: 'person'
    //type:'club'
  }
    const invalidePwdInfo = {
        currentPassword: 'test',
        newPassword: 'tesssst',
        _id: userId,
    }
    const updateduserInfo = {
        login: userInfo.login,
        password: newPasswordValide,
        type: userInfo.type,
    };

    // eslint-disable-next-line no-undef
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

  it("Stocke les données de l'utilisateur connecté", () => {
    // Vérifier que les informations nécessaires sont stockées
    expect(userId).to.exist;
    expect(currentPassword).to.exist;
  });
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
  it('Modifie le mot de passe de l utilisateur connecté avec currentpassword invalide', () => {
    // Modifier le mot de passe avec un mot de passe invalide
    cy.request({
      method: "POST",
      url: Cypress.env('urlBackend') + '/admin/change-password/',
      body: invalidePwdInfo,
        failOnStatusCode: false, // Permet à la requête de renvoyer une erreur
    }).then((resp) => {
        console.log("curent pwd :",invalidePwdInfo.currentPassword)
        console.log("new pwd :",invalidePwdInfo.newPassword)
        console.log("user id :",invalidePwdInfo._id)
        expect(resp.status).to.eq(403);
        expect(resp.body).to.eq('Forbidden');

    });
  });
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


});
