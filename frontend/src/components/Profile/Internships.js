import React from 'react'
import { Card,Icon } from "semantic-ui-react";

export default function Internships({data}) {
const users = (n)=>{
  let icons= []
    for(let i=0;i<n;i++){
      icons.push(<Icon name='user' />)
     
    }
    return icons
}
  
  
  return (
    <Card centered fluid>
      <Card.Header>
          <h1>Internships</h1>
        </Card.Header>

        {data && data.map((internship)=>{
          return(
            <>
            <Card.Content key={internship._id}>
        <br />
        <Card.Description>
          <Card.Header>
            <h2>{internship?.title}, <strong>{internship?.company}</strong></h2>
          </Card.Header>
              <Card.Meta>{internship?.type}</Card.Meta>
               <Card.Meta>{internship.univId?data.univId:""}</Card.Meta>
          <br/>
          <h4
                    style={{
                      marginTtop: "1em",
                      textAlign: "justify",
                      maxWidth: "820px",
                      color:"black",
                      lineHeight:"1.4em",
                      wordSpacing:".5em"
                    }}
                  >
            {internship?.description}
          </h4>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {users(internship.nbStudent)}
    
    
        
        
      
      
    </Card.Content>
            </>
          )
        })}
        
      
    </Card>
  )
}
