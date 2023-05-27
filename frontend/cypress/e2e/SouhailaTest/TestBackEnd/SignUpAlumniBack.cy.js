import {TOKEN_KEY} from "../../../../src/Config/config";

const userInfo = {
    login: '20400400',
    password: '20800800',
    type: 'person'
    //type:'club'
}
let token;


/*
let userInfoValide={
    "lastname":"Aouaouri",
    "firstname":"Souhaila",

    "email":"Souhaila",
    "phone":"55987412",

    "dob":"1999-10-28T14:29:57.421Z",

    "login":"Souhaila",
    "password":"Souhaila",

    "role":"ALUMNI",

    "level":1,
    "class":"DSI",
    "promotion":2018,

    "isPublic":true,

    "country":"Italy",
    "company":"Toshiba",

    "dog":"2023-05-26T14:29:57.421Z",
    "doh":"2023-10-26T14:29:57.421Z",

    "isValidate":0,


}
*/
describe('Create compte alumni', () =>
{

  it('Créer compte avec données valide ', () => {

  cy.request({
    method: 'POST',
    url: Cypress.env('urlBackend') + '/Persons',
    body:{
        "lastname": "studentcypress",
        "firstname": "studentcypress",
        "email": "alu@gmail.com",
        "login": "alu",
        "password": "alumnicypress",
        "level": 2,
        "class": "ING",
        "dob": "2023-05-26T14:29:57.421Z",
        "phone": "55478632",
        "promotion": 2017,
        "dog": "2023-05-26T14:29:57.421Z",
        "doh": "2023-10-26T14:29:57.421Z",
    },
        }).then((resp) => {
      expect(resp.status).to.eq(201);
    });

  });
  it('Créer compte avec email/login existe ', () => {

        cy.request({
            method: 'POST',
            url: Cypress.env('urlBackend') + '/Persons',
            body:{
                "lastname": "studentcypress",
                "firstname": "studentcypress",
                "email": "alu@gmail.com",
                "login": "alu",
                "password": "alumnicypress",
                "level": 2,
                "class": "ING",
                "dob": "2023-05-26T14:29:57.421Z",
                "phone": "55478632",
                "promotion": 2017,
                "dog": "2023-05-26T14:29:57.421Z",
                "doh": "2023-10-26T14:29:57.421Z",
            },
            failOnStatusCode: false

        }).then((resp) => {
            expect(resp.status).to.eq(400);
        });

    });

})