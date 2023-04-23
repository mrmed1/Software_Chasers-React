import React from "react";
import { Card, Icon } from "semantic-ui-react";

export default function Internships({ data ,style}) {
  function getNamesAndLastnames(array) {
    const namesAndLastnames = array.map(
      (item) => `${item.firstname} ${item.lastname}`
    );
    const namesAndLastnamesString = namesAndLastnames.join(" , ");

    return namesAndLastnamesString;
  }

  return (
    <Card centered fluid style={style?.card}>
      <Card.Header  style={{marginLeft:"1rem"}}>
        <h1 style={style?.header}>Internships</h1>
      </Card.Header>

      {data &&
        data.map((internship) => {
          return (
            <>
              <Card.Content key={internship._id}>
                <br />
                <Card.Description>
                  <Card.Header>
                    <h2  style={style?.text2}>
                      {internship?.title},{" "}
                      <strong style={{ color: "#1976D2" }}>{internship?.company}</strong>
                    </h2>
                  </Card.Header>
                  <Card.Meta style={style?.text2}>{internship?.type}</Card.Meta>
                  <Card.Meta style={style?.text2}>{internship.univId ? data.univId?.name : ""}</Card.Meta>
                  <br />
                  <h4
                    style={{
                      marginTtop: "1em",
                      textAlign: "justify",
                      maxWidth: "820px",
                     color: style?.text.color,
                      lineHeight: "1.4em",
                      wordSpacing: ".5em",
                    }}
                  >
                    {internship?.description}
                  </h4>
                  <h4 style={style?.text2}>
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
