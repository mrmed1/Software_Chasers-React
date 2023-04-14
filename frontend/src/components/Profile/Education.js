import React from 'react'
import {  Card, Icon } from 'semantic-ui-react'
import DeleteEducation from './DeleteEducation';
import EducationModal from './EducationModal';

export default function Education({data,_id,role}) {


  
const emptyObject = {
  diploma: "",
  university: "",
  startDate: "",
  endDate: "",
  clubs: "",
};


 
  return (
    <Card centered fluid>
    <Card.Content>
      <EducationModal  data={emptyObject} add={true}_id={_id}iconName="pencil" />
        <Card.Header><h1>Educations</h1></Card.Header>
        
        {data &&
          data.map((edu) => {
            return (
              <>
                <br />
                <Card.Description key={edu._id}>
                  <Card.Header>
               
                  <EducationModal  data={edu} add={false}_id={_id} iconName="setting" role={role}/>
                  <DeleteEducation data={edu}_id={_id}/>
              
                    <h2>
                    <Icon name='point' color='blue'  />
                     {edu.diploma} ,  {"   "} <strong style={{color:"#1976D2"}}>{edu.university}</strong></h2> 

                   
                    
                  </Card.Header>
                  <Card.Meta textAlign='left' style={{marginLeft:"32px"}}>   from {edu.startDate} to {edu.endDate}</Card.Meta>
                
                </Card.Description>
                 
                <h5 style={{marginLeft:"32px"}}>Clubs : {" "} <strong style={{color:"#1976D2"}}>{edu.clubs.join(', ')}</strong></h5>
              </>
            );
          })}
          <br/>
          
      
    </Card.Content>
    
    
  </Card>
  )
}
