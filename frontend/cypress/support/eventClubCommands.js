import { faker } from "@faker-js/faker";
Cypress.Commands.add("loginAsClub", (login,password) => {
  cy.request({
    method: "POST",
    url: "http://127.0.0.1:3000/api/auth/",
    body: {
      login: login,    
      password:password,
      type: "club",
    },
  }).then((resp) => {
    window.localStorage.setItem("token", resp.body);
  });
});
//add Commands to add a Person with role student
Cypress.Commands.add("addStudent", () => {
  
  cy.request({
    method: "POST",
    url: "http://127.0.0.1:3000/api/Persons/",
    body: {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      login: faker.phone.imei(),
      password:  faker.phone.imei(),
      role: "STUDENT",
      phone:  faker.phone.imei(),
      level:'1',
      class:'ing2'
    },
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("token"),
    },
  }).then((resp) => {
    console.log(resp.body);

    window.localStorage.setItem("StudentId", resp.body._id);

   
 
  });
});

//add Commands to add a Person with role teacher
Cypress.Commands.add("addTeacher", () => {
  const data = {
    firstname: faker.person.firstName(),
    lastname: faker.person.firstName(),
    email: faker.internet.email(),
    phone:faker.phone.imei(),
    role: "TEACHER",
    dob: faker.date.past(),
    isPublic: true,
    isResponsible: true,
  };
  cy.request({
    method: "POST",
    url: "http://127.0.0.1:3000/api/Persons/",
    body: data,
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("token"),
    },
  }).then((resp) => {
    console.log(resp.body);
    window.localStorage.setItem("TeacherId", resp.body._id);
  });
});

// add command to get create a club with attr name, dac(date of creation),member (empty list), responsible (id of a teacher),president (id of a student),is_banned
Cypress.Commands.add("addClub", () => {
  cy.request({
    method: "POST",
    url: "http://127.0.0.1:3000/api/club/",
    body: {
      name: "test",
      dac: "2021-10-10",
      member: [],
      responsible: window.localStorage.getItem("StudentId"),
      president: window.localStorage.getItem("TeacherId"),
      is_banned: false,
    },
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("token"),
    },
  }).then((resp) => {
    console.log(resp.body);
    const Club = resp.body;
    console.log('club',Club)
    window.localStorage.setItem("ClubId", Club._id);
  });
});

//add Commands to delete a person with id
Cypress.Commands.add("deletePerson", () => {
  cy.request({
    method: "DELETE",
    url:
      "http://127.0.0.1:3000/api/Persons/" +
      window.localStorage.getItem("StudentId"),
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("token"),
    },
  }).then((resp) => {
    console.log(resp.body);
  });
/*  cy.request({
    method: "DELETE",
    url:
      "http://127.0.0.1:3000/api/Persons/" +
      window.localStorage.getItem("TeacherId"),
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("token"),
    },
  }).then((resp) => {
    console.log(resp.body);
  });*/
});

//add Commands to delete Club with id
Cypress.Commands.add("deleteClubs", () => {
  cy.request({
    method: "DELETE",
    url:
      "http://127.0.0.1:3000/api/Club/" +
      window.localStorage.getItem("ClubId"),
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("token"),
    },
  }).then((resp) => {
    console.log(resp.body);
  });
});
