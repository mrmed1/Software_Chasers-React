describe("CV Api Test", () => {
    let token;
    let tokenHeader;
    let idGanikas = "63a6090c1a0834a51ac5246e";
    const API_URL = Cypress.env("baseUrl") 
    let updatedExperience ={};
    let cv;
    let newSkills;
    let newExperience
    let idExperience ;
    let idEducation;
 
    before(() => {
      // get the login function from commands
      cy.wait(1000);
      token = cy.login_as_student().then((r) => {
        token = r;
        tokenHeader = `Bearer ${r}`;
      });
      cy.fixture("cv.json").then((data) => {
        newExperience = data.newExperience;
      });
      cy.fixture("cv.json").then((data) => {
        updatedExperience = data.UpdatedExperience;
    
      });
      newSkills = ["NEST", "NEXT", "DEVOPS--"];
    });
  
    it("Should Connect to get The cv ", () => {
      cy.request({
        method: "GET",
        url: `${API_URL}/student/cv`,
  
        failOnStatusCode: false,
      }).then((resp) => {
        console.log(resp);
        expect(resp.status).to.eq(403);
      });
    });

    
    it("should give back the cv  ", () => {
        cy.request({
          method: "GET",
          url: `${API_URL}/student/cv`,
          headers: {
            Authorization: tokenHeader,
          },
          failOnStatusCode: false,
        }).then((resp) => {
         
          cv=resp.body
          expect(resp.status).to.eq(200);
        });
      });

      it("should add Experience  ", () => {
        cy.request({
          method: "POST",
          body:newExperience,
          url: `${API_URL}/student/Experience/${cv._id}`,
          headers: {
            Authorization: tokenHeader,
          },
          failOnStatusCode: false,
          
        }).then((resp) => {
            console.log("RESP",resp.body.data)
            idExperience=resp.body.data.experience[resp.body.data.experience.length - 1]._id
            console.log(idExperience);
            expect(resp.status).to.eq(200);
        });
      });

      it("should Update that  Experience  ", () => {


        let data = {...updatedExperience,_id:idExperience}

      
        cy.request({
          method: "PUT",
          body:data,
          url: `${API_URL}/student/Experience/${cv._id}/${idExperience}`,
          headers: {
            Authorization: tokenHeader,
          },
          failOnStatusCode: false,
          
        }).then((resp) => {
            console.log("RESP",resp.body)
             expect(resp.status).to.eq(200);
           
        });
      });

      it("should Delete that  Experience  ", () => {
        
        cy.request({
          method: "DELETE",
       
          url: `${API_URL}/student/Experience/${cv._id}/${idExperience}`,
          headers: {
            Authorization: tokenHeader,
          },
          failOnStatusCode: false,
          
        }).then((resp) => {
          expect(resp.status).to.eq(200);
          
           
        });
      });


      it("should add Education", () => {
       const  newEducation = {
          university: "ABC University",
          diploma: "Bachelor of Science",
          clubs: ["Computer Science Club", "Engineering Society"],
          startDate: "2020-09-01",
          endDate: "2024-06-30",
          role: "STUDENT",
      
        };
    
        cy.request({
          method: "POST",
          body: newEducation,
          url: `${API_URL}/student/Education/${cv._id}`,
          headers: {
            Authorization: tokenHeader,
          },
          failOnStatusCode: false,
        }).then((resp) => {
          console.log("RESP", resp.body.data);
          const addedEducation = resp.body.data.education[resp.body.data.education.length - 1]
                    expect(addedEducation.university).to
          .eq(newEducation.university);
          expect(addedEducation.diploma).to.eq(newEducation.diploma);
         
          idEducation = addedEducation._id;
          expect(resp.status).to.eq(201);
        });
      });
 
      it("should Update Education", () => {
        const updatedEducation = {
          university: "XYZ University",
          diploma: "Master of Business Administration",
          clubs: ["Business Club", "Networking Society"],
          startDate: "2022-09-01",
          endDate: "2024-06-30",
          role: "STUDENT",
          _id:idEducation
        };
    
        cy.request({
          method: "PUT",
          body: updatedEducation,
          url: `${API_URL}/student/Education/${cv._id}/${idEducation}`,
          headers: {
            Authorization: tokenHeader,
          },
          failOnStatusCode: false,
        }).then((resp) => {
      
          expect(resp.status).to.eq(200);
        });
      });

      it("should Delete Education", () => {
        cy.request({
          method: "DELETE",
          url: `${API_URL}/student/Education/${cv._id}/${idEducation}`,
          headers: {
            Authorization: tokenHeader,
          },
          failOnStatusCode: false,
        }).then((resp) => {
          expect(resp.status).to.eq(200);
        });
      });
  

      it("should add skills to CV", () => {
        cy.request({
          method: "POST",
          body: { Skills: newSkills },
          url: `${API_URL}/student/Skills/${cv._id}`,
          headers: {
            Authorization: tokenHeader,
          },
          failOnStatusCode: false,
        }).then((resp) => {
          console.log(resp);
          expect(resp.status).to.eq(200);

          expect(resp.body.message).to.eq("Skill added successfully");
        });
      });

    it("should delete skill from CV", () => {
        
        newSkills.map((skill)=>{

            cy.request({
              method: "DELETE",
              url: `${API_URL}/student/Skills/${cv._id}/${skill}`,
              headers: {
                Authorization: tokenHeader,
              },
              failOnStatusCode: false,
            }).then((resp) => {
              console.log(resp);
              expect(resp.status).to.eq(200);
              expect(resp.body).to.eq(`Skill '${skill}' removed from CV!`);
            });
          });

        })


        describe(" My Internships ", () => {


            it("should give back my internships ", () => {
                cy.request({
                  method: "GET",
                
                  url: `${API_URL}/student/MyInternships`,
                  headers: {
                    Authorization: tokenHeader,
                  },
                  failOnStatusCode: false,
                }).then((resp) => {
                
                  expect(resp.status).to.eq(200);
             
                });
              });

        })
  });

  
  