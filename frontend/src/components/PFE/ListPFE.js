import {
    Grid,
    Card,
    Icon,
    List,
    Input,
    Checkbox,
    Popup,
} from "semantic-ui-react";
import React from "react";
import {connectedUser} from "../../Service/auth.service";
import ValidationAndPick from "../PFA/ValidationAndPick";
import PickPFE from "./PickPFE";



export default function ListPFE({ data,type }) {
    const teacher_id = connectedUser()._id;
    const ROLE = connectedUser().role;

    function getNamesAndLastnames(array) {
        const namesAndLastnames = array.map(
            (item) => `${item.firstname} ${item.lastname}`
        );
        const namesAndLastnamesString = namesAndLastnames.join(" , ");

        return namesAndLastnamesString;
    }
    console.log(data)

    return (
        data && (
            <>

                <Grid columns="three" padded="vertically" centered doubling>
                    <Grid.Row>
                        {data.map((PFE) => {
                            return (
                                <Grid.Column
                                    key={PFE?._id}
                                    width={4}
                                    stretched
                                    style={{ marginTop: "1rem" }}
                                >
                                    <Card>
                                        <Card.Content>
                                            <Popup
                                                trigger={
                                                    <Icon
                                                        name="hand lizard"
                                                        color={PFE.isPicked ? "green" : "red"}
                                                        style={{ float: "right" }}
                                                    />
                                                }
                                                position="top center"
                                                content="Picked By Teacher"

                                            />



                                            <Card.Header>{PFE?.title}</Card.Header>
                                            <Card.Meta>
                                                Created By{" "}
                                                {` ${PFE?.createdBy?.firstname}  ${PFE?.createdBy?.lastname}`}
                                            </Card.Meta>
                                            <Card.Meta> {PFE?.univId?.name}</Card.Meta>
                                            <Card.Meta style={{color:"black"}}> <strong>Country : </strong>{PFE?.country}</Card.Meta>
                                            <Card.Meta style={{color:"black"}}> <strong>Company : </strong>{PFE?.company}</Card.Meta>
                                            {/*<Card.Meta style={{ color: "#1976D2" }}>*/}
                                            {/* <b style={{color:"black"}}>  isPublished :</b>  {PFE?.isPublished ? "Published" : "Pending..."}*/}
                                            {/*</Card.Meta>*/}

                                            {(PFE?.isPicked && ROLE == "ADMIN") && (
                                                <Card.Meta style={{ color: "#1976D2" }}>
                                                    <strong style={{color:"black"}}>  Encadrant :</strong>  {PFE?.teacherId.lastname} {PFE?.teacherId.firstname}
                                                </Card.Meta>
                                            )
                                            }

                                            <Card.Description>{PFE?.description}</Card.Description>
                                        </Card.Content>

                                        <Card.Content extra>
                                            {PFE?.studentsId?.length > 0 && (
                                                <h5>
                                                    <Icon name="user circle" color="blue" />
                                                    <strong>Student :</strong> {getNamesAndLastnames(PFE?.studentsId)}
                                                </h5>
                                            )}
                                            <h5>
                                                Technologies :{" "}
                                                <strong style={{ color: "black" }}>
                                                    {PFE?.technologyId?.join(" , ")}
                                                </strong>
                                            </h5>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-evenly",
                                                }}
                                            >
                                                {(ROLE === "TEACHER" && type === "PICK")   && (
                                                    <PickPFE
                                                        data={PFE}
                                                        iconName={"hand point up"}
                                                        teacher={teacher_id}
                                                    />
                                                )}
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
