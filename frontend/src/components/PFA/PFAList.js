import { Grid, Button, Card, Dimmer, Loader, Icon } from "semantic-ui-react";
import React from "react";
import { useQuery } from "react-query";
import { fetchPfaList } from "../../Service/internshipService";
import DeletePFA from "./DeletePFA";
import PFAModal from "./PFAModal";

export default function PFAList() {
  const { data, isLoading } = useQuery("PFAList", fetchPfaList);
  console.log("PFALIST ==> ", data);

  if (isLoading)
    return (
      <Dimmer active inverted>
        <Loader size="big">Loading...</Loader>
      </Dimmer>
    );
  return (
    data && (
      <>
        <Grid columns="four" padded="vertically" centered doubling>
          <Grid.Row>
            {data.map((PFA) => {
              return (
                <Grid.Column key={PFA?._id} width={4} stretched style={{marginTop:"1rem"}} >
                  <Card>
                    <Card.Content>
                      <Card.Header>{PFA?.title}</Card.Header>
                      <Card.Meta>Created By {PFA?.createdBy}</Card.Meta>
                      <Card.Meta> {PFA?.univId}</Card.Meta>
                      <Card.Description>{PFA?.description}</Card.Description>
                    </Card.Content>

                    <Card.Content extra>
                    <h5>
                        Technologies : <strong style={{color:"black"}}>Java , ANGULAR </strong>
                      </h5>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}>
                        
                        <DeletePFA data={PFA} teacher_id={"63a70d5bdb445d4c7ccff032"}/>
                        <PFAModal add={false} data ={PFA} teacher_id={"63a70d5bdb445d4c7ccff032"} iconName="setting"/>
                       
                      </div>
                      
                    </Card.Content>
                  </Card>
                </Grid.Column>
              );
            })}
          </Grid.Row>
        </Grid>
      </>
    )
  );
}
