 
import { faker } from '@faker-js/faker';
describe("Student Api Test", () => {
  let token;
  let savedStudent;
  let StudentId;
  
 
  let Url=Cypress.env('baseUrl')

  before(() => {
    // get the login function from commands
    
    cy.login();
     
 
    cy.window().then((win) => {
      token = win.localStorage.getItem("token");
    });
    cy.addStudent();
    cy.window().then((win) => {
        StudentId = win.localStorage.getItem("StudentId");
    });
    
  });

  context("Student section", () => {
    it("Get  Student by id ", () => {
    
        cy.request({
          method: "GET",
          url: `${Url}/Persons/${StudentId}`,
          headers: { 'Authorization': `Bearer ${token}` },
          failOnStatusCode: false
          
        }).then((resp) => {
         
         
            savedStudent=resp.body;
        
      
          
        });
       
      }); 

/*    it("should update the student class ", () => {
      const data = {
        firstname: savedStudent.firstname,
        lastname: savedStudent.lastname,
        email: savedStudent.email,
        login:savedStudent.login,
        password: savedStudent.password,
        phone:savedStudent.phone,
        role: "STUDENT",  
        dob: savedStudent.dob,
        isPublic: savedStudent.isPublic,
        class: savedStudent.class,
        level: '2',
      };
 
       
      cy.request({
        method: "PUT",
        url: `${Url}/Persons/${StudentId}`,
        body: data,
        headers: { 'Authorization': `Bearer ${token}` },
      }).then((resp) => {
       
        expect(resp.status).to.equal(200);
       console.log("Event", resp.body);
        expect(resp.body.firstname).to.eq(data.firstname);
        expect(resp.body.lastname).to.eq(data.lastname);
        expect(resp.body.email).to.eq(data.email);
        expect(resp.body.login).to.eq(data.login);
        expect(resp.body.password).to.eq(data.password);
        expect(resp.body.phone).to.eq(data.phone);
        expect(resp.body.role).to.eq(data.role);
        expect(resp.body.class).to.eq(data.class);
        expect(resp.body.level).to.eq(data.level);
     
        
        expect(resp.body.isPublic).to.eq(data.isPublic);
      
        
 
    

      
         
      });
      cy.deletePerson();
    });
 */

    it("should update the event added ", () => {
        const data = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            login: faker.phone.imei(),
            password:  faker.phone.imei(),
            role: "STUDENT",
            phone:  faker.phone.imei(),
            level:'2',
            class:'ing2'
          }
          
        cy.request({
          method: "PUT",
          url: `${Url}/Persons/${StudentId}`,
          body: data,
          headers: { 'Authorization': `Bearer ${token}` },
        }).then((resp) => {
         
          expect(resp.status).to.equal(200);
        
           
        });
      
       
      });
      
    it("should update the event added ", () => {
       
      });


     

});

after(() => {
    // get the login function from commands
    
  
    
  });
});
