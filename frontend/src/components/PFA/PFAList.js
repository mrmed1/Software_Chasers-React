import {
  Grid,
  Card,
  Icon,
  List,
  Input,
  Checkbox,
  Popup,
} from "semantic-ui-react";
import React, { useMemo, useState } from "react";

import DeletePFA from "./DeletePFA";
import PFAModal from "./PFAModal";
import { connectedUser } from "../../Service/auth.service";
import ValidationAndPick from "./ValidationAndPick";

export default function PFAList({ data }) {
  const teacher_id = connectedUser()._id;
  const ROLE = connectedUser().role;
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const emptyData = {
    description: "",
    title: "",
    nbStudent: 0,
    type: "PFA",
    createdBy: teacher_id,
    technologyId: [],
    univId: "",
  };

  function getNamesAndLastnames(array) {
    const namesAndLastnames = array.map(
      (item) => `${item.firstname} ${item.lastname}`
    );
    const namesAndLastnamesString = namesAndLastnames.join(" , ");

    return namesAndLastnamesString;
  }

  const filteredInternships = useMemo(() => {
    return data.filter((internship) => {
      if (selectedFilter === "isPublished") {
        return internship.isPublished;
      } else if (selectedFilter === "isValidResponsible") {
        return internship.isValidResponsable;
      } else if (selectedFilter === "isPicked") {
        return internship.isPicked;
      } else if (selectedFilter === "createdBy") {
        return internship.createdBy._id === teacher_id;
      } else {
        return internship.title
          .toLowerCase()
          .includes(searchTitle.toLowerCase());
      }
    });
  }, [data, searchTitle, selectedFilter, teacher_id]);

  const handleFilterChange = (filter) => {
    if (selectedFilter === filter) {
      setSelectedFilter("");
    } else {
      setSelectedFilter(filter);
    }

    setSearchTitle("");
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
          {ROLE === "TEACHER" && (
            <PFAModal
              add={true}
              iconName={"pencil"}
              data={emptyData}
              teacher_id={teacher_id}
            />
          )}
        </div>

        <List animated inverted relaxed horizontal>
          <List.Item>
            {" "}
            <Input
              icon="search"
              placeholder="Search..."
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </List.Item>
          {ROLE === "TEACHER" && (
            <List.Item>
              {" "}
              <Checkbox
                label="Created By Me"
                checked={selectedFilter === "createdBy"}
                onChange={() => handleFilterChange("createdBy")}
              />
            </List.Item>
          )}
          {ROLE === "TEACHER" && (
            <List.Item as="a">
              <List.List>
                <List.Item as="">
                  <Checkbox
                    label="Published"
                    checked={selectedFilter === "isPublished"}
                    onChange={() => handleFilterChange("isPublished")}
                  />
                </List.Item>
              </List.List>
            </List.Item>
          )}

          <List.Item as="a">
            is Picked By a Student ?
            <List.List>
              <List.Item as="a">
                <Checkbox
                  label="Picked"
                  checked={selectedFilter === "isPicked"}
                  onChange={() => handleFilterChange("isPicked")}
                />
              </List.Item>
            </List.List>
          </List.Item>
          {(ROLE === "TEACHER" || ROLE === "ADMIN") && (
            <List.Item as="a">
              is Validated By an Admin ?
              <List.List>
                <List.Item as="a">
                  <Checkbox
                    label="Validated"
                    checked={selectedFilter === "isValidResponsible"}
                    onChange={() => handleFilterChange("isValidResponsible")}
                  />
                </List.Item>
              </List.List>
            </List.Item>
          )}
        </List>

        <Grid columns="three" padded="vertically" centered doubling>
          <Grid.Row>
            {filteredInternships.map((PFA) => {
              return (
                <Grid.Column
                  key={PFA?._id}
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
                            color={PFA.isPicked ? "green" : "red"}
                            style={{ float: "right" }}
                          />
                        }
                        position="top center"
                        content="Picked By Student"
                        
                      />
                       <Popup
                        trigger={
                          <Icon
                          name="check circle"
                          color={PFA.isValidResponsable ? "green" : "red"}
                          style={{ float: "right" }}
                          />
                        }
                      
                        position="top center"
                        content="Validated By An Admin"
                        
                      />

                   
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
                      {PFA?.studentsId?.length > 0 && (
                        <h5>
                          <Icon name="user circle" color="blue" />
                          {getNamesAndLastnames(PFA?.studentsId)}
                        </h5>
                      )}
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
                        {ROLE === "TEACHER" && (
                          <>
                            <DeletePFA
                              data={PFA}
                              teacher_id={teacher_id}
                              iconName={"send"}
                              isPublished={true}
                            />
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
                          </>
                        )}
                        {ROLE === "STUDENT" && (
                          <ValidationAndPick
                            data={PFA}
                            iconName={"hand point up"}
                            _id={teacher_id}
                            student={true}
                          />
                        )}
                        {ROLE === "ADMIN" && (
                          <ValidationAndPick
                            data={PFA}
                            iconName={"check circle"}
                            _id={teacher_id}
                            student={false}
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
