import React from "react";
import { Card, Icon } from "semantic-ui-react";

import ExperienceModal from "./ExperienceModal";
import DeleteExperience from "./DeleteExperience";

export default function Experience({ data, _id }) {
  //Loop data and get all the experiences !

  const emptyExperience = {
    jobTitle: "",
    jobType: "",
    companyName: "",
    place: "",
    startDate: "",
    endDate: "",
    description: "",
    competences: [],
  };

  return (
    <Card centered fluid>
      <Card.Content>
        {/* add Experience */}

        <ExperienceModal
          _id={_id}
          data={emptyExperience}
          iconName="pencil"
          add={true}
        />
        {/** Render Experiences !  */}
        <Card.Header>
          <h1>My Experiences </h1>
        </Card.Header>
        <br />

        {data &&
          data.map((exp, key) => {
            return (
              <>
                <Card.Description key={key}>
                  
                  <Card.Header>
                    <ExperienceModal
                      data={exp}
                      add={false}
                      _id={_id}
                      iconName="setting"
                    />
                    <DeleteExperience data={exp} _id={_id} />
               
                    <h2>
                    <Icon name='point' />
                      {exp?.jobTitle}
                      {"  "}, {"  "}
                      {"  "}
                   

                      <strong style={{ color: "#1976D2" }}>
                        {exp?.companyName}
                      </strong>
                    </h2>
                  </Card.Header>
                  <Card.Meta style={{marginLeft:"32px"}}>
                    <Icon name="calendar" /> from {exp?.startDate} to{" "}
                    {exp?.endDate}
                  </Card.Meta>
                
                  <h4
                    style={{
                      marginTtop: "1em",
                      textAlign: "justify",
                      maxWidth: "820px",
                      color:"black",
                      lineHeight:"1.4em",
                      wordSpacing:".5em",
                      marginLeft:"32px"
                    }}
                  >
                    {exp?.description}
                  </h4>
                  <Card.Meta style={{marginLeft:"32px"}}>
                  {exp.jobType && <h5>Domain : <strong style={{color:"#1976D2"}}> {exp.jobType}</strong></h5>}
                  </Card.Meta>
                  
                  <Card.Meta style={{marginLeft:"32px"}}>
                    
                    <h5>
                    Competences : <strong  style={{color:"#1976D2"}}>{exp?.competences.join(", ")}</strong>
                  </h5>
                  </Card.Meta>
                  <div>
                
                  
                  </div>
                  
                </Card.Description>
                
              </>
            );
          })}
      </Card.Content>
    </Card>
  );
}
