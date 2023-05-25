
describe("--PFA test api --", () => {
  let token;
  let tokenHeader;
 let  idPFA;
 let InternshipsPFA 
  let Url = Cypress.env("urlBackend") 
  const idTeacher = "63c84996605ab186472e4871"
  const idUniv = "64387bd44b6c2e5b55e8cb9e"
  const   studentId ="63a6090c1a0834a51ac5246e"
  before(() => {
    // get the login function from commands
    cy.wait(1000);
    token = cy.login_as_student().then((r) => {
      token = r;
      tokenHeader = `Bearer ${r}`;
    });
  
  });

  it("Should Connect to get Internship list", () => {
    cy.request({
      method: "GET",
      url: `${Url}/Internship`,
      
      failOnStatusCode: false,
    }).then((resp) => {
    
      expect(resp.status).to.eq(403);
    });
  });

  it("Should give back the PFA Internships after auth  ", () => {
    cy.wait(1000);
    cy.request({
      method: "GET",
      url: `${Url}/Internship`,
      headers: {
        Authorization: tokenHeader,
      },

      failOnStatusCode: false,
    }).then((resp) => {
      let Internships=resp.body
      InternshipsPFA= Internships.filter(internship=>internship?.type==="PFA")
    
      expect(resp.status).to.eq(200);
    });

    
  });

  it("Should can't add PFA as not Teacher  ", () => {
      cy.wait(1000);
      cy.request({
        method: "POST",
        url: `${Url}/Internship`,
        headers: {
          Authorization: tokenHeader,
        },
  
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.eq(403);
      });     
    });

    before(() => {
      // get the login function from commands
      cy.wait(1000);
      token = cy.login_as_Teacher().then((r) => {
        token = r;
        tokenHeader = `Bearer ${r}`;
      });
    //   cy.fixture("person.json").then((data) => {
    //     console.log("updatedGnikas", data);
    //   });
    });

    it("Should can add PFA as a Teacher  ", () => {

      const newPFA = {
       
          description: " DAYONEDAYONEDAYONEDAYONEDAYONE ",
          title: "DAYONE DAYONE id ",
        
          type: "PFA",
          createdBy: 
          idTeacher
          ,
          technologyId: [
            "firebase"
          ],
          univId: 
          idUniv
          
        };
      
      
      cy.wait(1000);
      cy.request({
        method: "POST",
        url: `${Url}/Internship`,
        body : newPFA,
        headers: {
          Authorization: tokenHeader,
        },
      failOnStatusCode: false,
      }).then((resp) => {
         idPFA=resp.body._id
       expect(resp.status).to.eq(201);
      });     
    });


    it("Should can Update PFA as a Teacher  ", () => {

      const updatedInternship = {
          _id:idPFA,
          description: "Updated description",
          title: "Updated title",
          type:"PFA",
          createdBy: idTeacher,
          technologyId: ["spring","jee"],
          univId: idUniv
        };
        
      cy.wait(1000);
      cy.request({
        method: "PUT",
        url: `${Url}/Internship/${idPFA}`,
        body : updatedInternship,
        headers: {
          Authorization: tokenHeader,
        },
      failOnStatusCode: false,
      }).then((resp) => {
        
      expect(resp.status).to.eq(200);
      });     
    });

    

    it("should toggle the isPublished field of the internship", () => {
      console.log("id pfa",idPFA)
      cy.request({
        method: "PUT",
        url: `${Url}/teacher/PFA/Publishe/${idPFA}`,
        headers: {
          Authorization: tokenHeader,
        },
        failOnStatusCode: false,
      }).then((resp) => {
       console.log("Ruslt publish",resp)
        expect(resp.status).to.eq(200);
        expect(resp.body.message).to.include("isPublished field toggled successfully");
        expect(resp.body.data.isPublished).to.be.a("boolean");
        // Additional assertions can be added if needed
      });
    });
 

    
    //Befor this connect as admin
    it("should toggle the isValidResponsable field of the internship", () => {
      cy.request({
        method: "PUT",
        url: `${Url}/teacher/PFA/responsible/${idPFA}`, // Update the endpoint to match the route
        headers: {
          Authorization: tokenHeader,
        },
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body.message).to.include("isValidResponsable field toggled successfully");
        expect(resp.body.data.isValidResponsable).to.be.a("boolean");
        // Additional assertions can be added if needed
      });
    });


    it("should  only student toggle the pick pfa ", () => {
     
      
      cy.request({
        method: "PUT",
        url: `${Url}/student/PFA/togglePFA/${idPFA}`, 
        headers: {
          Authorization: tokenHeader,
        },
        body: {
          studentsId: studentId,
        },
        failOnStatusCode: false,
      }).then((resp) => {
          expect(resp.status).to.eq(401);
          expect(resp.body.message).to.include("Only a STUDENT is authorized to continue ! ");
        
       
      });
    });

    

    //Befor this connect as student
    it("should  only student toggle the pick pfa", () => {
      token = cy.login_as_student().then((r) => {
          token = r;
          tokenHeader = `Bearer ${r}`;
          cy.request({
              method: "PUT",
              url: `${Url}/student/PFA/togglePFA/${idPFA}`, 
              headers: {
                Authorization: tokenHeader,
              },
              body: {
                studentsId: studentId,
              },
              failOnStatusCode: false,
            }).then((resp) => {
              expect(resp.status).to.eq(200);
              expect(resp.body.message).to.include("isPicked field toggled successfully");
              expect(resp.body.data.isPicked).to.be.a("boolean");
              
              // Check if the studentsId array is updated correctly
              const studentsId = resp.body.data.studentsId;
              if (resp.body.data.isPicked) {
                // If isPicked is true, expect the studentId to be in studentsId array
                expect(studentsId).to.include(studentId);
              } else {
                // If isPicked is false, expect the studentId to be removed from studentsId array
                expect(studentsId).to.not.include(studentId);
              }
              
             
            });
        });
      
  
    });
    

    before(() => {
      // get the login function from commands
      cy.wait(1000);
      token = cy.login_as_Teacher().then((r) => {
        token = r;
        tokenHeader = `Bearer ${r}`;
      });
    //   cy.fixture("person.json").then((data) => {
    //     console.log("updatedGnikas", data);
    //   });
    });

    
    it("Should delete  PFA as a Teacher  ", () => {

      cy.wait(1000);
      cy.request({
        method: "DELETE",
        url: `${Url}/Internship/${idPFA}`,
   
        headers: {
          Authorization: tokenHeader,
        },
      failOnStatusCode: false,
      }).then((resp) => {
        
      expect(resp.status).to.eq(200);
      });     
    });

    

});
