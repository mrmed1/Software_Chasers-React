import { Grid, Card, Icon } from "semantic-ui-react";
import React from "react";

import DeletePFA from "./DeletePFA";
import PFAModal from "./PFAModal";
import { connectedUser } from "../../Service/auth.service";


export default function PFAList({data}) {
  const teacher_id = connectedUser()._id;

  const emptyData = {
    description: "",
    title: "",
    nbStudent: 0,
    type: "PFA",
    createdBy: teacher_id,
    technologyId: [],
    univId: null,
  };

  function getNamesAndLastnames (array) {
    const namesAndLastnames = array.map(
      (item) => `${item.firstname} ${item.lastname}`
    );
     const namesAndLastnamesString = namesAndLastnames.join(" , ");
     
    return namesAndLastnamesString
  };


  return (
    data && (
      <>
        
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PFAModal
            add={true}
            iconName={"pencil"}
            data={emptyData}
            teacher_id={teacher_id}
          />
        </div>

        <Grid columns="four" padded="vertically" centered doubling>
          <Grid.Row>
            {data.map((PFA) => {
              return (
                <Grid.Column
                  key={PFA?._id}
                  width={4}
                  stretched
                  style={{ marginTop: "1rem" }}
                >
                  <Card>
                    <Card.Content>
                      <Icon name="check circle" color={PFA.isPicked?"green": "red"} corner style={{float :"right"}}/>
                      <Card.Header>{PFA?.title}</Card.Header>
                      <Card.Meta>
                        Created By{" "}
                        {` ${PFA?.createdBy?.firstname}  ${PFA?.createdBy?.lastname}`}
                      </Card.Meta>
                      <Card.Meta> {PFA?.univId?.name}</Card.Meta>

                      <Card.Meta style={{ color: "#1976D2" }}>
                        {PFA?.isPublished ? "Published" : "Pending..."}
                      </Card.Meta>
                      <Card.Description>{PFA?.description}</Card.Description>
                      
                    </Card.Content>
                   
                    <Card.Content extra>
                  {PFA?.studentsId?.length >0  &&  <h5><Icon name="user circle" color="blue"/>{ getNamesAndLastnames(PFA?.studentsId)}</h5>}  
                      <h5>
                        Technologies :{" "}
                        <strong style={{ color: "black" }}>
                          {PFA?.technologyId?.join(" , ")}
                        </strong>
                      </h5>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        {!PFA.isPublished && (
                          <DeletePFA
                            data={PFA}
                            teacher_id={teacher_id}
                            iconName={"send"}
                            isPublished={true}
                          />
                        )}

                        <DeletePFA
                          data={PFA}
                          teacher_id={teacher_id}
                          iconName={"trash"}
                          isPublished={false}
                        />
                        <PFAModal
                          add={false}
                          data={PFA}
                          teacher_id={teacher_id}
                          iconName="setting"
                        />
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
