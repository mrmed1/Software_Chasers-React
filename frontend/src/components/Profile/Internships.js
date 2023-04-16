import React from "react";
import { Card, Icon } from "semantic-ui-react";

export default function Internships({ data }) {
  function getNamesAndLastnames(array) {
    const namesAndLastnames = array.map(
      (item) => `${item.firstname} ${item.lastname}`
    );
    const namesAndLastnamesString = namesAndLastnames.join(" , ");

    return namesAndLastnamesString;
  }

  return (
    <Card centered fluid>
      <Card.Header>
        <h1>Internships</h1>
      </Card.Header>

      {data &&
        data.map((internship) => {
          return (
            <>
              <Card.Content key={internship._id}>
                <br />
                <Card.Description>
                  <Card.Header>
                    <h2>
                      {internship?.title},{" "}
                      <strong>{internship?.company}</strong>
                    </h2>
                  </Card.Header>
                  <Card.Meta>{internship?.type}</Card.Meta>
                  <Card.Meta>{internship.univId ? data.univId : ""}</Card.Meta>
                  <br />
                  <h4
                    style={{
                      marginTtop: "1em",
                      textAlign: "justify",
                      maxWidth: "820px",
                      color: "black",
                      lineHeight: "1.4em",
                      wordSpacing: ".5em",
                    }}
                  >
                    {internship?.description}
                  </h4>
                  <h4>
                    {" "}
                    <Icon name="user" circular color="blue" />{" "}
                    {getNamesAndLastnames(internship?.studentsId)}
                  </h4>
                </Card.Description>
              </Card.Content>
            </>
          );
        })}
    </Card>
  );
}
